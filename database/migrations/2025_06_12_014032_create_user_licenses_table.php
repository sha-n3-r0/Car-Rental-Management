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
            Schema::create('user_licenses', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->string('license_number');
                $table->string('license_type');
                $table->string('license_class');
                $table->date('issued_date');
                $table->date('expiry_date');
                $table->string('name_on_license');
                $table->date('birth_date');
                $table->text('address')->nullable();
                $table->string('license_image'); // Front image
                $table->string('license_image_back')->nullable(); // Back image
                $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
                $table->timestamps();
            });
        }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_licenses');
    }
};
