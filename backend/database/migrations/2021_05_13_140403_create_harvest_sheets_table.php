<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHarvestSheetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('harvest_sheets', function (Blueprint $table) {
            $table->id();
            $table->string('address', 255);
            $table->string('contact_name', 255);
            $table->foreignId('payment_form_id')->nullable();
            $table->foreignId('employee_id')->nullable();
            $table->dateTime('collect_to');
            $table->foreignId('harvest_id')->nullable();
            $table->string('folio', 100)->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('employee_id')->references('id')->on('employees');
            $table->foreign('payment_form_id')->references('id')->on('payment_forms');
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
        Schema::dropIfExists('harvest_sheets');
    }
}
