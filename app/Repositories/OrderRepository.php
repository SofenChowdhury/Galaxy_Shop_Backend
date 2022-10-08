<?php
namespace App\Repositories;

use App\Models\Order;
use App\Models\Payment;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class OrderRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(Order $model)
     {
        $this->model=$model;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
          return $this->model::paginate(20);
     }

     /**
      * all resource get
      * @return Collection
      */
      public function getLatest(){
          return $this->model::take(20)->get();
     }
     
     /**
     *  specified resource get .
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function getById(int $id){
          return $this->model::with(['orderItem', 'orderItem.itemInfo'])
          ->where('id', $id)->first();
     }   

     /**
     * resource create
     * @param  $request
     * @return \Illuminate\Http\Response
     */

     public function create( $request){

          $order =$this->model;
          $order->name=$request->name;
          $order->save();
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id,  $request){
          $order = $this->model->find($id);
          if ($order->order_status == 'delivered') {
               $request->order_status = 'delivered';
          }elseif ($order->order_status == 'declined') {
               $request->order_status = 'declined';
          }
          return Order::where('id', $id)->update($request);
     } 
        
     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function delete($id){
       return $this->getById($id)->delete();
     }
}
