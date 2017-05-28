import React from 'react'
import PropTypes from 'prop-types'

const BottomMenuItem = ({ active, children, onClick }) => {


  return (
    <div className={
      active ? "bottom-menu-item" : "bottom-menu-item active"
    }
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
      >
      {children}
    </div>
  )
}

BottomMenuItem.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default BottomMenuItem
