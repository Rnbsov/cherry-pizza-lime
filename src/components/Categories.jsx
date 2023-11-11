import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'

function Categories() {
  const categoryId = useSelector((state) => state.filter.categoryId)
  const dispatch  = useDispatch()
  
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => (
          <li onClick={() => dispatch(setCategoryId(index))} className={categoryId === index ? 'active' : ''} key={index}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Categories }
