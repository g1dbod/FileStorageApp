import { ICreateHistory } from "../models/history.model";
import prisma from "../prisma/db";




class historyService {

    titleHistory = {
        newUser: 'Создание пользователя',
        updateUser: 'Обновление пользователя',
        updateRoleUser: 'Обновление роли пользователя',
        loginUser: 'Авторизация пользователя',
        
        createFile: 'Создание файла',
        uploadFile: 'Загрузка файла',
        downloadFile: 'Скачивание файла',
        updateFile: 'Обновление файла',
        deleteFile: 'Удаление файла'
    }


    async createHistory(newHistory: ICreateHistory) {
        try {
            const nhistory = await prisma.history.create({
                data: {
                    title: newHistory.title,
                    userId: newHistory.userId,
                    userEmail: newHistory.userEmail,
                    fileId: newHistory.fileId,
                    fileTitle: newHistory.fileTitle,
                    description: newHistory.description,
                }
            })
            return {
                message: `История записана как (${newHistory.title})`,
                nhistory
            }
        } catch (e) {
            console.log(e)
            return { message: "Ошибка в создании истории" }
        }
    }
}

export default new historyService();