<?php

namespace App\Http\Controllers\Api;

use App\Classes\Helper;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Repositories\OrderRepository;
use Tymon\JWTAuth\Exceptions\JWTException;

class OrderController extends Controller
{
    //
    protected $order;

    public function __construct(OrderRepository $order)
    {
         $this->order = $order;
    }

    public function placeOrder(Request $request)

    {

       try {

    
        $orderNumber    =   "SAMSUNG".strtoupper(uniqid());
    
        $order = new Order();
        $order->user_id= $this->guard()->user()->id;
        $order->shop_id= $request->shop_id;
        $order->total_amount=$request->cartTotalAmount;
        $order->total_qty=$request->cartTotalQuantity; 
        $order->order_number=$orderNumber;
        $order->payment_status=Helper::$pending;
        $order->customer_name=$request->customer_name;
        $order->customer_email=$request->customer_email;
        $order->customer_phone=$request->customer_phone;
        $order->customer_address=$request->customer_address;
        $order->customer_city=$request->customer_city;
        $order->customer_thana=$request->customer_thana;
        $order->order_note=$request->order_note;
        $order->payment_type=$request->payment_type;
        $order->order_status=Helper::$initiated;
        $order->save();

         foreach ($request->cartItems as $item) {
            $product= Product::where('id',  $item['id'])->where('status',1)->first();
            $orderItem=  new OrderItem();
            $orderItem->order_id=$order->id;
            $orderItem->product_id=$product->id;
            $orderItem->name=$product->title;
            $orderItem->image=$product->photo;
            $orderItem->item_shipping_charge=0;
            $orderItem->item_price=$product->regular_price;
            $orderItem->item_mrp=$product->regular_price;
            $orderItem->qty=$item['cartQuantity'];
            $orderItem->total_item_price=$product->regular_price * $item['cartQuantity'];
            $orderItem->delivery_status=Helper::$pending;
            $orderItem->save();
         }

         return response()->json([
             'status'=> true, 
             'message'=>'Thank you for Order'
        ]);

       }
        catch (\Throwable $th) {
            return response()->json([
                'status'=>false,
                'message'=> $th->getMessage()
            ]);
       }
    }


    public function userOrder(){

         try {
             
            $order=Order::with(['orderItems'=>function($query){
                    $query->select('id','order_id', 'name', 'image');
              }])
              ->addSelect([
                  'name'=> User::select('id','name')->whereColumn('users.id', 'orders.user_id'),
              ])
              ->where("user_id", $this->guard()->user()->id)->select('id', 'user_id','order_number', 'total_amount', 'payment_status', 'order_status', 'order_note', 'created_at')
              ->orderBy('id', 'desc')
              ->get();
                return response()->json([
                    'status'=>true,
                    'orders'=>$order
                ]);
         } catch (JWTException  $th) {
            return response()->json([
                'status'=>false,
                'message'=>"error"
            ]);
         }
    }

    public function orderDetails($id)
    {
        $orderDetails = $this->order->getById($id);
        return response()->json([
            'status'=>true,
            'orderDetails'=>$orderDetails
        ]);
    }



     /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard('api');
    }
}
