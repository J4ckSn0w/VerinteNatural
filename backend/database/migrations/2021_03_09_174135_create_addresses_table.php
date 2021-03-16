<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('street', 255);
            $table->string('number', 40);
            $table->string('zip_code', 40);
            $table->string('suburb', 200);
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('municipality_id');

            $table->softDeletes();
            $table->timestamps();

            $table->foreign('customer_id')->references('id')->on('customers');
            $table->foreign('municipality_id')->references('id')->on('municipalities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('addresses');
    }
}
