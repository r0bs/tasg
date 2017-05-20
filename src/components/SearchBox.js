import React from 'react'
import { PropTypes } from 'prop-types'

const SearchBox = ({onInput}) => {
  return (
    <form>
      <input type="text" onChange={e => {
          e.preventDefault()
          onInput(e.target.value)
        }}/>
    </form>
  )}

SearchBox.propTypes = {
  onInput: PropTypes.func.isRequired
}

export default SearchBox