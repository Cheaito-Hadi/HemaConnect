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
        Schema::disableForeignKeyConstraints();

        Schema::dropIfExists('donations');

        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->float('donated_amount');
            $table->dateTime('time');
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('blood_requests')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::dropIfExists('donations');

        Schema::enableForeignKeyConstraints();
    }
};
