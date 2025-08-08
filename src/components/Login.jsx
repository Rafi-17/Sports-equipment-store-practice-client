import React, { useContext } from 'react';
import { AuthContext } from '../firebase/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Login = () => {
    const {loginUser} = useContext(AuthContext);

    const handleLogin=e=>{
        e.preventDefault();
        const email= e.target.email.value;
        const password= e.target.password.value;
        loginUser(email, password)
        .then(result=>{
            console.log(result.user);
            e.target.reset();
            Swal.fire({
                title: "Success!",
                text: "Logged in Successfully",
                icon: "success",
                confirmButtonText: "Ok"
            });
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
                <h2 className='text-center mb-10 text-2xl font-bold text-white'>Login Please!</h2>
                <form onSubmit={handleLogin}>
                    <div className='text-center mb-6'>
                        <input className='w-2/3 py-2 px-3 rounded-md  placeholder:text-white' type="email" name="email" placeholder='Email' />
                    </div>
                    <div className='text-center mb-6'>
                        <input className='w-2/3 py-2 px-3 rounded-md placeholder:text-white' type="password" name="password" placeholder='Password' />
                    </div>
                    <div className='text-center'>
                        <input className='w-2/3 py-2 px-3 rounded-md bg-lime-600 font-bold' type="submit" value="Log In" />
                    </div>
                </form>
                <p className='pl-1 w-2/3 mx-auto mt-3 text-sm font-semibold'>New here? <Link className='text-lime-500 underline font-bold' to={'/register'}>Register</Link></p>
            </div>
        </div>
    );
};

export default Login;