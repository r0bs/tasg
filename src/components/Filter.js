import React from 'react'
import FilterLink from '../containers/FilterLink'

const Filter = () => (
  <div>
    <h4><span className="glyphicon glyphicon-filter"></span>  Filter</h4>
    <p>
      {" "}
      <FilterLink filter="SHOW_ALL">
        All
    </FilterLink>
      {" "}
      <FilterLink filter="SHOW_ACTIVE">
        Todo
    </FilterLink>
      {" "}
      <FilterLink filter="SHOW_COMPLETED">
        Done
    </FilterLink>
    </p>
  </div>
)

export default Filter
