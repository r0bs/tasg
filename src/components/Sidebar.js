import React from 'react'

const Sidebar = (props) => {
    return(
        <div className={
            props.menuToggled ? "sidebar sidebar-mobile-visible" : "sidebar"
        }>
            {props.children}
        </div>
    )
}




export default Sidebar