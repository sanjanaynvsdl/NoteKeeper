import React, {useEffect, useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import {MdAdd} from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';


function Home() {
    Modal.setAppElement('#root');

    const [openEditModal, setOpenEditModal]=useState({
        isShown:false,
        type:"add",
        data:null,
    });
    
    const [userInfo, setUserInfo]=useState(null);
    const [allNotes, setAllNotes]=useState([]);
    const navigate=useNavigate();


    //Get-User API call,
    //Pass this user-info to Nav-bar
    const getUserInfo = async()=> {
        try{
            const response= await axiosInstance.get("/get-user");
            if(response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        }
        catch(error) {
            if(error.response.status=401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    }


    //get-all-notes
    const getAllnotes= async()=> {
        try{
            const response=await axiosInstance.get('/get-all-notes');
            if(response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch(error) {
            console.log("An unexpected error occurred, Please try again later!");
        }
    }

    useEffect(()=> {
        getUserInfo();
        getAllnotes();
        return ()=> {
        }

    },[]);

    return(
        <>
            <Navbar userInfo={userInfo}/>
            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    {
                        allNotes.map((item,index)=> (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={()=> {}}
                            onDelete={()=>{}}
                            onPinNote={()=> {}}/>
                        ))
                    }
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
            onRequestClose={() => setOpenEditModal({ isShown: false, type: 'add', data: null })}
            style={{
                overlay:{
                    backgroundColor:"rgba(0,0,0,0.2)"
                },
                content: {
                    backgroundColor: "#e9d5ff", 
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
                    data:null
                });
            }}
            getAllnotes={getAllnotes}
            />
            </Modal>
            
        </>
    )
}

export default Home;