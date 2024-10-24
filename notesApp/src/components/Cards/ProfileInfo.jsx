import React from 'react';
import { getIntials } from '../../utils/helper';

function ProfileInfo({onLogout}) {
    return(
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full  text-white font-medium bg-gray-800'>
                {getIntials("Sanjana Yalamarthi")}
            </div>
            <div>
                <p className='text-small font-medium'>Sanjana</p>
                <button className='text-sm text-gray-800 underline' onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}
export default ProfileInfo;