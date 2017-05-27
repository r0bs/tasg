import React from 'react'
import PropTypes from 'prop-types'

const MenuToggle = (props) => {
    return (
        <button className="btn btn-default menutoggle" onClick={props.toggleMenu}>
            <span className="glyphicon glyphicon-menu-hamburger"></span>
        </button>
    )
}

MenuToggle.PorpTypes = {
    toggleMenu: PropTypes.func.isRequired
}

export default MenuToggle