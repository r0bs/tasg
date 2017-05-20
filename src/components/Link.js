import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, children, onClick }) => {
  if (active) {
    return (
      <span className="label label-primary filter-active">
        {children}
      </span>
    )
  }

  return (
    <span className="label label-default filter"
      href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
      >
      {children}
    </span>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link
