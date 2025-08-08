import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
    const allusers= useLoaderData();
    const [users,setUsers]= useState(allusers);
    const handleDelete=(id)=>{
        
        const data= users.find(user=>user._id===id);
        console.log(data);
        fetch(`https://users-management-server-one.vercel.app/users/${id}`,{
            method: 'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount>0){
                const updatedUsers = users.filter(user=>user._id !== id);
                setUsers(updatedUsers)
            }
        })
    }
    return (
        <div>
            <h2 className='text-3xl text-center font-bold my-10'>Total Users: {users.length}</h2>
            <div className='max-w-md space-y-2 mx-auto text-center font-medium'>
                {
                    users.map(user=> <p key={user._id}>{user.name} : {user.email} 
                    <Link className='px-4 border ml-2 rounded-md text-xs bg-gray-700 font-bold' to={`/update/${user._id}`}>Update</Link> 
                    <button onClick={()=>handleDelete(user._id)} className='px-4 border ml-2 rounded-md text-xs bg-red-600 font-bold'>X</button></p>)
                }
            </div>
        </div>
    );
};

export default Users;