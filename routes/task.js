import Express from "express";
import { authentication } from "../middlewares/auth.js";
import { Deltetask, NewTask, getMyTasks, Update } from "../controllers/taskroutes.js";


const router = Express.Router();


router.post('/newt', authentication, NewTask)
router.get('/Mt', authentication, getMyTasks)
router.route('/:id').delete(authentication, Deltetask).put(authentication, Update)


export default router