<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductRequisitionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_requisition', function (Blueprint $table) {
            $table->unsignedBigInteger('requisition_id')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->double('quantity')->nullable();
            $table->foreignId('unit_id')->nullable();

            $table->foreign('requisition_id')->references('id')->on('requisitions');
            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('unit_id')->references('id')->on('units');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_requisition');
    }
}
