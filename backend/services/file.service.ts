import { ICreateFile } from "../models/file.model";
import prisma from "../prisma/db";
import historyService from "./history.service";
import fs from 'fs'
import IFile from "../models/prisma/IFile";

class fileService {

    async createFile(file: ICreateFile) {
        try {
            file.parentId = file.parentId===0 ? undefined : file.parentId
            let parent = await prisma.file.findFirst({
                where: {
                    id: file.parentId,
                    userId: file.userId
                }
            })
            if (file.format === 'dir') {
                let files = await prisma.file.findMany({
                    where: {
                        parentId: file.parentId,
                        title: file.title,
                        format: file.format,
                        userId: file.userId
                    }
                })
                if (files.length != 0) {
                    return { message: "Такая папка уже существует" }
                }

            }
            let nfile = await prisma.file.create({
                data: {
                    title: file.title,
                    format: file.format,
                    userId: file.userId,
                    parentId: file.parentId,
                    path: `${parent?.path}/${file.title}`,
                    size: file.size
                }
            })

            await this.createDir(nfile)

            if (file.parentId) {
                await prisma.file.update({
                    where: {
                        id: file.parentId
                    },
                    data: {
                        childs: {
                            push: nfile.id
                        }
                    }
                })
                await this.addSize(file.parentId, file.size)
            }
            let user = await prisma.user.findFirst({
                where: {
                    id: file.userId
                }
            })
            if (user) {
                const nhistoryfile = await historyService.createHistory({
                    title: historyService.titleHistory.createFile,
                    userId: file.userId,
                    userEmail: user?.email,
                    fileId: nfile.id,
                    fileTitle: nfile.title,
                    description: file.userEmail
                })
            }


            return {
                message: 'Файл создан',
                file: nfile
            }

        } catch (e) {
            console.log(e)
            return {
                message: 'Ошибка создания',
                error: e
            }
        }
    }

    createDir(file: { userId: number, path?: string }) {
        let filePath = `${process.env.FILE_PATH}/${String(file.userId)}/`
        if (file.path) {
            filePath = `${process.env.FILE_PATH}/${String(file.userId)}/${file.path}`
        }

        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({ message: 'Папка создана' })
                } else {
                    return reject({ message: "Такая папка уже существует" })
                }
            } catch (e) {
                console.log(e)
                return reject({ message: 'Ошибка при создании папки' })
            }
        }))
    }


    async addSize(parentId: number, size: number) {
        try {
            let parent = await prisma.file.findFirst({
                where: { id: parentId },
            })
            if (parent) {
                let newparent = await prisma.file.update({
                    where: { id: parentId },
                    data: {
                        size: parent.size + size
                    }
                })
                if (newparent.parentId) {
                    await this.addSize(newparent.parentId, size)
                }
            }
        } catch (e) {
            console.log(e)
        }

    }

    async clearFolder(childs: number[], userId: number) {
        childs.forEach(async childId => {
            let file = await prisma.file.findFirst({
                where: {
                    id: childId,
                    userId: userId
                }
            })
            if (file) {
                if (file.childs.length != 0) {
                    this.clearFolder(file.childs, userId)
                }
                // await this.deleteFileSystem(file)
                await prisma.file.delete({
                    where: {
                        id: childId
                    }
                })
            }

        })
    }

    async deleteFile(fileId: number, userId: number) {
        try {
            let file = await prisma.file.findFirst({
                where: {
                    id: fileId,
                    userId: userId
                }
            })

            let user = await prisma.user.findFirst({
                where: {
                    id: userId
                }
            })
            if (file && user) {
                await this.clearFolder(file.childs, userId)
                await this.deleteFileSystem(file)
                await prisma.file.delete({
                    where: {
                        id: fileId
                    }
                })
                const dhistory = historyService.createHistory({
                    title: historyService.titleHistory.deleteFile,
                    userId: file.userId,
                    userEmail: user.email,
                    fileId: fileId,
                    fileTitle: file.title,
                    description: user.email
                })
                return {
                    message: 'Файл успешно удален',
                    history: dhistory
                }
            }
            return {
                message: 'Файл не найден'
            }
        } catch (e) {
            console.log(e)
            return {
                message: 'Ошибка удаления',
                error: e
            }
        }
    }

    deleteFileSystem(file: IFile) {
        const path = this.getPath(file)
        fs.rm(path, { recursive: true }, (err) => {
            if (err) {
                console.log(err)
            }
        })
        // if (file.format === 'dir') {
        //     fs.rmSync(path)
        // } else {
        //     fs.unlinkSync(path)
        // }
    }

    getPath(file: IFile) {
        return `${process.env.FILE_PATH}/${String(file.userId)}${file.path}`
    }

    async getFiles(param: { fileId?: string | null | number, userId: number, sort?: string }) {
        try {
            let files
            let parentFile
            if (param.fileId === "undefined") {
                param.fileId = null
                parentFile = null
            }
            else {
                param.fileId = Number(param.fileId)
                parentFile = await prisma.file.findFirst({
                    where: {
                        userId: param.userId,
                        id: param.fileId
                    }
                })
            }

            switch (param.sort) {
                case 'title':
                    files = await prisma.file.findMany({
                        where: {
                            userId: param.userId,
                            parentId: param.fileId
                        },
                        orderBy: {
                            title: 'asc'
                        }
                    })
                    break
                case 'format':
                    files = await prisma.file.findMany({
                        where: {
                            userId: param.userId,
                            parentId: param.fileId
                        },
                        orderBy: {
                            format: 'asc'
                        }
                    })
                    break
                case 'date':
                    files = await prisma.file.findMany({
                        where: {
                            userId: param.userId,
                            parentId: param.fileId
                        },
                        orderBy: {
                            updatedAt: 'asc'
                        }
                    })
                    break
                default:
                    files = await prisma.file.findMany({
                        where: {
                            userId: param.userId,
                            parentId: param.fileId
                        }
                    })

                    break;
            }

            await prisma.$disconnect

            return {
                message: 'Ваши файлы',
                parentFile: parentFile,
                files: files
            }
        }
        catch (e) {
            console.log(e)
            await prisma.$disconnect
            return { message: 'Ошибка запроса файлов' }
        }
    }


}

export default new fileService();