import _ from 'lodash'

const paginate = (items, currentPage, limitPage) => {
    const index = (currentPage - 1) * limitPage
    return _(items).slice(index).take(limitPage).value() 
    //_(items) masukan items kedalam lodash
    //.slice(index) mulai data dari index, bisa juga dengan cara .slice(items, index)
    //.take(limitPage) ambil data sesuai limit, 
    //.value() convert dari lodash obj menjadi reguler array
} 

export default paginate