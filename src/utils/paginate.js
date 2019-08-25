import _ from 'lodash'

const paginate = (items, currentPage, limitPage) => {
    const index = (currentPage - 1) * limitPage
    return _(items).slice(index).take(limitPage).value()
} 

export default paginate