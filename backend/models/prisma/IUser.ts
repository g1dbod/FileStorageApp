import IFile from "./IFile";
import IHistory from "./IHistory";

interface IUser {
    id: number,
    email: string,
    fio: string,
    role: string,
    phone?: number,
    usedSpace: number,
    maxSpace?: number,
    folderId: number,
    files: IFile[],
    createAt: any,
    updateAt: any,
    history: IHistory[]
}

export default IUser;