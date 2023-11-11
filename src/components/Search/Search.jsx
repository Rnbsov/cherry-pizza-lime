import { useCallback, useRef, useState } from 'react'
import { X, Search as MagnifyingGlass } from 'lucide-react'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search = () => {
  const dispatch = useDispatch()

  const inputRef = useRef()

  const [value, setValue] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 300),
    []
  )

  const onClickClear = () => {
    setValue('')
    dispatch(setSearchValue(''))
    inputRef.current.focus()
  }

  const onChangeInput = (event) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <MagnifyingGlass className={styles.icon} />

      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type='text'
        placeholder='Поиск пиццы...'
      />
      {value && <X onClick={() => onClickClear()} className={styles.clearIcon} size={18} />}
    </div>
  )
}
export default Search
