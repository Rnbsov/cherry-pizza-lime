import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating'
  },
  searchValue: '',
  order: 'desc'
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setSearchValue(state, action) {
      state.search = action.payload
    },
    setSortOrder(state, action) {
      state.order = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.sort = action.payload.sort
      state.currentPage = +action.payload.currentPage
      state.categoryId = +action.payload.categoryId
    }
  }
})

export const { setCategoryId, setSort, setSortOrder, setCurrentPage, setSearchValue, setFilters } = filterSlice.actions

export default filterSlice.reducer
