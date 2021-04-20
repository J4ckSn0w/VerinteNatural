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
            $table->string('product_name')->nullable();
            $table->string('sku')->nullable();
            $table->foreignId('batch_id')->nullable();
            $table->double('available')->nullable();
            $table->double('total')->nullable();
            $table->double('minium_stock')->nullable();
            $table->foreignId('warehouse_id')->nullable();
            $table->integer('status');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('batch_id')->references('id')->on('batches');
            $table->foreign('warehouse_id')->references('id')->on('warehouses');
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
