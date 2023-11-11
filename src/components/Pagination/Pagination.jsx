import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

// TODO: castyil
const Pagination = ({onChangePage, totalPages, value}) => {
  
  return (
    <div>
      <ReactPaginate
        className={styles.pages}
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
        onPageChange={(e) => {onChangePage(e.selected + 1)}}
        pageRangeDisplayed={8}
        forcePage={value - 1}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
export default Pagination
