import jwt from "jsonwebtoken"


const verifyToken = (req , res , next)=>{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({message: 'Unauthorized: token not provided'});
    }

    try{
        console.log("varify token reached");
        const decodedToken = jwt.verify(token , process.env.JWT_SECRET);
        req.username = decodedToken.username;
        req._id = decodedToken.userId;
        console.log("verify called",decodedToken, req.username);
        next();
    } catch(error){
        return res.status(401).josn({message: 'Unauthorized: Invalid Token'});
        console.log(error.message);
    }
}


export default verifyToken;