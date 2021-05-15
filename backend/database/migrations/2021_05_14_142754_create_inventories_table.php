<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inventories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('product_id')->nullable();
            $table->string('sku')->nullable();
            $table->double('available')->nullable();
            $table->double('total')->nullable();
            $table->double('minium_stock')->nullable();
            $table->foreignId('warehouse_id')->nullable();
            $table->foreignId('provider_id')->nullable();
            $table->integer('status')->default(0);
            $table->foreignId('harvest_id')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('warehouse_id')->references('id')->on('warehouses');
            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('provider_id')->references('id')->on('providers');
            $table->foreign('harvest_id')->references('id')->on('harvests');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inventories');
    }
}
