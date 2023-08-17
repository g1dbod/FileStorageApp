import { Request, Response } from "express"
import { ICreateUser, ILoginUser } from "../../models/user.model"
import prisma from "../../prisma/db"
import userService from "../../services/user.service"
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
import fileService from "../../services/file.service"
dotenv.config()

export default class UserController {


    async registration(req: Request, res: Response) {
        const ReqReg: ICreateUser = req.body
        const newuser = await userService.createUser(ReqReg)
        if (newuser.user) {
            await fileService.createDir({
                  userId: newuser.user.id,
                }
              )
        }
        
        return res.json(newuser)
    }

    async login(req: Request, res: Response) {
        const ReqLog: ILoginUser = req.body
        const newuser = await userService.loginUser(ReqLog)
        return res.json(newuser)
    }

    async auth(req: Request, res: Response) {
        const newuser = await userService.authUser(req.body.user.id)
        return res.json(newuser)
    }

    async setRole(req: Request, res: Response) {
        const newuser = await userService.setRoleUser({
            userId: req.body.userId,
            role: req.body.role,
            adminId: req.body.adminId,
            adminEmail: req.body.adminEmail
        }
        )
        return res.json(newuser)
    }
}