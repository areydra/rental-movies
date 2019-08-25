import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService'  //import function getMovies yg berada di fakeMovieService

class Movies extends Component {
    state = {
        movies: getMovies() //menjadikan getMovies() kedalam state bernama movies
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id) //buat array movies baru yg sudah di filter dari state.movies dan kembalikan data state.movie yg tidak sama dengan movie._id
        this.setState({ movies }) //ubah state movies dengan array movies baru = movies : movies(array baru). jika key dan value sama tinggal pass movies
    }

    render() {
        const { length : count } = this.state.movies //menghitung length state.movies dengan nama variabel count

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
                        {this.state.movies.map(movie => ( //untuk me-looping tag html gunakan buka kurung(), jika menggunakan kurung kurawa{} tidak akan berfungsi/error
                            <tr key={movie._id} /* untuk looping data yg sama harus diberi key sebagai pembeda antara data pertama loop dan seterusnya */>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(movie)} /* jika memanggil function yg mengubah nilai state wajib menggunakan arrow function */ >Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default Movies;