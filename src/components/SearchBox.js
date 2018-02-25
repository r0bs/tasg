import React from 'react'
import PropTypes from 'prop-types'

const SearchBox = ({ onInput, displayAutoFocus }) => {

  return (
    <div className="searchbox">
    <h4><span className="glyphicon glyphicon-search"></span>  Search</h4>
      <form>
        <input
          className="form-control searchinput"
          placeholder="Instant Search"
          autoFocus={displayAutoFocus}
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