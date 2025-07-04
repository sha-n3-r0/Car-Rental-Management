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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id');
            $table->foreignId('vehicle_id');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('pickup_time')->nullable();
            $table->string('dropoff_time')->nullable();
            $table->string('pickup_location');
            $table->string('dropoff_location');
            $table->decimal('total_cost', 10, 2);
            $table->string('status')->default('active'); // active/completed/cancelled
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
