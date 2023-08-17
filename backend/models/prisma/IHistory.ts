
interface IHistory {
    id: number,
    title: string,
    userId: number,
    userEmail: string,
    fileId?: number,
    fileTitle?: string,
    description?: string,
    createAt: any
}

export default IHistory;