import React, { useState } from 'react';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'


function PasswordInput({value, onChange, placeholder}) {

    const [showPassword, setShowPassword]=useState(false);

    const togglePassword= ()=> {
        setShowPassword(!showPassword);
    }
    return(
        <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3 border-gray-600 pl-1.5' >
            <input
            type= {showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            className='w-full text-sm py-3 mr-3 outline-none bg-transparent'
            placeholder={placeholder || "password"}/>



            {showPassword ?<FaRegEye
            size={22}
            className='text-gray-800 cursor-pointer'
            onClick={()=> togglePassword()}
            /> : 
            <FaRegEyeSlash 
            size={22}
            className='text-gray-800 cursor-pointer'
            onClick={()=> togglePassword()}
            />
            }
            

        </div>
    )
}
export default PasswordInput;