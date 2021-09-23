<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 255);
            $table->string('address', 255)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('phone_number', 100)->nullable();
            $table->string('schedule', 255)->nullable();
            $table->string('business_name', 200)->nullable();
            $table->string('contact_job', 200)->nullable();
            $table->string('contact_name', 200)->nullable();
            $table->string('bank_account', 200)->nullable();
            $table->string('bank', 200)->nullable();
            $table->foreignId('payment_form_id')->nullable();
            $table->double('credit')->nullable();
            $table->double('max_purchase_allowed')->nullable();
            $table->boolean('is_producer')->default(0);

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('payment_form_id')->references('id')->on('payment_forms');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('providers');
    }
}
