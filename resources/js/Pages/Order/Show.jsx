import React, { useState ,useEffect} from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, usePage, useForm } from "@inertiajs/inertia-react";
import PageTitle from "@/Components/PageTitle";
import Moment from 'moment';
import { format } from 'date-fns';

export default function Index(props) {

    const { order } = usePage().props;
    const orderItems = order.order_item;
    useEffect(() => 
    {
        console.log(order)
        // console.log(JSON.parse(JSON.stringify(content[0].emi_description)));
    },      
    )





    const handleChangeStatus = (event) => {
        if(order.order_status == event.target.value){
            alert("Already Selected");
            return false;
        }else if (order.order_status == 'delivered' || order.order_status == 'declined') {
            alert("Delivered or Declined Order Status not be Change");
            return false;
        }
        data.order_status = event.target.value;
        post(route('update.order'));
        
    };

    if (!order) return "No order found!";
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Order" />
            <PageTitle>Order Details</PageTitle>
           
            <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8 drop-shadow-lg">
                <div className="w-full overflow-x-auto">
                    
                    <table className="w-full whitespace-no-wrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-3">Order Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                            <table className="w-full whitespace-no-wrap">
                                <tbody>
                                    <tr>
                                        <th className="px-4 py-3">Order Number</th>
                                        <td className="px-4 py-3">: {order.order_number}</td>
                                        <th className="px-4 py-3">Order Amount</th>
                                        <td className="px-4 py-3">: {order.pay_amount}</td>
                                                                             
                                    </tr>
                                    <tr>
                                        
                                        <th className="px-4 py-3">Order Date ddd</th>
                                        <td className="px-4 py-3">:  
                                        {
                                            // Moment(order.order_date).format("DD/MM/YYYY")
                                        }
                                        {
                                            // Moment(new date(order.order_date)).format("h:mm A")
                                            // Moment(order.order_date).format("h:mm:ss a")
                                        }
                                        </td>
                                        <th className="px-4 py-3"></th>
                                        <td className="px-4 py-3"></td>
                                                                             
                                    </tr>
                                    <tr>                                        
                                        <th className="px-4 py-3">Customer Name</th>
                                        <td className="px-4 py-3">: {order.customer_name}</td>
                                        <th className="px-4 py-3"></th>
                                        <td className="px-4 py-3">:</td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-3">Customer Mobile</th>
                                        <td className="px-4 py-3">: {order.customer_phone}</td>
                                        <th className="px-4 py-3"></th>
                                        <td className="px-4 py-3"></td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-3">Order Status</th>
                                        <td className="px-4 py-3">: 
                                            <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-sm dark:text-gray-100 dark:bg-gray-700 uppercase">
                                            {order.order_status}
                                            </span>
                                        </td>       
                                        <td className="px-4 py-3"></td>
                                        <td className="px-4 py-3">
                                            
                                        </td>                       
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-3">City</th>
                                        <td className="px-4 py-3">: {order.customer_city}</td>
                                        <th className="px-4 py-3">Order Status</th>
                                        <td className="px-4 py-3">
                                            <form method="get">
                                                <select name="order_status" onChange={handleChangeStatus} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="hold">Hold</option>
                                                    <option value="confirmation">Confirmation</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="declined">Declined</option>
                                                </select>
                                            </form>
                                            
                                        </td>                                                                              
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-3">Area</th>
                                        <td className="px-4 py-3">: {order.customer_area}</td>
                                        
                                                                             
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-3">Postal Code</th>
                                        <td className="px-4 py-3">: {order.customer_zip}</td>
                                       
                                                                             
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-3">Address</th>
                                        <td className="px-4 py-3">: {order.address}</td>                                        
                                                                             
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8 drop-shadow-lg">
                <div className="w-full overflow-x-auto">
                    
                    <table className="w-full whitespace-no-wrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-3">Ordered Items</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                            <table className="w-full border-collapse border border-slate-400">
                                
                                <tbody>
                                    <tr>
                                        <th className="px-4 py-3 text-left">Item ID</th>
                                        <th className="px-4 py-3 text-left">Item SKU</th>
                                        <th className="px-4 py-3 text-left">Item Title</th>
                                        <th className="px-4 py-3 text-left">Details</th>
                                        <th className="px-4 py-3 text-right">Price</th>
                                        <th className="px-4 py-3 text-right">QTY</th>                                        
                                        <th className="px-4 py-3 text-right">Sub-total</th>
                                        <th className="px-4 py-3 text-center">Action</th>
                                                                             
                                    </tr>
                                    
                                        {orderItems.map( (itemValue, index) => (
                                                <tr>
                                                    <td className="px-4 py-3 text-left">{itemValue.item_info.id} </td>
                                                    <td className="px-4 py-3 text-left"> {itemValue.item_info.sku} </td>
                                                    <td className="px-4 py-3 text-left"> {itemValue.item_info.title} </td>
                                                    <td className="px-4 py-3 text-left"> </td>
                                                    <td className="px-4 py-3 text-right"> {itemValue.item_price} </td>
                                                    <td className="px-4 py-3 text-right"> {itemValue.qty} </td>
                                                    <td className="px-4 py-3 text-right"> {itemValue.item_price * itemValue.qty} </td>
                                                    <td className="px-4 py-3 text-center"> 
                                                    <button className="px-4 py-2 text-sm bg-orange-500 border text-white font-bold uppercase  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        > Edit</button>
                                                        <button className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-400 hover:bg-red-700 focus:outline-none shadow hover:shadow-lg focus:shadow-outline-purple"
                                                        > Delete</button>
                                                        
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    
                                </tbody>
                            </table>
                        </tbody>
                    </table>
                </div>
            </div>
        </Authenticated>
    );
}
