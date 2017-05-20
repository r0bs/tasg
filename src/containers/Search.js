import { connect } from 'react-redux'
import SearchBox from '../components/SearchBox'
import { applySearch } from '../actions/filter'

const mapDispatchToProps = (dispatch) => ({
  onInput: (searchterm) => {
    dispatch(applySearch(searchterm))
  }
})

const Search = connect(undefined ,mapDispatchToProps)(SearchBox)

export default Search