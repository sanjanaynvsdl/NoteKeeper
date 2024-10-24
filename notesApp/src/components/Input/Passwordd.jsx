import React from 'react';
import {useState} from 'react';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const Passwordd = ({value, onChange, placeholder})=> {

    const [isShowPass, setIsShowPass]=useState(false);

    const togglePass=()=> {
        setIsShowPass(!isShowPass);
    }
    return (
        <div className='flex items-center  w-full text-sm '>
            <input
            value={value}
            type="password"
            onChange={onChange}
            className='input-box'
            autoComplete="new-password" 
            placeholder={placeholder || "password"}/>



            {/* I haven't used this coz input field is already using default password eye icons!
            To use this add in input field - type = {isShowPass: "text" : "password"}  */}
            {/* {isShowPass ?
            <FaRegEye
            size={22}
            onClick={()=> togglePass()}
            className='text-gray-800 cursor-pointer'
            /> 
            :
            <FaRegEyeSlash
            size={22}
            onClick={()=> togglePass()}
            className='text-gray-800 cursor-pointer'/>
            } */}
            
        </div>
    )

}

export default Passwordd;