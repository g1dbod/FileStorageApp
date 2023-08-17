export interface ICreateFile {

   title: string,
   format: string,
   userId: number,
   userEmail?: string,
   parentId?: number,
   path?: string,
   size: number
}