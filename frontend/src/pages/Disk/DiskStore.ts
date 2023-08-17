import { create } from "zustand";
import {devtools, persist} from "zustand/middleware"
import IFile from "../../models/IFile";


interface DiskState {
    focusFile?: IFile,
    showModal: boolean,
    setModal: (show: boolean) => void,

    showContext: boolean,
    openContext: (x:number, y:number, file: IFile) => void,
    closeContext: () => void,
    pageX: number,
    pageY: number,

    showInfo: boolean,
    setInfo: (show: boolean) => void,

}

const useDiskStore = create<DiskState>()(devtools((set => ({
    focusFile: undefined,

    showModal: false,
    setModal: (show: boolean) => set(state => {return {showModal: show}}),

    showContext: false,
    openContext: (x:number, y:number, file:IFile) => set(state => {return {showContext: true, pageX: x, pageY: y, focusFile:file}}),
    closeContext: () => set(state => {return {showContext: false}}),
    pageX: 0,
    pageY: 0,

    showInfo: false,
    setInfo: (show: boolean) => set(state => {return {showInfo: show}})

}))))

export default useDiskStore;