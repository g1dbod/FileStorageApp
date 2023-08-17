import React, { useState } from 'react'
import useFileStore from '../../../store/FileStore'
import useDiskStore from '../DiskStore'
import './NewFolderModal.scss'

const NewFolderModal = () => {
    const setModal = useDiskStore(state => state.setModal)
    const createDir = useFileStore(state => state.createDir)
    const activeFolder = useFileStore(state => state.activeFolder)
    const getFiles = useFileStore(state => state.getFiles)
    const [title, setTitle] = useState('')

  return (
    <div className='NewFolderModal' onClick={() => {setModal(false)}}>
        <div className="MainBlock" onClick={(event => event.stopPropagation())}>
            <div className="title">Create new folder</div>
            <input type="text" placeholder='Введите имя папки' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <button onClick={async () => {
                await createDir({title:title, parentId:activeFolder?.id})
                await getFiles({parentId:activeFolder?.id})
                setModal(false)
            }}>Create</button>
        </div>
    </div>
  )
}

export default NewFolderModal