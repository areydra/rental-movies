import React from 'react'
import _ from 'lodash'

const Pagination = props => {
    let { totalItems, limitPage, onPageChange, currentPage } = props
    let totalPages = Math.ceil(totalItems / limitPage)  //Math.ceil() digunakan untuk membulatkan angka ke atas. Ex : 4.1 = 5, 4 = 4, 0.9 = 1
    let pages = _.range(1, totalPages + 1) //jumlah pages = lodash.range digunakan untuk menghitung jarak. Ex : lodash.range(1, 5); // hasilnya => [1, 2, 3, 4]
    
    if(totalPages === 1) return false //jika totalPagesnya 1 atau tidak ada yg perlu dipaginate maka tidak perlu menampilkan component pagination / return false

    return ( 
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={currentPage === page ? "page-item active" : "page-item"} /* jika currentPage sama dengan dengan page maka tambahkan class active */>
                        <a className="page-link" onClick={() => onPageChange(page)} style={{cursor: 'pointer'}}>{page}</a>
                    </li>
                ))}
            </ul>
        </nav>
     );
}
 
export default Pagination