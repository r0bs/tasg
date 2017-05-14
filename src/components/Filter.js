import React from 'react'
import FilterLink from '../containers/FilterLink'

const Filter = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Todo
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      Done
    </FilterLink>
  </p>
)

export default Filter
