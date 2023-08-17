import React from 'react'
import { Navigate } from 'react-router-dom'
import useFileStore from '../../store/FileStore'
import useUserStore from '../../store/UserStore'
import './Disk.scss'
import useDiskStore from './DiskStore'
import FileList from './FileList/FileList'
import InfoModal from './InfoModal/InfoModal'
import MenuContext from './MenuContext/MenuContext'
import NewFolderModal from './NewFolderModal/NewFolderModal'

const Disk = () => {

  const activePath = useFileStore(state => state.activePath)
  const backActivePath = useFileStore(state => state.backActivePath)
  const showModal = useDiskStore(state => state.showModal)
  const setModal = useDiskStore(state => state.setModal)
  const showContext = useDiskStore(state => state.showContext)
  const showInfo = useDiskStore(state => state.showInfo)
  
  const isAuth = useUserStore(state => state.isAuth)
  if (!isAuth) {
    return (<Navigate to={'/login'}/>)
  }

  return (
    <div className='Disk'>
      { showModal && <NewFolderModal />}
      {showContext && <MenuContext />}
      {showInfo && <InfoModal />}

      <div className="UpPanel">
        <ul className="activePath">
          {
            activePath.map((item, i) => {
              return (<li key={i}> <span className="material-symbols-outlined">chevron_right</span> <span className='text'>{item}</span></li>)
            })
          }
        </ul>
        <div className="filters">
          <select name="dropdown" id="dropdown" className='dropdown'>
            <option value="type">Тип</option>
            <option value="name">Имя</option>
            <option value="date">Дата</option>
          </select>
        </div>
      </div>

      <div className="UpBlock">
        <div className="btn_back" onClick={() => {
          backActivePath()
        }}>
          <span className="material-symbols-outlined">reply</span>
        </div>
        <div className="right_btn">
          <button onClick={() => { setModal(true) }}><span className="material-symbols-outlined">create_new_folder</span></button>
          <label className="input-file">
            <input type="file" name="file" />
            <span className="material-symbols-outlined">upload_file</span>
          </label>

        </div>
      </div>

      <div className="fileList">
        <FileList />
      </div>

      <div className="DownPanel">down</div>
    </div>
  )
}

export default Disk