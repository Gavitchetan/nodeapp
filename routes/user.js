import Express from "express";
import { Profile, login, Newuser } from "../controllers/Usertoute.js";
import { authentication } from "../middlewares/auth.js";


const router = Express.Router();


router.post('/new', Newuser)
router.post('/login', login)
router.get('/me', authentication, Profile)


export default router