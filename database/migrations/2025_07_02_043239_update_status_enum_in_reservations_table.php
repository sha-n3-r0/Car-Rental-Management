<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // If you're using MySQL, you have to modify the enum column manually:
        Schema::table('reservations', function (Blueprint $table) {
            // Change enum to include 'completed'
            $table->enum('status', ['pending', 'approved', 'cancelled', 'completed'])->default('pending')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('reservations', function (Blueprint $table) {
            // Roll back to the old enum without completed
            $table->enum('status', ['pending', 'approved', 'cancelled'])->default('pending')->change();
        });
    }
};
