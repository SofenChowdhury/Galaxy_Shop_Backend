<?php
namespace App\Repositories;

use Mahabub\CrudGenerator\Contracts\BaseRepository;
use App\Models\User;

class CustomerRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(User $model)
     {
        $this->model=$model;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
          return $this->model::paginate(10);
     //     return $this->model::all();
     }
     
     /**
     *  specified resource get .
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function getById(int $id){
          return $this->model::find($id);
     }   

     /**
     * resource create
     * @param $request
     * @return \Illuminate\Http\Response
     */

     public function create( $request){

          $customer =$this->model;

          $customer->name=$request->name;
          $customer->save();
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id,$request){

          $customer= $this->getById($id);

          $customer->name=$request->name;
          $customer->update();
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
