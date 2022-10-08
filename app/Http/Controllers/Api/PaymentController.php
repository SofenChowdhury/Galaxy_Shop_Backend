<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Classes\Helper;
use App\Models\Payment;
use App\Classes\FileUpload;
use Illuminate\Http\Request;
use App\Mail\OrderPaymentUpload;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class PaymentController extends Controller
{
    //
    protected $file;

    public function __construct(FileUpload $fileUpload)
    {
        $this->file= $fileUpload;
    }
    public function orderPayment(Request $request)
    {
        // return response()->json($file= $request->all());
        // return response()->json(['status'=>$request->all() , 'message'=>'Your Payment has been completed successfully']);
        // // $request->payment_slip;

        // if($request->hasFile('payment_slip')){

        //       $file= $request->file('payment_slip');
        //       $image_name =$file->getClientOriginalExtension();

        //       return $image_name;


        // }
        try {

            if($request->method !=null ){
                $orderInfo = Order::with('orderItem', 'payments')->find($request->order_id);
                if (!empty($orderInfo)) {
                    $payment_slip=  $this->file->base64ImgUpload($request->payment_slip, $file = null, $folder="payment_slip");
                    $payment = new Payment();
                    $payment->order_id          = $request->order_id;
                    $payment->method            = Helper::$bank;
                    $payment->transaction_type  = Helper::$credit;
                    $payment->amount_credit     = $request->amount;
                    $payment->bank              = $request->bank;
                    $payment->branch            = $request->branch;
                    $payment->account_number    = $request->account_number;
                    $payment->payment_status    = Helper::$pending;
                    $payment->payment_slip      = $payment_slip;
                    $payment->save();
                    // Mail::to('b2b.finance@fel.com.bd')->send(new OrderPaymentUpload($orderInfo, $payment));
                    return response()->json(['status'=>true , 'message'=>'Your Payment has been completed successfully']);
                }else{
                    return response()->json(['status'=>false , 'message'=>'Your order information is invalid']);
                }
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }



     
































    public function guard()
    {
        return Auth::guard('api');
    }
}
