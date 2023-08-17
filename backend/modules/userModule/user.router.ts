import { Request, Response, Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import {roleAdminMiddleware, roleGodMiddleware} from "../../middlewares/role.middleware";
import UserController from "./user.controller";


const userRouter = Router()
const userController = new UserController()

userRouter.post('/registration', authMiddleware, roleAdminMiddleware, userController.registration)
userRouter.post('/login', userController.login)
userRouter.get('/auth', authMiddleware, userController.auth)
userRouter.post('/setRole', authMiddleware, roleGodMiddleware, userController.setRole)

export default userRouter