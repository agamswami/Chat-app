    
import axios from "axios";
const JWTLogin = async (updateAuthName, router) => {
    try {
        const res = await axios.post('http://localhost:8080/checkLogin',{},{
            withCredentials: true
        })
        const { username, _id } = res.data;
        console.log(username , res.data);
        updateAuthName(username);
        router.push('/chat')


    } catch (error) {
        router.push('/')
        console.log("Error in login function : ", error.message);
    }
}
export default JWTLogin;