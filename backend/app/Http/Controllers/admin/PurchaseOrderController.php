<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BatchRequest;
use App\Http\Requests\PurchaseOrderRequest;
use App\Http\Requests\ReceivePurchaseOrderRequest;
use App\Models\PurchaseOrder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PurchaseOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $purchase_orders = PurchaseOrder::query()
                ->select('id', 'warehouse_id', 'created_at', 'folio', 'total', 'provider_id', 'status')->get();
            $purchase_orders = $purchase_orders->map(function ($purchase_order) {
                $purchase_order->append(['warehouse_name', 'provider_name', 'status_name']);
                $purchase_order = $purchase_order->only([
                    'id',
                    'created_at',
                    'folio',
                    'total',
                    'status',
                    'status_name',
                    'warehouse_name',
                    'provider_name'
                ]);

                return $purchase_order;
            });

            return response()->json(['data' => $purchase_orders], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PurchaseOrderRequest $request)
    {
        try {
            $purchase_order = new PurchaseOrder();
            $purchase_order->fill($request->all());
            $purchase_order->user_id = Auth::id();
            $purchase_order->save();
            $purchase_order->folio = 'OC' . $this->formatID($purchase_order->id);
            $purchase_order->save();

            $products = new Collection($request->products);
            $purchase_order->products()->sync($products->map(function ($product) use ($purchase_order) {
                return [
                    'product_id' => $product['id'],
                    'purchase_order_id' => $purchase_order->id,
                    'quantity' => $product['quantity'],
                    'unit_price' => $product['unit_price']
                ];
            }));

            return response()->json(['data' => $purchase_order], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
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
            $purchase_order = PurchaseOrder::findOrfail($id);
            $purchase_order->products = $purchase_order->products()->select('id', 'name', 'sku')->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'sku' => $product->sku,
                    'quantity' => $product->pivot->quantity,
                    'quantity_received' => $product->pivot->quantity_received,
                    'unit_price' => $product->pivot->unit_price

                ];
            });

            return response()->json(['data' => $purchase_order], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PurchaseOrderRequest $request, $id)
    {
        try {
            $purchase_order = PurchaseOrder::findOrfail($id);
            $purchase_order->fill($request->all());
            $purchase_order->save();

            $purchase_order->products()->detach();
            $products = new Collection($request->products);
            $purchase_order->products()->sync($products->map(function ($product) use ($purchase_order) {
                return [
                    'product_id' => $product['id'],
                    'purchase_order_id' => $purchase_order->id,
                    'quantity' => $product['quantity'],
                    'unit_price' => $product['unit_price']
                ];
            }));

            return response()->json(['data' => $purchase_order], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
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
            $purchase_order = PurchaseOrder::findOrfail($id);
            $purchase_order->products()->detach();
            $purchase_order->delete();
            return response()->json(['data' => $purchase_order], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }

    public function changeStatus($id, $status)
    {
        try {
            $purchase_order = PurchaseOrder::findOrfail($id);
            $purchase_order->status = $status;
            $purchase_order->save();
            return response()->json(['data' => $purchase_order], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }

    public function receive(ReceivePurchaseOrderRequest $request, $id)
    {
        try {
            $purchase_order = PurchaseOrder::findOrfail($id);
            $purchase_order->status = 4;
            $purchase_order->save();
            $purchase_order->products()->detach();
            $products = new Collection($request->products);
            $purchase_order->products()->sync($products->map(function ($product) use ($purchase_order) {
                // Create new batch
                (new BatchController)->store(
                    new BatchRequest([
                        'quantity'      => $product['quantity_received'],
                        'unit_cost'     =>  $product['unit_price'],
                        'product_id'    => $product['id'],
                        'provider_id'   => $purchase_order->provider_id,
                        'warehouse_id'  => $purchase_order->warehouse_id
                    ])
                );
                return [
                    'product_id'            => $product['id'],
                    'purchase_order_id'     => $purchase_order->id,
                    'quantity'              => $product['quantity'],
                    'quantity_received'    => $product['quantity_received'],
                    'unit_price'            =>  $product['unit_price'],
                ];
            }));
            return response()->json(['data' => $purchase_order], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }
}
