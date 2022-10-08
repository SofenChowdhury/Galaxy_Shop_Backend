import React,{useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head,usePage } from '@inertiajs/inertia-react';
import PageTitle from "@/Components/PageTitle";
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
export default function Index(props) {

    const {roles} = usePage().props;
    const [editForm ,setEditForm] = useState(null); 
    const [showForm ,setShowForm] = useState(null); 

    
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const storeItem = (e) => {
        e.preventDefault();
        post(route('prefix.store'), {
            forceFormData: true
        });
    };

    // const addForm = (e)=>{
    //     e.preventDefault();
    //     setShowForm(true);
    //     setEditForm(false);
    //     setData({
    //         ...data, 
    //         name:"",
    //         id:"",
    //     });
    // }

    // const editItem = (e) =>{
    //     e.preventDefault();
    //     setEditForm(true);
    //     setShowForm(true);
    //     const id =  e.target.attributes.getNamedItem("data-key").value;
    //     if(id !==""){
    //         axios.get("/api/prefix-edit/" + id)
    //         .then(res =>{
    //             // console.log(res.name);
    //             setData({
    //                 ...data, 
    //                 id:res.data.id,
    //                 name:res.data.name,
                    
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    //     }
    // }
    const updateItem = (e)=>{
        e.preventDefault();
        Inertia.put(route('prefix.update', data.id),data);
        if(toaster !== null){
            Helper.alertMessage('success', toaster.message);
        }
        e.target.reset();
    }
    if (!roles) return "No Users found!";

    return (
        <Authenticated auth={props.auth} errors={props.errors}> 
            <Head title="Attribute Prefix" />
                <PageTitle>Manage Roles</PageTitle>


                {
                  showForm &&
                    <form onSubmit={editForm ? updateItem : storeItem }>
                        <div className="flex flex-row gap-3 mb-5">
                            <div className="basis-2/3 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                                <div className="">
                                    <Label forInput="name" className="" value="Name" />

                                    <Input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                        focus:shadow-outline-purple dark:text-gray-300 
                                        dark:focus:shadow-outline-gray form-input"
                                        autoComplete="name"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>

                                <div className="flex items-center mt-4">
                                   <Button className="bg-green-400 hover:bg-green-500 text-white py-2 mr-2 px-4 rounded" >
                                        { editForm ? "Update":"Save"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>

                 
                }

                
                <div className="mb-12 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3">Id</th>
                                        <th className="px-4 py-3">Prefix Name</th>
                                        <th className="px-4 py-3 text-right">Action</th>
                                        
                                    </tr>
                                </thead>
                                
                                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                    {roles && roles.map((value, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-3">
                                                {value.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.name}
                                            </td>

                                            <td className="px-4 py-3  text-right">
                                                <Link data-key={value.id}   className="btnInfo hover:btnInfo text-white py-2 mr-2 px-4 shadow-md rounded"> 
                                                    <i data-key={value.id} className="fas fa-pencil"></i>
                                                </Link>
                                            </td>


                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
           
        </Authenticated>
    );
}
