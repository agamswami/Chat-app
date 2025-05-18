
export const loginUsingJWT = async (req , res) => {
    console.log("called");
    const username = req.username;
    const userId = req.userId;
    console.log("login with jwt called" , username , userId);
    res.status(201).json({_id: userId , username: username});
}
