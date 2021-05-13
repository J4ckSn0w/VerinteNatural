<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BatchRequest;
use App\Http\Requests\HarvestRequest;
use App\Models\Harvest;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

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
                $harvest->append(['requisition_folio', 'provider_name']);
                $harvest = $harvest->only([
                    "id",
                    "folio",
                    "requisition_folio",
                    "provider_name",
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
                $harvest->save();

                $products = new Collection($provider);

                $harvest->products()->sync($products->map(function ($product) use ($warehouse) {

                    (new BatchController)->store(
                        new BatchRequest([
                            'quantity'          => $product['quantity'],
                            'unit_cost'         => 0,
                            'product_id'        => $product['id'],
                            'provider_id'       => $product['provider_id'],
                            'warehouse_id'      => $warehouse->id
                        ])
                    );

                    return [
                        'product_id' => $product['id'],
                        'quantity' => $product['quantity'],
                        'to_collect' => 0
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
            $harvest->products = $harvest->products()->select('id', 'name', 'sku')->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'sku' => $product->sku,
                    'quantity' => $product->pivot->quantity,
                    'to_collect' => $product->pivot->to_collect,
                    'was_finalized' => $product->pivot->was_finalized
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
    // public function update(HarvestRequest $request, $id)
    // {
    //     try {
    //         $harvest = Harvest::findOrfail($id);
    //         $harvest->fill($request->all());
    //         $harvest->save();

    //         $products = $request->products;
    //         $harvest->products()->detach();
    //         $harvest->products()->sync($products->map(function ($product) {
    //             return [
    //                 'product_id' => $product['id'],
    //                 'quantity' => $product['quantity'],
    //                 'to_collect' => 0
    //             ];
    //         }));

    //         return response()->json(['data' => $harvest], 400);
    //     } catch (\Exception $e) {
    //         return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
    //     }
    // }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $harvest = Harvest::findOrfail($id);
            $harvest->products()->detach();
            $harvest->delete();

            return response()->json(['data' => $harvest], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }
}
