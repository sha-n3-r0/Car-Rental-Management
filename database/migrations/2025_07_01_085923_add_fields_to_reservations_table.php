<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->string('pickup_time')->nullable();
            $table->string('dropoff_time')->nullable();
            $table->string('pickup_location')->nullable();
            $table->string('dropoff_location')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('transaction_reference_no')->nullable();
            $table->string('payment_proof')->nullable();
            $table->string('promo_code')->nullable();
            $table->decimal('discount', 8, 2)->nullable();
            $table->decimal('total_cost', 10, 2)->nullable();
            $table->integer('loyalty_points')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            //
        });
    }
};
