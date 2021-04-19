<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductPurchaseOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_purchase_order', function (Blueprint $table) {
            $table->foreignId('purchase_order_id')->nullable();
            $table->foreignId('product_id')->nullable();
            $table->double('unit_price')->nullable();
            $table->double('quantity')->nullable();
            $table->double('quantity_received')->default(0.0);

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
        Schema::dropIfExists('product_purchase_order');
    }
}
