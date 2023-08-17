import axios from "axios";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware"
import BACKEND_URL from "../../config";
import IFile from "../models/IFile";

interface FileState {
    activeFolder: IFile,
    activePath: String[],
    files: IFile[],
    addActivePath: (titleFolder: String) => void,
    backActivePath: () => void,
    getFiles: (filter: { parentId?: number, sort?: string }) => void,
    createDir: (filter: { parentId?: number|null, title: string |null}) => void
}

const useFileStore = create<FileState>()(devtools((set => ({
    activeFolder: {
        id: 0,
        title: '',
        format: 'dir',
        path: '',
        size: 0,
        userId: 0,
        childsId: [],
        parentId: undefined
    },
    activePath: [],
    files: [],
    addActivePath: async (titleFolder: String) => set(state => {
        return { activePath: [...state.activePath, titleFolder] }
    }),
    backActivePath: () => set(state => {
        state.getFiles({ parentId: state.activeFolder.parentId })
        let newpath = [...state.activePath];
        if (newpath.length > 0) {
            newpath.pop();
            return { activePath: newpath }
        }
        console.log(state.files)
        return { activePath: [...state.activePath] }
    }),
    getFiles: async (filter: { parentId?: number, sort?: string }) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/file/getFiles`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    parentId: filter.parentId,
                    sort: filter.sort
                }
            });
            set({
                activeFolder: await res.data.parentFile,
                files: await res.data.files,
            })
        } catch (e: any) {
            console.log(e);
            // localStorage.removeItem('token')
            // set ({

            // })
        }
    },
    createDir: async (filter: { parentId?: number|null, title: string |null}) => {
        try {
            filter.parentId = filter.parentId || 0
            const res = await axios.post(`${BACKEND_URL}/file/createDir`, {
                title: filter.title,
                parentId: filter.parentId
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
        } catch (e: any) {
            console.log(e);
        }
    }
}))))

export default useFileStore;