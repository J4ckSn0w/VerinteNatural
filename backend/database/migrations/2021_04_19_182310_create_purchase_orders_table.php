<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('requisition_id')->nullable();
            $table->foreignId('provider_id')->nullable();
            $table->foreignId('warehouse_id')->nullable();
            $table->integer('status')->default(0);
            $table->double('total')->nullable();
            $table->double('subtotal')->nullable();
            $table->double('iva')->nullable();
            $table->string('folio', 100)->nullable();
            $table->date('delivery_to')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('requisition_id')->references('id')->on('requisitions');
            $table->foreign('warehouse_id')->references('id')->on('warehouses');
            $table->foreign('provider_id')->references('id')->on('providers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchase_orders');
    }
}
