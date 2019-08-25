//Stateful component
import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService'  //import function getMovies yg berada di fakeMovieService
import Like from './common/like'
import Pagination from './common/pagination'
import paginate from '../utils/paginate' //import function paginate 

class Movies extends Component {
    state = {
        movies: getMovies(), //menjadikan getMovies() kedalam state bernama movies
        limitPage : 3,
        currentPage : 0
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id) //buat array movies baru yg sudah di filter dari state.movies dan kembalikan data state.movie yg tidak sama dengan movie._id
        this.setState({ movies }) //ubah state movies dengan array movies baru = movies : movies(array baru). jika key dan value sama tinggal pass movies
    }

    handleLiked = movie => {
        const movies = [...this.state.movies] //duplicate isi state movies menjadi array dengan spread operator
        const index = movies.indexOf(movie) //mengambil index movie dari data movies
        movies[index] = { ...movies[index] } //movies dengan index = di spread operator (dipecah kembali untuk mengambil satu data/index)
        movies[index].liked = !movies[index].liked //mengubah data liked movie yg sesuai index. disini data liked true / false. artinya jika data liked true maka akan diubah menjadi false
        this.setState({movies}) //mengubah data state movies dengan data terbaru
    }

    handlePageChange = page => {
        this.setState({ currentPage: page }) //mengubah value page terakhir sesuai dengan page. liat di component Pagination
    }

    render() {
        const { length : count } = this.state.movies //menghitung length state.movies dengan nama variabel count
        const { limitPage, currentPage, movies: allMovies } = this.state //mengambil state limitPage dan currentPage = dari state
        //mengubah variabel movies menjadi allMovies

        const movies = paginate(allMovies, currentPage, limitPage) //membuat data movies hasil return function paginate di file './utils/paginate.js

        if (count === 0)
            return <p className="p3">There are no movies in database</p>

        return (
            <React.Fragment>
                <p style={{ fontWeight: 500 }}>Movies {count}</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Number in stock</th>
                            <th>Daily rental rate</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(movie => ( //untuk me-looping tag html gunakan buka kurung(), jika menggunakan kurung kurawa{} tidak akan berfungsi/error
                            <tr key={movie._id} /* untuk looping data meggunakan map harus diberi key sebagai pembeda antara data pertama loop dan seterusnya */>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Like liked={movie.liked} onClick={() => this.handleLiked(movie)} /* memberikan value props liked sesuai dengan data yg ada di db movies */ /></td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(movie)} /* jika memanggil function yg mengubah nilai state wajib menggunakan arrow function */ >Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination totalItems={count} limitPage={limitPage} onPageChange={this.handlePageChange} currentPage={currentPage} />
            </React.Fragment>
        );
    }
}

export default Movies;

//NOTE : jika menambahkan event seperti onClick didalam component. maka itu akan masuk kedalam props. dan untuk mengakses event tersebut harus didefiniskan didalam component tersebut. contoh :
//<Like liked={movie.liked} onClick={() => this.handleLiked(movie)} > harus menambahkan event didalam component like. cek file like.jsx