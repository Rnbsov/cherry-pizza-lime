import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import wretch from 'wretch'
import qs from 'qs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination/Pagination'
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { sortTypes } from '../constants/constants'

const api = wretch(import.meta.env.VITE_backendURL)
  .errorType('json')
  .resolve((r) => r.json())

const Home = () => {
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  console.log(isMounted)

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Filter
  const { categoryId, sort, order, currentPage, searchValue } = useSelector((state) => state.filter)

  const dispatch = useDispatch()

  // Pagination
  const [totalPages, setTotalPages] = useState(0)

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page))
  }

  const fetchPizzas = async function fetchData() {
    try {
      setIsLoading(true)

      const category = categoryId > 0 ? `&category=${categoryId}` : ''
      const sortBy = sort.sortProperty
      const search = searchValue ? `&search=${searchValue}` : ''

      if (search && currentPage !== 1) {
        dispatch(setCurrentPage(1))
      }

      const [itemsResponse] = await Promise.all([
        api.get(`items?page=${currentPage}&limit=4${category}&sort=${sortBy}&order=${order}${search}`)
      ])

      // TODO: Pagination
      setTotalPages(itemsResponse.totalPages)

      setItems(itemsResponse.items)
      setIsLoading(false)
    } catch (error) {
      toast.error('Ошибка при запросе данных ;(')
      console.error(error)
    }
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))


      const sort = sortTypes.find(obj => obj.sortProperty === params.sortBy)

      dispatch(setFilters({
        ...params,
        sort
      }))
      isSearch.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
  // window.scrollTo(0, 0)

  if(!isSearch.current) {
    fetchPizzas()
  }

  isSearch.current = false
    
  }, [categoryId, sort.sortProperty, searchValue, currentPage, order])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortProperty,
        categoryId,
        currentPage
      })
  
      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage])

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)
  
  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)

  return (
    // castyil:
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>

      <Pagination onChangePage={onChangePage} value={currentPage} totalPages={totalPages} />

      <Toaster />
    </div>
  )
}

export { Home }
