import React from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
function Navbar() {
    return(
        <div className='bg-purple-200 flex items-center justify-between pt-6px px-6 py-2 drop-shadow'>
            <h2 className='text-2xl font-medium  text-black py-2'>
            Notes
            </h2>
            <ProfileInfo/>
        </div>
    )
}

export default Navbar;