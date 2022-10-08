<?php
namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Payment;
use App\Http\Requests\OrderRequest;
use App\Http\Controllers\Controller;
use App\Repositories\AdminRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ThanaRepository;
use App\Repositories\CompanyRepository;
use App\Repositories\DistrictRepository;
use App\Repositories\DivisionRepository;
use App\Repositories\ShopsRepository;

class OrderController extends Controller
{
    protected $order;
    protected $company;
    protected $admin;
    protected $division;
    protected $district;
    protected $thana;
    protected $shop;

    public function __construct(OrderRepository $order, CompanyRepository $company, DivisionRepository $division, AdminRepository $admin, DistrictRepository $district, ThanaRepository $thana, ShopsRepository $shop)
    {
         $this->order = $order;
         $this->company = $company;
         $this->admin = $admin;
         $this->division = $division;
         $this->district = $district;
         $this->thana = $thana;
         $this->shop = $shop;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */

    public function index()
    {
        $orders =  $this->order->getAll();
        $companies = $this->company->getAll();
        $admins = $this->admin->getAll();
        $divisions = $this->division->getAll();
        $districts = $this->district->getAll();
        $thanas = $this->thana->getAll();
        $shops = $this->shop->getAll();
        return Inertia::render('Order/Index', compact('orders', 'companies', 'admins', 'divisions', 'districts', 'thanas', 'shops')); 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        return view('order.create');
    }


   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(OrderRequest $request)
    {
        $order = $this->order->create($request->all());

       return back();

    }

   /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
    */

     public function show($id)
    {
        $order = $this->order->getById($id);
        return Inertia::render('Order/Show', compact('order'));
    }

   /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $order = $this->order->getById($id);

         return view('order.edit', compact('order'));
    }

   /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(OrderRequest $request)
    {
        $inputData = [];
        try {
            $inputData['order_status'] = $request->order_status;
            $this->order->update($request->id, $inputData);
            return back();
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }

    public function orderPayment($id)
    {
        $payments = Payment::where('order_id', $id)->get();
        return  response()->json($payments);
        // return $payments;
        return Inertia::render('Order/Payments', compact('payments'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $this->order->delete($id);
        return back();
    }
}
