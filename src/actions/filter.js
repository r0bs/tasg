export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"
export const APPLY_SEARCH = "APPLY_SEARCH"

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export function applySearch(searchterm) {
  return {
      type: APPLY_SEARCH,
      searchterm
  }
}