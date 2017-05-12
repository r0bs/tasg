import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ tasks }) => (
  <ul>
    {tasks.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
      />
    )}
  </ul>
)

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default TodoList
