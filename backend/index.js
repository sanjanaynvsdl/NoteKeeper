require("dotenv").config();                 //To load .env file!

const config=require('./config.json');      //Get the mongoDB url,
const mongoose=require('mongoose');         //get mongoose library
mongoose.connect(config.connectionString);  //connect the string!

//Importing models
const User=require('./models/user.model');
const Note=require('./models/note.model');




const express=require("express");   //loads the Express library,
const cors=require("cors");         //imports the CORS middleware into application.
const app=express();                //line initializes a new Express application instance!



const jwt=require('jsonwebtoken');
const {authenticateToken}= require('./utillities');   //middleware to validate token!

app.use(express.json());            //Middleware that parses incoming requests with JSON payloads
app.use(                            //CORS, used specify which origins are permitted to access resources from server.
    cors({                          // allows all origins to make requests to this server.
        origin:"*"
    })
)


//Test-API-call
app.get("/",(req,res)=> {
    res.json({
        data:"Hello"
    })
});

//create-account
app.post("/create-account", async(req,res)=> {
    const {fullName, email, password} =req.body;


    //Validate-request
    if(!fullName) {
        return res
        .status(400)
        .json({
            error:true,
            message:"Full Name is required!"
        })
    }
    if(!email) {
        return res
        .status(400)
        .json({
            error:true,
            message:"Email is required!"
        });
    }
    if(!password) {
        return res
        .status(400)
        .json({
            error:true,
            message:"Password is required!"
        });
    }

    //Check if the user-exists
    const isUser= await User.findOne({email:email});

    if(isUser) {
        return res
        .status(400)
        .json({
            error:true,
            message:"User Already exists!"
        });
    }

    //Create new user
    const user=new User({
        fullName,
        email,
        password,
    });

    await user.save();
    const accessToken = jwt.sign( { user }, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "30m"
    });

    return res.json({
        error:false,
        user,
        accessToken,
        message:"User Registered successfully!!"
    });

});

//login
app.post("/login",async(req,res)=> {

    const {email, password} = req.body;

    if(!email) {
        return res
        .status(400)
        .json({
            error:true,
            message:"Email is required!"
        });
    }
    if(!password) {
        return res
        .status(400)
        .json({
            error:true,
            message:"Password is required!"
        })
    }

    const userInfo=await User.findOne({email:email});

    if(!userInfo) {
        return res
        .status(400)
        .json({
            error:true,
            message:"User not found!"
        })
    }

    if(userInfo.email==email && userInfo.password==password) {
        const user= {user:userInfo}
        const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {
            expiresIn:"36000m",
        });

        return res.json({
            error:false,
            message:"Login Successful!",
            email,
            accessToken,
        });

    } else {

        return res
        .status(400)
        .json({
            error:true,
            message:"Invalid Credentials!"
        })
    }
});

//get-user
app.get("/get-user", authenticateToken ,async(req,res)=> {
    //Middleware (authenticateToken will be triggered first, if this doesn't throw an error then)
    //The route-logic will be called and data will be extracted! using req.user (where we have set in accessToken)
    const {user}=req.user;
    const isUser=await User.findOne({_id:user._id});

    if(!isUser) {
        return res
        .status(401)
        .json({
            error:true,
            message:"User not found!",
        })
    }

    return res.json({
        error:false,
        user:{
                fullName:isUser.fullName,
                email:isUser.email,
                "_id":isUser._id,
                createdOn:isUser.creatiOn
             },
        message:"used found!"
    })
});

//add-note
app.post("/add-note", authenticateToken , async(req,res)=> {
    const {title, content, tags}=req.body;
    const {user}=req.user;
    if(!title) {
        return res
        .status(400)
        .json({
            error:true,
            message:"Title is required!",
        });
    }
    if(!content) {
        return res
        .status(400)
        .json({
            error:true,
            message:"Content is required!",
        })
    }

    try{
        const note=new Note({
            title,
            content,
            tags: tags || [],
            userId:user._id,
        });

        await note.save();

        return res.json({
            error:false,
            note,
            message:"Note added successfully!",
        });        
    } catch(e) {
        return res
        .status(500)
        .json({
            error:true,
            message:"Internal server error!"
        })
    }
    


});

