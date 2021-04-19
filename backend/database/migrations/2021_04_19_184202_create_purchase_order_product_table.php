<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseOrderProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchase_order_product', function (Blueprint $table) {
            $table->foreignId('purchase_order_id')->nullable();
            $table->foreignId('product_id')->nullable();
            $table->double('unit_price')->nullable();
            $table->double('quantity')->nullable();
            $table->double('quantity_received')->defaul(0.0);

            $table->foreign('purchase_order_id')->references('id')->on('purchase_orders');
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchase_order_product');
    }
}
