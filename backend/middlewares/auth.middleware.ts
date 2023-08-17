import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Нет токена' })
        }
        const decoded = jwt.verify(token, String(process.env.SECRET_KEY))
        req.body.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Ошибка в проверке токена' });
    }
}
export default authMiddleware;