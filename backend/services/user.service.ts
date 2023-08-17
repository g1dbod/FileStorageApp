import prisma from "../prisma/db";
import historyService from "./history.service";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import { ICreateUser, ILoginUser, ISetRole } from "../models/user.model";
import dotenv from 'dotenv'
dotenv.config()

class userService {


    async createUser(newUser: ICreateUser) {
        try {
            if (!(newUser.adminId && newUser.adminEmail)) {
                newUser.adminId = 1,
                    newUser.adminEmail = 'Боженька'
            }
            let nuser = await prisma.user.findFirst({
                where: {
                    email: newUser.email
                }
            })
            if (nuser) {
                return { message: `Пользователь ${newUser.email} уже существует` }
            }
            nuser = await prisma.user.create({
                data: {
                    email: newUser.email,
                    password: bcrypt.hashSync(newUser.password, 3),
                    fio: newUser.fio,
                    phone: newUser.phone,
                    role: newUser.role,
                    maxSpace: newUser.maxSpace
                },
            })
            const nhistoryuser = await historyService.createHistory({
                title: historyService.titleHistory.newUser,
                userId: newUser.adminId,
                userEmail: newUser.adminEmail,
                description: newUser.email
            })
            
            await prisma.$disconnect()
            return {
                message: `Пользователь ${newUser.email} был успешно создан`,
                user: nuser,
                history: nhistoryuser

            }
        } catch (e) {
            console.log(e)
            return { message: "Ошибка в создании нового пользователя" }
        }
    }

    async loginUser(logUser: ILoginUser) {
        try {
            const luser = await prisma.user.findFirst({
                where: { email: logUser.email }
            })
            if (!luser) {
                return { message: `Пользователя ${logUser.email} не существует` }
            }
            const isPassValid = bcrypt.compareSync(logUser.password, luser.password)
            if (!isPassValid) {
                return { message: "Неверный пароль" }
            }
            const token = jwt.sign({ id: luser.id }, String(process.env.SECRET_KEY), { expiresIn: "12h" })
            const lhistory = await historyService.createHistory({
                title: historyService.titleHistory.loginUser,
                userId: luser.id,
                userEmail: luser.email,
            })
            await prisma.$disconnect()
            return {
                message: `Пользователь ${luser.email} успешно авторизирован`,
                token,
                user: luser,
                history: lhistory
            }
        } catch (e) {
            console.log(e)
            return { message: "Ошибка в авторизации пользователя" }
        }
    }

    async authUser(aid: number) {
        try {
            const auser = await prisma.user.findFirst({
                where: { id: aid }
            })

            if (!auser) {
                return {message: 'Пользователя не существует'}
            }
            const token = jwt.sign({ id: auser.id }, String(process.env.SECRET_KEY), { expiresIn: "12h" })
            return {
                message: 'Токен обновлен',
                token,
                user: auser
            }
        } catch (e) {
            console.log(e)
            return {message: 'Ошибка обновления токена'}
        }
    }

    async setRoleUser(srole: ISetRole) {
        try {
            const auser = await prisma.user.update({
                where: {id: srole.userId},
                data: {
                    role: srole.role
                }
            })
            if (!auser) {
                return {message: 'Пользователь не найден'}
            }
            const ahistory = await prisma.history.create({
                data: {
                    title: historyService.titleHistory.updateRoleUser,
                    userId: srole.adminId,
                    userEmail: srole.adminEmail,
                    description: `${auser.email} ${srole.role}`
                }
            })
            return {
                message: `Роль пользователя обновленна ${srole.role} `,
                user: auser,
                history: ahistory
            }

        } catch (e) {
            return {message: 'Ошибка обновления роли'}
        }
    }
}

export default new userService();