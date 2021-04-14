<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMileageRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mileage_records', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('initial_mileage');
            $table->double('final_mileage');
            $table->unsignedBigInteger('vehicle_id');
            $table->double('gasoline_price');
            $table->double('spent_gasoline');

            $table->timestamps();

            $table->foreign('vehicle_id')->references('id')->on('vehicles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mileage_records');
    }
}
