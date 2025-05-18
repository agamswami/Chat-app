import express from "express"

import verifyToken from "../middleware/verifyToken.js";
import { loginUsingJWT } from "../controllers/loginUsingJWT.js";

const router = express.Router();


router.post('/' ,verifyToken,loginUsingJWT);



export default router;