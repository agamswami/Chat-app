import express from "express"
import signup , {login}from "../controllers/auth.controllers.js";
import logoutUser from "../controllers/logout.controller.js";

const router = express.Router();


router.post('/' , logoutUser);




export default router;