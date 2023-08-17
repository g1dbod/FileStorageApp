import React, { useEffect } from 'react'
import useDiskStore from '../DiskStore'
import './FileList.scss'

import FileB from './File/FileB'
import useFileStore from '../../../store/FileStore'

const FileList = () => {
  const files = useFileStore(state => state.files)
  const getFiles = useFileStore(state => state.getFiles)
  const openContext = useDiskStore(state => state.openContext)
  const closeContext = useDiskStore(state => state.closeContext)

  useEffect(() => {
    const handleClick = () => closeContext();
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    getFiles({parentId:undefined, sort:'format'})
  }, [])

  return (
    <div className='FileList'>
      {files.map((item, i) => {
        return (
          <div className='block' key={i}
            onContextMenu={(e) => {
              e.preventDefault(); // prevent the default behaviour when right clicked
              openContext(e.pageX, e.pageY, item)
            }}
            >
            <FileB file={item} />
          </div>)
      })}
    </div>
  )
}

export default FileList