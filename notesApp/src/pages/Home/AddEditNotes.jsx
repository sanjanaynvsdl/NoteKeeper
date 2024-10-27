import React, { useState } from 'react';
import TagInput from '../../components/Input/TagInput';
import {MdClose} from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes=({type, notedata, onClose,getAllnotes, showToastMessagefn})=> {

    const [title, setTitle]=useState(notedata?.title || "");
    const [content, setContent]=useState(notedata?.content || "");
    const [tags, setTags]=useState(notedata?.tags || []);
    const [error, setError]=useState(null);


    const addNewnote= async ()=>{
        try{
            const response=await axiosInstance.post('/add-note', {
                title,
                content,
                tags,
            });

            
            if(response.data && response.data.note) {
                showToastMessagefn("Note Added Successfully!");
                getAllnotes();
                onClose();
            }

        } catch(error) {

            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                setError("An unexpected error occured, Please try again!")
            }

        }

    };
    const editNote=async()=> {
        const noteId=notedata._id;
        try{
            const response=await axiosInstance.put("/edit-note/" + noteId , {
                title, 
                content,
                tags,
            })

            if(response.data && response.data.note) {
                showToastMessagefn("Note Updated Successfully!");
                getAllnotes();
                onClose();
            }

        }catch(e) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }

        }
    };


    const handleAddnote=()=> {
        if(!title) {
            setError("Please enter the title.");
            return;
        }
        if(!content) {
            setError("Please enter the content.");
            return;
        }
        setError("");

        if(type=='edit') {
            editNote();
        }
        else {
            addNewnote();
        }
    };

    return(

        <div className='bg-purple-200 relative '>
            <button className='w-10 h-10 rounded-full items-center justify-center flex absolute -top-3 -right-3 hover:bg-purple-300  ' onClick={onClose}>
                <MdClose className='text-xl text-slate-600 '/>
            </button>

            {/* Title */}
            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input
                type="text"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                placeholder='Title for the note :)'
                className='text-2xl text-slate-950 outline-none bg-transparent'/>
            </div>

            {/* Content */}
            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>CONTENT</label>
                <textarea
                rows={10}
                type="text"
                value={content}
                onChange={(e)=> setContent(e.target.value)}
                placeholder='content'
                className='text-sm text-slate-950 outline-none bg-purple-50 p-2 rounded'/>
            </div>


            {/* Tags */}
            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <TagInput 
                tags={tags}
                setTags = {setTags}/>
            </div>

            {/* Error Handling */}
            {error && <p className='text-xs text-red-500 pt-5'>{error}</p>}

            {/* This buttons adds everything and a new notes is being added */}
            <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddnote}>{type === "edit" ? "Update" : "Add"}</button>
        </div>
    )
}
export default AddEditNotes;
