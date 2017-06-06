import { connect } from 'react-redux'
import SearchBox from '../components/SearchBox'
import { applySearch } from '../actions/filter'

const mapDispatchToProps = (dispatch) => ({
  onInput: (searchterm) => {
    if(searchterm.length > 1 | !searchterm) {
      dispatch(applySearch(searchterm))
    }
  }
})

const Search = connect(undefined ,mapDispatchToProps)(SearchBox)

export default Search