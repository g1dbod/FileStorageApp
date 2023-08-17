import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import prisma from "../prisma/db";

export const roleAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const auser = await prisma.user.findFirst({
            where: { id: req.body.user.id }
        })
        if (auser) {
            if (['GOD', 'ADMIN'].includes(auser.role)) {
                req.body.adminId = auser.id;
                req.body.adminEmail = auser.email
                next();
                return ;
            }
            return res.status(401).json({message: 'Недостаточно прав доступа'})
        } else {
            return res.status(401).json({message: 'Пользователя не существует'})
        }
        
    } catch (e) {
        return res.status(401).json({ message: 'Ошибка в проверке роли' });
    }
}

export const roleGodMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const auser = await prisma.user.findFirst({
            where: { id: req.body.user.id }
        })
        if (auser) {
            if (['GOD'].includes(auser.role)) {
                req.body.adminId = auser.id;
                req.body.adminEmail = auser.email
                next();
                return ;
            }
            return res.status(401).json({message: 'Недостаточно прав доступа'})
        } else {
            return res.status(401).json({message: 'Пользователя не существует'})
        }
        
    } catch (e) {
        return res.status(401).json({ message: 'Ошибка в проверке роли' });
    }
}