import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import ToastMessage from '../../components/ToastMessage/ToastMessage';
import EmptyCard from '../../components/Cards/EmptyCard';



function Home() {
    Modal.setAppElement('#root');

    const [openEditModal, setOpenEditModal]=useState({
        isShown:false,
        type:"add",
        data:null,
    });

    const [showToastMsg, setshowToastmsg]=useState({
        isShown:false,
        message:"",
        type:"add",
    });
    
    const [userInfo, setUserInfo]=useState(null);
    const [allNotes, setAllNotes]=useState([]);
    const [isSearch, setIsSearch]=useState(false);
    const navigate=useNavigate();

    //handle Edit
    const handleEdit = async(noteDetails)=> {
        setOpenEditModal({
            isShown:true,
            data:noteDetails,
            type:"edit",
        })

    }

    const showToastMessagefn= (message,type)=> {
        setshowToastmsg({
            isShown:true,
            message,
            type
        });
    }

    const handleCloseToast= ()=> {
        setshowToastmsg({
            isShown:false,
            message:"",
        });
    }

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

    //Delete Note
    const deleteNote = async(data)=> {
        const noteId=data._id;
        try{

            const response=await axiosInstance.delete("/delete-note/"+noteId);
            if(response.data && !response.data.error) {
                showToastMessagefn("Note deleted successfully!", 'delete');
                getAllnotes();
            }

        } catch(e) {
            if(
                error.response &&
                error.response.data &&
                error.response.data.message 
            ) {
                console.log("An unexpected error occurred! Please, try again!")
            }

        }

    }

    //Search for a note!
    const onSearchNote=async(query)=> {
        try{
            const response=await axiosInstance.get("/search-notes", {
                params : {query},
            });

            if(response.data && response.data.notes) {
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }

        } catch(e) {
            console.log(e);

        }
        
    }


    //Handle isPinned API
    const updateIsPinned = async(notedata)=> {
        const noteId=notedata._id;
        try{
            const response=await axiosInstance.put("/update-note-pinned/" + noteId , {
                isPinned:!notedata.isPinned
            })

            if(response.data && response.data.note) {
                showToastMessagefn("Note Updated Successfully!");
                getAllnotes();
            }

        }catch(e) {
            console.log(e);

        }

    }
    const handleClearSearch = ()=> {
        setIsSearch(false);
        getAllnotes();
    }

    useEffect(()=> {
        getUserInfo();
        getAllnotes();
        return ()=> {
        }

    },[]);

    return(
        <>
            <Navbar 
                userInfo={userInfo} 
                onSearchNote = {onSearchNote}
                handleClearSearch = {handleClearSearch}/>
            <div className='container mx-auto'>
                {allNotes.length > 0 ? (<div className='grid grid-cols-3 gap-4 mt-8'>
                    {
                        allNotes.map((item,index)=> (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={()=> handleEdit(item)}
                            onDelete={()=> deleteNote(item)}
                            onPinNote={()=> updateIsPinned(item)}/>
                        ))
                    }
                </div> ): 
                   ( <EmptyCard 
                        imgSrc={isSearch ? 'https://static.thenounproject.com/png/4440902-200.png':'https://static.thenounproject.com/png/3720828-200.png'}
                        message={isSearch ? `Oops!! no notes found matching your search.` :`Start creating your first note! 
                        Click on the "ADD" button to note-down your thoughts, ideas and remainders!!`} /> )}
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
            showToastMessagefn={showToastMessagefn}
            />
            </Modal>

            <ToastMessage
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onClose={handleCloseToast}
            />
            
        </>
    )
}

export default Home;