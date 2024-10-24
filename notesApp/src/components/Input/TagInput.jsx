import React from 'react'
import {MdAdd, MdClose} from 'react-icons/md';
import { useState } from 'react';

function TagInput({tags, setTags}) {

    const [inputValue, setInputValue]=useState("");

    const handleInputChange=(e)=> {
        setInputValue(e.target.value);
    }
    const addNewTag=()=> {
        if(inputValue.trim()!=="") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    }
    const handleKeyDown= (e)=> {
        if(e.key==='Enter') {
            addNewTag();
        }
    }
    const handleRemoveTag=(removeTag)=> {
        setTags(tags.filter((tag)=> tag!= removeTag));
    }
    return(
        <div>
            {
            tags?.length > 0  && 
            <div className='flex items-center flex-wrap mt-2 gap-2 '>
                {tags.map((tag,index)=> (
                    <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
                        #{tag}
                        <button  onClick={()=>{handleRemoveTag(tag)}} className=''>
                            <MdClose className=''/>
                        </button>
                    </span>
                ))}
            </div>
            }
            
            <div className='flex items-center gap-4 mt-3'>
                <input
                type="text"
                placeholder='Add tags'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className='text-sm bg-transparent border  border-gray-900 px-3 py-1.5 rounded outline-none'/>

                <button
                onClick={()=> {addNewTag()}}
                className='w-8 h-8 flex items-center justify-center rounded border border-gray-900 hover:bg-gray-800'>
                    <MdAdd className='text-2xl text-gray-900 hover:text-white'/>
                </button>
            </div>
        </div>
    )
}
export default TagInput;