<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHarvestProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('harvest_product', function (Blueprint $table) {
            $table->foreignId('product_id');
            $table->foreignId('harvest_id');
            $table->double('quantity')->default(0);
            $table->double('to_collect')->nullable();
            $table->boolean('was_finalized')->default(0);
            $table->foreignId('unit_id')->nullable();

            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('harvest_id')->references('id')->on('harvests');
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
        Schema::dropIfExists('harvest_product');
    }
}
