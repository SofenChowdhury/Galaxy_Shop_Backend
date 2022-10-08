import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import PageTitle from "@/Components/PageTitle";
import Pagination from "@/Components/Common/Pagination";

export default function Index(props) {
    const { customers } = usePage().props;
    console.log(props);
    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}>
                <Head title="Customers" />
                <PageTitle>Customers</PageTitle>
                <div className="mb-4 w-full rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                    <div className="mb-2 grid grid-cols-5 gap-2">
                        <div className="flex flex-col">
                            <label for="customer_phone" className="mb-2 font-semibold">Customer Mobile</label>
                            <input type="text" id="customer_phone" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                    dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                    focus:shadow-outline-purple dark:text-gray-300 
                                    dark:focus:shadow-outline-gray form-input" />
                        </div>

                        <div className="flex flex-col">
                            <label for="customer_phone" className="mb-2 font-semibold">Customer Email</label>
                            <input type="email" id="customer_email" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                    dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                    focus:shadow-outline-purple dark:text-gray-300 
                                    dark:focus:shadow-outline-gray form-input" />
                        </div>
                        <div className="flex flex-col">
                            <label for="order_date" className="mb-6 font-semibold"></label>
                            <button
                                type="button"
                                class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                            >
                                <i class="fa-solid fa-magnifying-glass"></i> Search
                            </button>
                        </div>                   
                        
                    </div>
                </div>
                <div className="mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3">Id</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Mobile</th>
                                        <th className="px-4 py-3">Action</th> 
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                    {customers.data.map((value, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-3">
                                                {value.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.phone}
                                            </td>
                                            <td className="px-4 py-3"></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={customers.links} />
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
