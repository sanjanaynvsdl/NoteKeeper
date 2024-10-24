import React, {useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import {MdAdd} from 'react-icons/md'
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal'

function Home() {

    const [openEditModal, setOpenEditModal]=useState({
        isShown:false,
        type:"add",
        data:null,
    });
    
    return(
        <>
            <Navbar/>
            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    <NoteCard
                    title="Notes app"
                    date="23rd October 2024"
                    content="This is my first notes to test!"
                    tags="#Mynotes"
                    isPinned={true}
                    onEdit={()=> {}}
                    onDelete={()=>{}}
                    onPinNote={()=> {}}/>
                    
                </div>
            </div> 

            
            {/* Button to add new-notes */}
            <button
                onClick={()=>{
                    setOpenEditModal({isShown:true, type:"add", data:null})
                }}
                className='w-16 h-16 flex items-center justify-center rounded-3xl bg-gray-700 hover:bg-gray-800 absolute right-10 bottom-10'>
                <MdAdd className='text-[32px] text-white'/>
            </button>


            {/* wrapped a desired component inside this modal! (we can hide them or make it visible)*/}
            <Modal
            isOpen={openEditModal.isShown}
            onRequestClose={()=> {}}
            style={{
                overlay:{
                    backgroundColor:"rgba(0,0,0,0.2)"
                },
                content: {
                    backgroundColor: "#e9d5ff", // Set the modal content background to white
                    // borderRadius: '12px',
                    // padding: '20px',
                    // width: '80%',  // Adjust width if necessary
                    // margin: 'auto' // Center it on the screen
                  }
            }}
            contentLabel=""
            className='w-[40%] max-h-3/4 bg-purple-150 rounded-md mx-auto mt-14 overflow-scroll p-5'>
            
            <AddEditNotes
            type={openEditModal.type}
            notedata={openEditModal.data}
            onClose={()=> {
                setOpenEditModal({
                    isShown:false,
                    type:"add",
                    data:null,
                });
            }}
            />
            </Modal>
            
        </>
    )
}

export default Home;