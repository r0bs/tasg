import React from 'react'
import PropTypes from 'prop-types'

const DropableDiv = ({ children, onDrop }) => {

  return (
    <div
        onDragOver={ e => { 
            e.preventDefault()
            e.dataTransfer.dropEffect = "move"
        }}
        onDrop={ e => {
                e.preventDefault()
                onDrop(e)
            }
        }
    >
      {children}
    </div>
  )
}

DropableDiv.propTypes = {
  children: PropTypes.node.isRequired,
  onDrop: PropTypes.func.isRequired
}

export default DropableDiv
