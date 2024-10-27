import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Passwordd from '../../components/Input/Passwordd'
import {Link, useNavigate} from 'react-router-dom'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance'

function SignUp() {

    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPasswod]=useState("");

    const [error, setError]=useState(null);
    const navigate=useNavigate();

    const handleSignup = async (e)=> {

        e.preventDefault();
        if(!name) {
            setError("Please enter you name!");
            return;
        }
        if(!validateEmail(email)) {
            setError("Please enter a valid email!");
            return;
        }
        if(!password) {
            setError("Please enter a password!");
            return;
        }
        setError("");

        //signUp API call!
        try{
            const response = await axiosInstance.post('/create-account', {
                fullName:name,
                email:email,
                password:password,
            })

            //handle for user-registration case
            if(response.data && response.data.error) {
                setError(response.data.message);
                return;
            }

            if(response.data && response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/dashboard');
            }

        //handle for the error case-
        } catch(error) {

            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                setError("An unexpected error occured, Please try again!")

            }
        }
    }
    


    return (
        <>
        <Navbar/>
            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 drop-shadow-2xl rounded-sm bg-purple-200 px-7 py-10'>
                    <form  className='' onSubmit={handleSignup}>
                        <h4 className='text-2xl mb-7 text-center'>Sign Up</h4>

                        <input
                        type = "text"
                        placeholder='Name'
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        className='input-box'/>

                        <input
                        type = "text"
                        placeholder='Email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        className='input-box'/>

                        <Passwordd
                        value={password}
                        onChange={(e)=> setPasswod(e.target.value)}/>


                        {error &&  <p className='text-red-700 text-xs pb-1'>{error}</p>}

                        <button 
                        type="submit"
                        className='btn-primary'>Create Account</button>
                        <p className='text-sm text-center mt-4'>Already have an account?{" "}
                        <Link to="/login" className='font-medium text-primary underline'>Login</Link>
                        </p>



                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;