import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, status, title, syncInProgress }) => (
  <li
    style={{
      textDecoration: status !== "needsAction" ? 'line-through' : 'none',
      backgroundColor: syncInProgress ? "lightblue" : "transparent"
    }}
  >
    {title}
  </li>
)

Todo.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Todo
