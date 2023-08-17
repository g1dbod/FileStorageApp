interface IFile {
    id: number,
    title: string,
    format: string,
    path: string,
    size: number,
    userId: number,
    parentId?: number | null,
    childs: number[],
    createdAt: any,
    updatedAt: any,
}

export default IFile;