import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSort, setSortOrder } from '../redux/slices/filterSlice'
import { sortTypes } from '../constants/constants'

function Sort() {
  const [open, setOpen] = useState(false)

  const { sort, order } = useSelector((state) => state.filter)

  const dispatch = useDispatch()

  const onClickSortType = (obj) => {
    dispatch(setSort(obj))
    setOpen(false)
  }

  const onSortOrder = () => {
    dispatch(setSortOrder(order === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <div className='sort'>
      <div className='sort__label'>
        <svg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>
          {sort.name}
          {order === 'asc' ? <Arrow_upward /> : <Arrow_downward />}
        </span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {sortTypes.map((obj, index) => (
              <li
                key={index}
                onClick={() => {
                  onClickSortType(obj)
                  onSortOrder()
                }}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export { Sort }

// #region Icons
const Arrow_upward = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='12'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-arrow-up'
    >
      <path d='m5 12 7-7 7 7' />
      <path d='M12 19V5' />
    </svg>
  )
}

const Arrow_downward = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='12'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-arrow-down'
    >
      <path d='M12 5v14' />
      <path d='m19 12-7 7-7-7' />
    </svg>
  )
}
// #endregion
