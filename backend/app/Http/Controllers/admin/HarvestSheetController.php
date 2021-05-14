<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\HarvestSheetRequest;
use App\Models\HarvestSheet;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

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
            $harvest_sheet->products()->sync($products->map(function ($product) use ($harvest_sheet) {
                return [
                    'product_id'    => $product['id'],
                    'quantity'      => $product['quantity'],
                    'quantity_real' => 0
                ];
            }));

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
            $harvest_sheet = HarvestSheet::findOrfail($id);

            $harvest_sheet->products = $harvest_sheet->products()->select('id', 'name', 'sku')->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'sku' => $product->sku,
                    'quantity' => $product->pivot->quantity,
                    'quantity_real' => $product->pivot->quantity_real,
                ];
            });

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
    public function update(HarvestSheetRequest $request, $id)
    {
        try {
            $harvest_sheet = HarvestSheet::findOrfail($id);
            if ($harvest_sheet->status != 1) {
                $harvest_sheet->status = 1;
                $harvest_sheet->save();

                $products = new Collection($request->products);
                $harvest_sheet->products()->sync($products->map(function ($product) use ($harvest_sheet) {
                    return [
                        'product_id'    => $product['id'],
                        'quantity'      => $product['quantity'],
                        'quantity_real' => $product['quantity_real']
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
        //
    }
}
