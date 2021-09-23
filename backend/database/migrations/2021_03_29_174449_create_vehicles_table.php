<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('license_plate', 255)->nullable();
            $table->string('brand', 100)->nullable();
            $table->string('description', 255)->nullable();
            $table->unsignedBigInteger('vehicle_type_id');
            $table->double('mileage')->nullable();
            $table->double('spent_fuel')->default(0);
            $table->double('fuel_cost')->default(0);
            $table->foreignId('employee_id')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('vehicle_type_id')->references('id')->on('vehicle_types');
            $table->foreign('employee_id')->references('id')->on('employees');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehicles');
    }
}
