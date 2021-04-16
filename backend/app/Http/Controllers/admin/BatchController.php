<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BatchRequest;
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
                $batch->append(['product_name', 'provider_name']);
                $batch = $batch->only([
                    'id',
                    'sku',
                    'quantity',
                    'unit_cost',
                    'product_name',
                    'provider_name',
                    'created_at'
                ]);
                return $batch;
            });
            return response()->json(['data' => $batches], 200);
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
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
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
    public function update(BatchRequest $request, $id)
    {
        try {
            $batch = Batch::findOrfail($id);
            $batch->quantity = $request->quantity;
            $batch->unit_cost = $request->unit_cost;
            $batch->save();
            return response()->json(['data' => $batch], 200);
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
            $batch = Batch::findOrfail($id);
            $batch->delete();
            return response()->json(['data' => $batch], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }
}
