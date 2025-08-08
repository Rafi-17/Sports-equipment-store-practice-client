import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../firebase/AuthProvider';
import { auth } from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const Register = () => {
    const {createUser, userProfileUpdate, setUser} = useContext(AuthContext);

    const handleRegister=e=>{
        e.preventDefault();
        const name= e.target.name.value;
        const email= e.target.email.value;
        const password= e.target.password.value;
        createUser(email, password)
        .then(result=>{
            const updateObj = {displayName: name};
            console.log(result.user);
            userProfileUpdate(updateObj)
            .then(async()=>{
                await result.user.reload();
                setUser({...auth.currentUser})
                Swal.fire({
                    title: "Success!",
                    text: "Registered Successfully",
                    icon: "success",
                    confirmButtonText: "Ok"
                });
            })
            .catch(error=>{
                console.log(error);
            })
            e.target.reset();
        })
        
        .catch(error=>{
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                // confirmButtonText: 'Ok'
            })
        })
    }

    return (
        <div>
            <div className='max-w-lg mx-auto min-h-[400px] pt-12 mt-10 bg-gray-300 bg-opacity-40 rounded-md'>
                <h2 className='text-center mb-10 text-2xl font-bold text-white'>Create Your Account</h2>
                <form onSubmit={handleRegister}>
                    <div className='text-center mb-6'>
                        <input className='w-2/3 py-2 px-3 rounded-md  placeholder:text-white' type="text" name="name" placeholder='Name' />
                    </div>
                    <div className='text-center mb-6'>
                        <input className='w-2/3 py-2 px-3 rounded-md  placeholder:text-white' type="email" name="email" placeholder='Email' />
                    </div>
                    <div className='text-center mb-6'>
                        <input className='w-2/3 py-2 px-3 rounded-md placeholder:text-white' type="password" name="password" placeholder='Password' />
                    </div>
                    <div className='text-center'>
                        <input className='w-2/3 py-2 px-3 rounded-md bg-lime-600 font-bold' type="submit" value="Register" />
                    </div>
                </form>
                <p className='pl-1 w-2/3 mx-auto mt-3 text-sm font-semibold'>Already have account? <Link className='text-lime-500 underline font-bold' to={'/login'}>Register</Link></p>
            </div>
        </div>
    );
};

export default Register;