//edit-note
app.put("/edit-note/:noteId", authenticateToken, async(req,res)=> {
//this req. contains many-methods,
    const noteId=req.params.noteId;
    const {title, content, tags, isPinned}=req.body;
    const {user}=req.user;

    if(!title && !content && !tags) {
        return res
        .status(400)
        .json({
            error:true,
            message:"No changes required!",
        })
    }

    try{
        const note = await Note.findOne({_id:noteId , userId:user._id});

        if(!note) {
            return res
            .status(404)
            .json({
                error:true,
                message:"Note not found!",
            })
        }

        if(title) note.title=title;
        if(content) note.content=content;
        if(tags) note.tags=tags;
        if(isPinned) note.isPinned=isPinned;


        await note.save();

        return res.json({
            error:false,
            note,
            message:"Note updated successfully!",
        });
    } catch(e) {
        return res.status(500).json({
            error:true,
            message:"Internal server error!",
        });
    }

x
});

//get all notes
app.get("/get-all-notes", authenticateToken, async(req,res)=> {

    const {user}=req.user;
    
    try{
        const notes=await Note.find({userId:user._id}).sort({isPinned:-1});

        return res.json({
            error:false,
            notes,
            message:"All notes fetched successfully!",
        });

    } catch(e) {
        return res.status(500).json({
            error:true,
            message:"Internal server error!",
        })
    }

})

//delete-note
app.delete("/delete-note/:noteId", authenticateToken, async(req,res)=> {
    const noteId=req.params.noteId;
    const {user}=req.user;

    try{
        const note=await Note.findOne({_id:noteId, userId:user._id});
        if(!note) {
            return res
            .status(404)
            .json({
                error:true,
                message:"Note doesn't exist!",
            })
        }

        await note.deleteOne({_id:noteId, userId:user._id})

        return res.json({
            error:false,
            message:"Note deleted successfully!",
        });

    } catch(e) {
        return res
        .status(500)
        .json({
            error:true,
            message:"Internal server error",
        })
    }

});

//update note isPinned
app.put("/update-note-pinned/:noteId", authenticateToken, async(req,res)=> {
    const noteId=req.params.noteId;
    const {isPinned}=req.body;
    const {user}=req.user;

  

    try{
        const note = await Note.findOne({_id:noteId , userId:user._id});

        if(!note) {
            return res
            .status(404)
            .json({
                error:true,
                message:"Note not found!",
            })
        }

        note.isPinned=isPinned;


        await note.save();

        return res.json({
            error:false,
            note,
            message:"Note-pinned updated successfully!",
        });

    } catch(e) {
        return res.status(500).json({
            error:true,
            message:"Internal server error!",
        });
    }
})



app.listen(8000);

module.exports=app;












//Learn about the authenticateToken, 400, 401, 404, error - where to use which!
//Example to understand the JWT more, better! 
//BELOW CODE IS NOT RELARED TO THIS APPLICATION!
//When token is VALID:
app.get("/my-orders", authenticateToken, async(req, res) => {
    // ✅ Token was good, so req.user exists!
    console.log(req.user);  // { _id: '123', email: 'user@example.com', ...}
    // Now we can safely use this data
    // const orders = await Orders.find({ userId: req.user._id });
    // res.json(orders);
});

// When token is INVALID:
app.get("/my-orders", authenticateToken, (req, res) => {
    // ❌ This code never runs!
    // authenticateToken already sent 401 response
    //router-part
    console.log("You'll never see this!");
});


// authenticateToken is like a security guard
// It runs BEFORE your main route code
// If token is bad, your route code never runs
// If token is good, you get user data in req.user
// This is why it's called "middleware" - it's in the middle, between the request and your route handler! 



