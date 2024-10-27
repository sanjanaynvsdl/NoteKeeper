import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import Passwordd from '../../components/Input/Passwordd'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';


const Login = ()=> {

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState(null);

    const navigate=useNavigate(); 

    const handleLogin= async (e)=> {
        e.preventDefault();
        console.log("Submitted!")

        if(!validateEmail(email)) {
            setError("Please enter a valid Email!");
            return;
        }
        if(!password) {
            setError("Please enter a valid password!");
            return;
        }
        setError("");


        //hangle Login API
        try{

            const response= await axiosInstance.post("/login", {
                email:email,
                password:password,
            });

            //Handle successful login response
            if(response.data && response.data.accessToken) {

                localStorage.setItem("token",response.data.accessToken);
                navigate('/dashboard');
            }

        } 
        
        catch(error) {
            
            if(error.response && error.response.data && error.response.data.message) {

                setError(error.response.data.message);
            }
            else {
                setError("An unexpected error occured, Please try again!");
            }

        }
    };

    return(
        <>
        <Navbar/>
            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 drop-shadow-2xl rounded-sm bg-purple-200 px-7 py-10'>
                    <form onSubmit={handleLogin} className=''>

                        <h4 className='text-2xl mb-7 text-center'>Login</h4>

                        <input
                        type="text"
                        value={email}
                        placeholder='Email'
                        className='input-box'
                        onChange={(e)=> setEmail(e.target.value)}/>
                        

                        <Passwordd 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}/>

                        {error &&  <p className='text-red-700 text-xs pb-1'>{error}</p>}

                        <button
                        type ="submit" 
                        className='btn-primary'>Login</button>

                        <p className='text-sm text-center mt-4'> Not registered yet?{" "}
                        <Link to="/signUp" className='font-medium text-primary underline'>Create an Account</Link>
                        </p>

                    </form>
                </div>
            </div>
        </> 
    )
}
export default Login;