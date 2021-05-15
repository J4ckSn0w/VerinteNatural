<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BatchRequest;
use App\Http\Requests\HarvestRequest;
use App\Http\Requests\InventoryRequest;
use App\Models\Harvest;
use App\Models\HarvestSheet;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HarvestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $harvests = Harvest::all();

            $harvests = $harvests->map(function ($harvest) {
                $harvest->append(['requisition_folio', 'provider_name', 'warehouse_name']);
                $harvest = $harvest->only([
                    "id",
                    "folio",
                    "requisition_folio",
                    "provider_name",
                    "warehouse_name",
                    "created_at"
                ]);
                return $harvest;
            });

            return response()->json(['data' => $harvests], 200);
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
    public function store(HarvestRequest $request)
    {
        try {
            $requisition_id = $request->requisition_id;

            $warehouse = Warehouse::whereHas('requisitions', function ($requisition) use ($requisition_id) {
                $requisition->where('id', $requisition_id);
            })->first();

            $providers = [];

            foreach ($request->products as $_product) {
                if (isset($providers[$_product['provider_id']]))
                    array_push($providers[$_product['provider_id']], $_product);
                else {
                    $providers[$_product['provider_id']] = [$_product];
                }
            }

            foreach ($providers as $provider) {

                $harvest = Harvest::create($request->all());
                $harvest->folio = 'RG' . $this->formattedID($harvest->id);
                $harvest->provider_id = $provider[0]['provider_id'];
                $harvest->warehouse_id = $warehouse->id;
                $harvest->save();

                $products = new Collection($provider);

                $harvest->products()->sync($products->map(function ($product) use ($warehouse, $harvest) {

                    (new InventoryController)->store(
                        new InventoryRequest([
                            'available'         => 0,
                            'product_id'        => $product['id'],
                            'provider_id'       => $product['provider_id'],
                            'warehouse_id'      => $warehouse->id,
                            'total'             => 0,
                            'status'            => 0,
                            'minium_stock'      => 0,
                            'harvest_id'        => $harvest->id
                        ])
                    );

                    return [
                        'product_id' => $product['id'],
                        'quantity' => $product['quantity'],
                        'unit_id' => $product['unit_id'],
                        'to_collect' => $product['quantity']
                    ];
                }));
            }

            return response()->json(['data' => $harvest], 201);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    public function formattedID($id)
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
            $harvest = Harvest::findOrfail($id);
            $harvest->products = $harvest->products()->select('id', 'name', 'sku')->get()->map(function ($product) use ($harvest) {

                $inventory = Inventory::where([
                    ['harvest_id', $harvest->id],
                    ['provider_id', $harvest->provider_id],
                    ['product_id', $product->id]
                ])->first();

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'sku' => $product->sku,
                    'quantity' => $product->pivot->quantity,
                    'to_collect' => $product->pivot->to_collect,
                    'was_finalized' => $product->pivot->was_finalized,
                    'unit_id' => $product->pivot->unit_id,
                    'inventory_sku' => $inventory->sku ?? 'No existe lote'
                ];
            });

            return response()->json(['data' => $harvest], 200);
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
    public function update($id)
    {
        try {

            $harvest = Harvest::findOrfail($id)->load('products');

            $harvest->products = $harvest->products()->select('id')->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'quantity' => $product->pivot->quantity,
                    'to_collect' => $product->pivot->quantity,
                    'was_finalized' => 0,
                    'unit_id' => $product->pivot->unit_id
                ];
            });

            $harvest_sheets_products = DB::table('harvest_sheet_product', 'a')
                ->join('harvest_sheets', 'harvest_sheets.id', '=', 'a.harvest_sheet_id')
                ->join('harvests', 'harvests.id', '=', 'harvest_sheets.harvest_id')
                ->where('harvests.id', $id)
                ->select('a.*')
                ->get();

            $harvest->products()->detach();
            $harvest->products()->sync($harvest->products->map(function ($product) use ($harvest_sheets_products) {

                foreach ($harvest_sheets_products as $_product) {
                    if ($product['id'] == $_product->product_id) {
                        $product['to_collect'] -= $_product->quantity;
                        if ($product['to_collect'] == 0)
                            $product['was_finalized'] = 1;
                    }
                }

                return [
                    'product_id' => $product['id'],
                    'quantity' => $product['quantity'],
                    'to_collect'    => $product['to_collect'],
                    'was_finalized' => $product['was_finalized'],
                    'unit_id'       => $product['unit_id']
                ];
            }));

            return response()->json(['data' => $harvest], 400);
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
    // public function destroy($id)
    // {
    //     try {
    //         $harvest = Harvest::findOrfail($id);
    //         $harvest->products()->detach();
    //         $harvest->delete();

    //         return response()->json(['data' => $harvest], 200);
    //     } catch (\Exception $e) {
    //         return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
    //     }
    // }
}
