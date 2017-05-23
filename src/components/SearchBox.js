import React from 'react'
import PropTypes from 'prop-types'

const SearchBox = ({ onInput }) => {
  return (
    <div>
      <h4><span className="glyphicon glyphicon-search"></span>  Search</h4>
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