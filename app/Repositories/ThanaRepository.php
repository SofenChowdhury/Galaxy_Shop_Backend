<?php
namespace App\Repositories;

use App\Models\Thana;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class ThanaRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(Thana $model)
     {
        $this->model = $model;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
         return $this->model::with('shops')->get();
     }
     
     /**
     *  specified resource get .
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function getById(int $id){
          return $this->model::with('shops')->find($id);
     }  
     
     /**
     *  specified resource get .
     *
     * @param  string  $uuid
     * @return \Illuminate\Http\Response
     */

     
    public function getByUuid($uuid){
          return $this->model::where('uuid', $uuid)->first();
     }
     
      /**
     *  specified resource get .
     *
     * @param  string  $company_code
     * @return \Illuminate\Http\Response
     */

     
    public function getByCode($company_code){
        return $this->model::where('company_code', $company_code)->first();
   } 

     /**
     *  specified resource get .
     *
     * @param  string  $company_code
     * @return \Illuminate\Http\Response
     */

     
     public function getByDistrictID($district_id = NULL){
          if (!empty($district_id)) {
               return $this->model::with('shops')->where('district_id', $district_id)->get();
          }else{
               return $this->getAll();
          }          
     } 

     

     /**
     * resource create
     * @param  $request
     * @return \Illuminate\Http\Response
     */

     public function create($request){
          $company = $this->model;
          $company->updateOrCreate($request);
          return $company;
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update($uuid, $request){
          $company = $this->model->where('uuid', $uuid)->update($request);
          return $company;
          // $company->update($request);
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
