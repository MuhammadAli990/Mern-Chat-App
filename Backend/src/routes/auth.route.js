import { Router } from 'express'
import { checkAuth, signin, signout, signup, updateProfilePic } from '../controllers/auth.controller.js';
import protectRoute from '../middlewares/protectRoute.middleware.js';

const router = Router();

router.post('/signup',signup)

router.post('/signin',signin)

router.post('/signout',signout)

router.put('/update-profile-pic',protectRoute,updateProfilePic)

router.get('/check',protectRoute,checkAuth)

export default router;