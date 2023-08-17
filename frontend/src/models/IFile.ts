interface IFile {
    id: number,
    title: string,
    format: string,
    path: string,
    size: number,
    userId: number,
    parentId?: number,
    childsId: number[],
    createAt?: any,
    updateAt?: any,
}

export default IFile;