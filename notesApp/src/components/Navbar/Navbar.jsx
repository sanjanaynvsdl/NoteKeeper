import React from 'react';
import { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import {useNavigate} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

function Navbar({userInfo, onSearchNote, handleClearSearch}) {

    const [searchQuery, setSearchQuery]=useState("");
    const navigate=useNavigate();


    const onLogout=()=> {
        localStorage.clear();
        navigate("/login");
    };

    const handleSearch=()=> {
        if(searchQuery) {
            onSearchNote(searchQuery);
        }
        
    }

    const onClearSearch=()=> {
        setSearchQuery("");
        handleClearSearch();
    }
    
    return(
        <div className='bg-purple-200 flex items-center justify-between pt-6px px-6 py-2 drop-shadow'>
            <h2 className='text-2xl font-medium  text-black py-2'>Notes</h2>

            <SearchBar
            value={searchQuery}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
            onChange={(e)=> setSearchQuery(e.target.value)}/>

            <ProfileInfo  userInfo = {userInfo} onLogout={onLogout}/>
        </div>
    )
}

export default Navbar;