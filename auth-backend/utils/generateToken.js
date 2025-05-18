import jwt from "jsonwebtoken"

const generateJWTTokenTokenAndSetCookie = (userId , username,res) => {
    const token = jwt.sign({userId , username} , process.env.JWT_SECRET , {
        expiresIn: "15d"
    })

    res.cookie("jwt" , token , {
        maxAge: 15*24*60*60*1000, // mili seconds
        httpOnly: true,
        sameSite: "strict",
        secure: false
    })
}

export default generateJWTTokenTokenAndSetCookie;