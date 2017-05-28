import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions/filter'
import BottomMenuItem from '../components/BottomMenuItem'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomMenuItem)

export default FilterLink
