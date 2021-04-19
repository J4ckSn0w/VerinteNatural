<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequisitionRequest;
use App\Models\Requisition;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RequisitionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return response()->json(['data' => Requisition::all()], 200);
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
    public function store(RequisitionRequest $request)
    {
        try {
            $requisition = new Requisition();
            $requisition->required_to = $request->required_to;
            $requisition->user_id = Auth::id();
            $requisition->warehouse_id = Auth::user()->employee->warehouse_id ??  1;
            $requisition->folio = 'SM' . $this->formatID($requisition->id);
            $requisition->save();
            $products = new Collection($request->products);
            $requisition->products()->sync($products->map(function ($product) use ($requisition) {
                return [
                    'product_id' => $product['id'],
                    'requisition_id' => $requisition->id,
                    'quantity' => $product['quantity']
                ];
            }));
            return response()->json(['data' => $requisition], 201);
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
            $requisition = Requisition::findOrfail($id);
            $requisition->products = $requisition->products()->select('id', 'name', 'sku')->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'sku' => $product->sku,
                    'quantity' => $product->pivot->quantity,
                ];
            });

            return response()->json(['data' => $requisition], 200);
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
    public function update(RequisitionRequest $request, $id)
    {
        try {
            $requisition = Requisition::findOrfail($id);
            $requisition->required_to = $request->required_to;
            $requisition->save();

            $requisition->products()->detach();
            $products = new Collection($request->products);
            $requisition->products()->sync($products->map(function ($product) use ($requisition) {
                return [
                    'product_id' => $product['id'],
                    'requisition_id' => $requisition->id,
                    'quantity' => $product['quantity']
                ];
            }));

            return response()->json(['data' => $requisition], 200);
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
            $requisition = Requisition::findOrfail($id);
            $requisition->products()->detach();
            $requisition->delete();
            return response()->json(['data' => $requisition], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }
}
