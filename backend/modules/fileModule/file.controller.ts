import { Request, Response } from "express"
import { ICreateFile } from "../../models/file.model"
import prisma from "../../prisma/db"
import fileService from "../../services/file.service"

export default class FileController {


    async createDir(req: Request, res: Response) {
        const ReqFile: ICreateFile = req.body
        const userId = req.body.user.id
        const newFile = await fileService.createFile({
            title: ReqFile.title,
            format: 'dir',
            userId: userId,
            parentId: ReqFile.parentId,
            size: 0
        })
        return res.json(newFile)
    }

    async deleteFile(req: Request, res: Response) {
        const fileId = req.query.fileId
        const userId = req.body.user.id
        const dfile = await fileService.deleteFile(Number(fileId), userId)
        return res.json(dfile)
    }

    async getFiles (req: Request, res: Response) {
        const dfile = await fileService.getFiles({
            fileId: String(req.query.parentId),
            userId: req.body.user.id,
            sort: String(req.query.sort)
        })

        return res.json(dfile)
    }

    async uploadFile(req: Request, res: Response) {
        
    }

    async downloadFile(req: Request, res: Response) {
        
    }


}