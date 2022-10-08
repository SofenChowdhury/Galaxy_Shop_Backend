<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use App\Repositories\ShopsRepository;
use App\Repositories\UserRepository;

class DashboadController extends Controller
{
    //
    protected $order;
    protected $shop;
    protected $user;
    protected $product;
    public function __construct(OrderRepository $order, ShopsRepository $shop, UserRepository $user, ProductRepository $product)
    {
         $this->order = $order;
         $this->shop = $shop;
         $this->user = $user;
         $this->product = $product;
    }
    

    public function index()
    {
        $orders = $this->order->getAll();
        $shops = $this->shop->getPageTen();
        $customers = $this->user->getPageTen();
        $products = $this->product->getPageTen();
        return Inertia::render('Dashboard', compact('orders', 'shops', 'customers', 'products'));
    }
}
