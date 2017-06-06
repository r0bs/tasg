import React from 'react'
import PropTypes from 'prop-types'

const SearchBox = ({ onInput }) => {
  return (
    <div className="searchbox">
      <form>
        <input
          className="form-control searchinput"
          placeholder="Instant Search"
          type="text" onChange={e => {
            e.preventDefault()
            onInput(e.target.value)
          }} />
      </form>
    </div>
  )
}

SearchBox.propTypes = {
  onInput: PropTypes.func.isRequired
}

export default SearchBox