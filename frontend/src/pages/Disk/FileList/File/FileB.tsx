import React from 'react'
import './File.scss'
import folder from '../../../../assets/folder2.svg'
import filef from '../../../../assets/file2.svg'
import IFile from '../../../../models/IFile'
import useFileStore from '../../../../store/FileStore'

interface FileProps {
  file: IFile,
}



const FileB = ({file}: FileProps) => {
  const getFiles = useFileStore(state => state.getFiles)
  const addActivePath = useFileStore(state => state.addActivePath)

  return (
    <div className='file' onClick={() => {
      getFiles({parentId: file.id})
      addActivePath(file.title)
      }}>
      <img src={`${file.format==='dir' ? folder : filef}`} className={`${file.format==='dir' ? 'folder' : 'filef'}`} alt='icon'/>
      <label className='title'>{file.title}</label>
    </div>
  )
}

export default FileB