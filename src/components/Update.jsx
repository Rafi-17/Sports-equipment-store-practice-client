import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Update = () => {
    const user=useLoaderData();
    console.log(user);
    const navigate= useNavigate();
    const handleUpdateUser=e=>{
        e.preventDefault();
        const name= e.target.name.value;
        const email= e.target.email.value;
        const updatedUser={name, email};
        fetch(`http://localhost:5000/users/${user._id}`,{
            method: 'PUT',
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount>0){
                alert('Updated Successfully!!')
            }
            navigate('/users');
        })

    }
    return (
        <div>
            <form onSubmit={handleUpdateUser} className="max-w-md mx-auto mt-8 text-center">
                <input className="mb-2 px-3 py-1 rounded-sm" defaultValue={user.name} placeholder="Your Name" type="text" name="name" id="" />
                <br />
                <input className="mb-3 px-3 py-1 rounded-sm" defaultValue={user.email} placeholder="Your Email" type="email" name="email" id="" />
                <br />
                <input className="px-3 py-1 text-sm font-medium rounded-md bg-white text-black" type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;