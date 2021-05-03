<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BatchRequest;
use App\Http\Requests\InventoryRequest;
use App\Models\Batch;
use App\Models\Product;
use App\Models\Provider;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BatchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $batches = Batch::all();
            $batches = $batches->map(function ($batch) {
                $batch->append(['product_name', 'provider_name', 'status_name', 'purchase_order_folio']);
                $batch = $batch->only([
                    'id',
                    'sku',
                    'quantity',
                    'unit_cost',
                    'status',
                    'status_name',
                    'product_name',
                    'provider_name',
                    'created_at',
                    'purchase_order_id',
                    'purchase_order_folio'
                ]);
                return $batch;
            });
            return response()->json(['data' => $batches], 200);
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
    public function store(BatchRequest $request)
    {
        try {
            $date = Carbon::now()->format('dmy');
            $product = Product::findOrfail($request->product_id);
            $providerID = $this->formatID($request->provider_id, 4);
            $sameBatchesToday = Batch::where([['product_id', $request->product_id], ['provider_id', $request->provider_id]])->count();
            $sku = 'VN' . $providerID . $product->sku . $date . $this->formatID(($sameBatchesToday + 1), 2);

            $batch = new Batch();
            $batch->fill($request->all());
            $batch->sku = $sku;
            $batch->save();

            return response()->json(['data' => $batch], 201);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    public function formatID($id, $digits)
    {
        $formattedID = '';

        for ($i = 1; $i < $digits; $i++)
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
            $batch = Batch::findOrfail($id);
            return response()->json(['data' => $batch], 200);
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
    public function update(BatchRequest $request, $id)
    {
        try {
            $batch = Batch::findOrfail($id);
            $batch->fill($request->all());
            $batch->save();
            return response()->json(['data' => $batch], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy($id)
    // {
    //     try {
    //         $batch = Batch::findOrfail($id);
    //         $batch->delete();
    //         return response()->json(['data' => $batch], 200);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
    //     }
    // }

    public function changeStatus($id, $status, Request $request)
    {
        try {
            $batch = Batch::findOrfail($id);

            if ($batch->status != 2 && $status == 2) {
                $minium_stock = $batch->load('product')->product->minium_stock;
                (new InventoryController)->store(new InventoryRequest([
                    'available'     => $batch->quantity,
                    'total'         => $batch->quantity,
                    'product_name'  => $batch->append('product_name')->product_name,
                    'sku'           => $batch->sku,
                    'warehouse_id'  => $batch->warehouse_id,
                    'batch_id'      => $batch->id,
                    'minium_stock'  => $minium_stock,
                    'units'         => $request->units,
                    'status'        => ($minium_stock * 2) < $batch->quantity ? 1 : 2
                ]));
            }
            $batch->status = $status;
            $batch->save();
            return response()->json(['data' => $batch], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }
}
