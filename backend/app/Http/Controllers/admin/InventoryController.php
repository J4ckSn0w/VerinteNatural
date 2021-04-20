<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\InventoryRequest;
use App\Models\Inventory;
use Error;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $inventories = Inventory::all();
            $inventories = $inventories->map(function ($inventory) {
                $inventory->append(['status_name', 'warehouse_name']);
                $inventory = $inventory->only([
                    'id',
                    'sku',
                    'available',
                    'total',
                    'status',
                    'status_name',
                    'product_name',
                    'minium_stock',
                    'warehouse_name',
                    'created_at'
                ]);
                return $inventory;
            });
            return response()->json(['data' => $inventories], 200);
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
    public function store(InventoryRequest $request)
    {
        try {
            $inventory = new Inventory();
            $inventory->fill($request->all());
            $inventory->status = $request->status;
            $inventory->save();
            $units = new Collection($request->units);
            $inventory->units()->sync($units->map(function ($unit) use ($inventory) {
                return [
                    'unit_id'            => $unit['id'],
                    'inventory_id'     => $inventory->id,
                    'price'              => $unit['price'],
                    'is_default'    => $unit['is_default']
                ];
            }));
            return response()->json(['data' => $inventory], 200);
        } catch (\Exception $e) {
            throw  new Error($e->getMessage());
        }
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
            $inventory = Inventory::findOrfail($id);
            $inventory->units = $inventory->units()->select('id', 'name', 'price', 'is_default')->get()->map(function ($unit) {
                return [
                    'id'            => $unit->id,
                    'name'          => $unit->name,
                    'price'         => $unit->pivot->price,
                    'is_default'    => $unit->pivot->is_default,
                ];
            });
            return response()->json(['data' => $inventory], 200);
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
    public function update(InventoryRequest $request, $id)
    {
        try {
            $inventory = Inventory::findOrfail($id);
            $inventory->product_name = $request->product_name;
            $inventory->minium_stock = $request->minium_stock;
            $inventory->save();

            $units = new Collection($request->units);
            $inventory->units()->detach();
            $inventory->units()->sync($units->map(function ($unit) use ($inventory) {
                return [
                    'unit_id'       => $unit['id'],
                    'inventory_id'  => $inventory->id,
                    'price'         => $unit['price'],
                    'is_default'    => $unit['is_default']
                ];
            }));
            return response()->json(['data' => $inventory], 200);
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
            $inventory = Inventory::findOrfail($id);
            $inventory->units()->detach();
            $inventory->delete();

            return response()->json(['data' => $inventory], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }
}
