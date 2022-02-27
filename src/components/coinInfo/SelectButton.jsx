import React from 'react'
import './coinInfo.css'

const SelectButton = ({children,selected, onClick}) => {
    return (
        <span onClick={onClick} className={selected ? `selectedButton` : 'selectButton'}>
            {children}
        </span>
    )
}

export default SelectButton
