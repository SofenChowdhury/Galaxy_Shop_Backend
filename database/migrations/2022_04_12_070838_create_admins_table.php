<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->integer('company_id')->nullable();
            $table->string('title');
            $table->string('name');            
            $table->string('email')->unique();
            $table->string('phone')->unique();
            $table->string('photo')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->string('password');
            $table->enum('user_type', [1, 2, 3, 4, 5, 6])->comment('ND = 1, NSM=2, RSM=3, AM=4, TM=5, Retail=6');
            $table->integer('parent_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
};
