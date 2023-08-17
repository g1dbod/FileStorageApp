import React from 'react'
import useDiskStore from '../DiskStore'
import './InfoModal.scss'

const InfoModal = () => {
    const setInfo = useDiskStore(state => state.setInfo)
    const focusFile = useDiskStore(state => state.focusFile)

  return (
    <div className='InfoModal' onClick={() => {setInfo(false)}}>
        <div className="MainBlock" onClick={(event => event.stopPropagation())}>
            <div className="title">{focusFile?.title}</div>
            <div className="title">{focusFile?.format}</div>
            <div className="title">{focusFile?.path}</div>
            <div className="title">{focusFile?.size}</div>

        </div>
    </div>
  )
}

export default InfoModal