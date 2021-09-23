<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHarvestSheetProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('harvest_sheet_product', function (Blueprint $table) {
            $table->foreignId('harvest_sheet_id');
            $table->foreignId('product_id');
            $table->foreignId('unit_id')->nullable();
            $table->double('quantity')->default(0);
            $table->double('quantity_real')->default(0);


            $table->foreign('harvest_sheet_id')->references('id')->on('harvest_sheets');
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
        Schema::dropIfExists('harvest_sheet_product');
    }
}
