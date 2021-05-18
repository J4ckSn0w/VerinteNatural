<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\HarvestSheetRequest;
use App\Models\HarvestSheet;
use App\Models\Unit;
use Carbon\Carbon;
use Error;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use PDF;


class HarvestSheetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $harvest = request()->get('harvest', false);
            $gatherer = request()->get('gatherer', false);

            $query = [];

            if ($gatherer) array_push($query, ['employee_id', $gatherer]);
            if ($harvest) array_push($query, ['harvest_id', $harvest]);

            if ($query)
                $harvest_sheets = HarvestSheet::where($query)->get();
            else
                $harvest_sheets = HarvestSheet::all();

            $harvest_sheets = $harvest_sheets->map(function ($harvest_sheet) {
                $harvest_sheet->append(['gatherer_name', 'status_name']);
                $harvest_sheet = $harvest_sheet->only([
                    "id",
                    "address",
                    "contact_name",
                    "folio",
                    "collect_to",
                    "gatherer_name",
                    "status",
                    "status_name"
                ]);
                return $harvest_sheet;
            });
            return response()->json(['data' => $harvest_sheets], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(HarvestSheetRequest $request)
    {
        try {
            $harvest_sheet = HarvestSheet::create($request->all());
            $harvest_sheet->folio = 'HR' . $this->formatID($harvest_sheet->id);
            $harvest_sheet->save();

            $products = new Collection($request->products);
            $harvest_sheet->products()->sync($products->map(function ($product) {
                return [
                    'product_id'    => $product['id'],
                    'quantity'      => $product['quantity'],
                    'unit_id'       => $product['unit_id'],
                    'quantity_real' => 0
                ];
            }));

            (new HarvestController)->update($harvest_sheet->harvest_id);

            return response()->json(['data' => $harvest_sheet], 201);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    public function formatID($id)
    {

        $formattedID = '';

        for ($i = 1; $i < 6; $i++)
            if (pow(10, $i) > $id) $formattedID .= '0';


        $formattedID .= $id;

        return $formattedID;
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $harvest_sheet = HarvestSheet::findOrfail($id)->append('payment_form_name', 'gatherer_name', 'status_name');
            $harvest = (new HarvestController)->show($harvest_sheet->harvest_id)->original['data'];
            $harvest_sheet->provider = $harvest->provider_name;
            $harvest_sheet->warehouse = $harvest->warehouse_name;

            $harvest_sheet->products = $harvest_sheet->products->map(function ($product) use ($harvest) {

                $index = array_search($product->id, array_column($harvest->products->toArray(), 'id'));
                $unit = Unit::findOrfail($product->pivot->unit_id);

                return [
                    'id'    => $product->id,
                    'sku'   => $harvest->products->toArray()[$index]['inventory_sku'],
                    'name'  => $product->name,
                    'quantity' => $product->pivot->quantity,
                    'quantity_real' => $product->pivot->quantity_real,
                    'unit'  => $unit
                ];
            });

            $harvest_sheet = (object) $harvest_sheet->only([
                "id",
                "address",
                "contact_name",
                "payment_form_id",
                "employee_id",
                "collect_to",
                "harvest_id",
                "folio",
                "status",
                "status_name",
                "created_at",
                "updated_at",
                "deleted_at",
                "provider",
                "warehouse",
                "products",
                "payment_form_name",
                "gatherer_name"
            ]);

            return response()->json(['data' => $harvest_sheet], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $harvest_sheet = HarvestSheet::findOrfail($id);
            if ($harvest_sheet->status == 1) {
                $harvest_sheet->status = 2;
                $harvest_sheet->save();

                $products = $request->products;
                $harvest_sheet->products()->sync($harvest_sheet->products->map(function ($product) use ($products) {
                    $index = array_search($product->id, array_column($products, 'id'));
                    return [
                        'product_id'    => $product->id,
                        'quantity'      => $product->pivot->quantity,
                        'unit_id'       => $product->pivot->unit_id,
                        'quantity_real' => $products[$index]['quantity_real']
                    ];
                }));
            }

            return response()->json(['data' => $harvest_sheet], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $harvest_sheet = HarvestSheet::findOrfail($id);
            if ($harvest_sheet->status != 0) {
                return response()->json(['errors' => ['in_process' => 'La hoja de recolección ya se encuentra en proceso']], 405);
            }
            $harvest_sheet->products()->detach();
            $harvest_sheet->delete();

            (new HarvestController)->update($harvest_sheet->harvest_id);

            return response()->json(['data' => $harvest_sheet], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => $e->getMessage()]], 400);
        }
    }

    public function downloadHarvestSheet($id)
    {
        try {
            $forProvider = request()->get('forProvider', false);
            $harvest_sheet = $this->show($id)->original['data'];
            $pdf = PDF::loadView('pdfs.harvestSheet', compact('harvest_sheet', 'forProvider'));
            return $pdf->download('HojaRecolección' . $harvest_sheet->folio . '.pdf');
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => $e->getMessage()]], 400);
        }
    }

    public function changeStatus($id, $status)
    {
        try {
            $harvest_sheet = HarvestSheet::findOrfail($id);
            if ($harvest_sheet->status == ($status - 1)) {
                $harvest_sheet->status = $status;
                $harvest_sheet->save();
                return $harvest_sheet;
            }
            throw new Error('No fue posible cambiar el estado');
        } catch (\Exception $e) {
            throw new Error($e->getMessage());
        }
    }

    public function initHarvestSheet($id)
    {
        try {
            $this->changeStatus($id, 1);
            return response()->json(['data' => 'ok'], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => $e->getMessage()]], 400);
        }
    }

    public function receiveHarvestSheet($id)
    {
        try {
            $this->changeStatus($id, 3);
            return response()->json(['data' => 'ok'], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => $e->getMessage()]], 400);
        }
    }
}
