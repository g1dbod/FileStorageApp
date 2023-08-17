import IFile from "./IFile";
import IHistory from "./IHistory";

interface IUser {
    id: number,
    email: string,
    password?: string,
    fio: string,
    role: string,
    phone?: number | null,
    usedSpace: number,
    maxSpace?: number | null,
    folderId: number,
    files: IFile[],
    createAt: any,
    updateAt: any,
    history?: IHistory[]
}

export default IUser;