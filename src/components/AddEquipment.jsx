import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../firebase/AuthProvider';

const AddEquipment = () => {
    const { user } = useContext(AuthContext);
    const [selectedCategory, setSelectedCategory] = useState('Select Your Category')
    const categoryOptions = [
        "Select Your Category",
        "Cricket",
        "Football",
        "Badminton",
        "Tennis",
        "Gym Equipment",
        "Cycling",
        "Swimming",
        "Basketball",
        "Hockey",
    ];


    const handleAddEquipment=e=>{
        e.preventDefault();
        if(selectedCategory==='Select Your Category'){
            return Swal.fire({
                icon: 'warning',
                title: '',
                text: 'Select a specified category please',
                confirmButtonColor: '#3b82f6', // Tailwind blue-500
            });
        }
        const photo = e.target.photo.value;
        const item = e.target.item.value;
        const category = e.target.category.value;
        const description = e.target.description.value;
        const price = e.target.price.value;
        const rating = e.target.rating.value;
        const customization = e.target.customization.value;
        const processingTime = e.target.processingTime.value;
        const stockStatus = e.target.stockStatus.value;
        const name = user?.displayName;
        const email = user?.email; 
        const newEquipment={ photo, item, category, description, price, rating, customization, processingTime, stockStatus, name, email };
        console.log(newEquipment);
        fetch('http://localhost:5000/equipments',{
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(newEquipment)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                Swal.fire({
                    icon: 'success',
                    title: 'Great',
                    text: 'Equipment has successfully added',
                    confirmButtonColor: '#3b82f6', // Tailwind blue-500
                });
                e.target.reset();
            }
        })
    }

    return (
        <div>
            <div className='max-w-3xl mx-auto mt-12 bg-gray-300 py-8 bg-opacity-40'>
                <h2 className='text-center text-4xl font-bold mb-10'>Add Your Equipment</h2>
                <form onSubmit={handleAddEquipment}>
                    <div className='flex justify-between mx-3 mb-6'>
                        <input className='w-[48%] rounded-md px-2 py-2' placeholder='PhotoURL' type="text" name="photo" id="" />
                        <input className='w-[48%] rounded-md px-2 py-2' placeholder='Item Name' type="text" name="item" id="" />
                    </div>
                    <div className='flex justify-between mx-3 mb-6'>
                        <select value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)} className='w-[48%] rounded-md px-2 py-2' placeholder='Category' name="category">{categoryOptions.map(option=><option key={option} value={option}>{option}</option>)} </select>
                        <input className='w-[48%] rounded-md px-2 py-2' placeholder='Description' type="text" name="description" id="" />
                    </div>
                    <div className='flex justify-between mx-3 mb-6'>
                        <input className='w-[48%] rounded-md px-2 py-2' placeholder='Price' type="number" name="price" id="" />
                        <input className='w-[48%] rounded-md px-2 py-2' placeholder='Rating(out of 5)' type="number" step={0.1} max={5} name="rating" id="" />
                    </div>
                    <div className='flex justify-between mx-3 mb-6'>
                        <input className='w-[48%] rounded-md px-2 py-2' placeholder='Customization' type="text" name="customization" id="" />
                        <input className='w-[48%] rounded-md px-2 py-2' placeholder='Processing Time' type="text" name="processingTime" id="" />
                    </div>
                    <div className='flex justify-between mx-3 mb-6'>
                        <input className='w-[48%] rounded-md px-2 py-2' placeholder='Stock Status' type="number" name="stockStatus" id="" />
                        <input className='w-[48%] bg-lime-500 font-bold text-sm rounded-md px-2 py-2' placeholder='Processing Time' type="submit" value="Submit" id="" />
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default AddEquipment;