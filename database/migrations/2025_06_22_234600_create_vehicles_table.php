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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('license_plate')->unique();
            $table->string('vin')->nullable();
            $table->string('make');
            $table->string('model');
            $table->smallInteger('year');
            $table->string('color');
            $table->integer('seats');
            $table->enum('vehicle_type', ['sedan', 'SUV', 'truck', 'van', 'coupe', 'convertible', 'wagon', 'other']);
            $table->enum('transmission', ['automatic', 'manual']);
            $table->enum('fuel_type', ['petrol', 'diesel', 'hybrid', 'electric']);
            $table->integer('odometer');
            $table->enum('status', ['available', 'rented', 'maintenance', 'reserved', 'inactive']);
            $table->decimal('rental_rate_per_day', 10, 2);
            $table->decimal('late_fee_per_day', 10, 2);
            $table->date('last_service_date');
            $table->date('insurance_expiry_date');
            $table->string('image_url')->nullable();
            $table->json('documents')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
