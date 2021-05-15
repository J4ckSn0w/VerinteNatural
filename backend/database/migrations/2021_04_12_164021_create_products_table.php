<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 255);
            $table->unsignedBigInteger('product_type_id')->nullable();
            $table->string('description', 255)->nullable();
            $table->string('sku', 255)->nullable();
            $table->double('minium_stock')->nullable();
            $table->foreignId('storage_unit_id');
            $table->foreignId('factor_unit_id');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('product_type_id')->references('id')->on('product_types');
            $table->foreign('storage_unit_id')->references('id')->on('units');
            $table->foreign('factor_unit_id')->references('id')->on('units');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
