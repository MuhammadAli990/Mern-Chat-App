import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.middleware.js";
import { getChatById, getUsers, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.get('/users',protectRoute,getUsers);

router.get('/:id',protectRoute,getChatById);

router.post('/send/:id',protectRoute,sendMessage)


export default router;