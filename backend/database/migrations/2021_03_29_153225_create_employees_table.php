<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('employee_number', 255);
            $table->unsignedBigInteger('employee_type_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('warehouse_id');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('employee_type_id')->references('id')->on('employee_types');
            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::dropIfExists('employees');
    }
}
