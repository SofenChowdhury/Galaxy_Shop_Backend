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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id')->index();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('method');
            $table->string('slot_number')->nullable()->comment('For Hire Purchase Kist Slot');
            $table->string('order_type')->nullable()->comment('Purchase / Regular');
            $table->enum('transaction_type', ['debit', 'credit'])->nullable()->comment('debit / credit');
            $table->double('amount_debit', 10,2)->default(0);
            $table->double('amount_credit', 10,2)->default(0);
            $table->double('cash_back_amount', 10,2)->default(0);
            $table->string('account_number')->nullable();            
            $table->string('txnid')->nullable();            
            $table->string('transaction_details')->nullable();            
            $table->string('charge_id')->nullable();            
            $table->string('emi_description')->nullable();            
            $table->string('payment_status')->nullable();
            $table->string('order_note')->nullable();
            $table->string('card_no')->nullable();
            $table->string('card_issuer')->nullable();
            $table->string('card_brand')->nullable();
            $table->string('emi_issuer')->nullable(); 
            $table->integer('user_id')->nullable()->comment('for manual entry');      
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
        Schema::dropIfExists('payments');
    }
};
