import React from 'react'
import useDiskStore from '../DiskStore'
import './MenuContext.scss';

const MenuContext = () => {
    const pageX = useDiskStore(state => state.pageX)
    const pageY = useDiskStore(state => state.pageY)
    const setInfo = useDiskStore(state => state.setInfo)

    return (
        <ul className='MenuContext' style={{ top: pageY, left: pageX }}>

            <li onClick={() => {
                setInfo(true)
            }}>Info</li>
            <li>Delete</li>

        </ul>
    )
}

export default MenuContext