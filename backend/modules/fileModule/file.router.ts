import { Request, Response, Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import FileController from "./file.controller";

const fileRouter = Router()
const fileController = new FileController()

fileRouter.post('/createDir', authMiddleware, fileController.createDir)
fileRouter.delete('/deleteFile', authMiddleware, fileController.deleteFile)
fileRouter.get('/getFiles', authMiddleware, fileController.getFiles)
fileRouter.post('/uploadFile', authMiddleware, fileController.uploadFile)
fileRouter.post('/downloadFile', authMiddleware, fileController.downloadFile)

export default fileRouter