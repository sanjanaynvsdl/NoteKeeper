const jwt=require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader= req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
        if(err) return res.sendStatus(401);
        // console.log('Decoded token payload:', user); added for debugging!
        req.user=user;
        next();
    });
}

module.exports = {
    authenticateToken,
};


//Things to know about the authentication!
//This part acts like a middleware
//Accr to req, which has
//1. Headers.PayLoads.Signature
//2. It decoed the signature and verify with out secret_token
//3. if it matches then, from payLoads data is being extracted and set to the user! 
//4. Then we call next() -> to procedd with the next logic 
//5. In-case of any errors we will return her-itself