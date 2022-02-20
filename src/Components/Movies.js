import React, { Component } from 'react'
import { getMovies } from './getMovies'
export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            movies: getMovies(),
            currSearchText: ''
        }
    }
    handleChange=(e)=>{
        let val=e.target.value;
        console.log(val);
    this.setState({
        currSearchText: val
    })
    }
    deleteHandler = (id) => {

        let newMovies = this.state.movies.filter((movie) => {
            return movie._id != id
        })
        this.setState({ movies: newMovies });

    }


    render() {
        console.log('render')
        let {movies,currSearchText}=this.state;
        let filteredArr=[];
        if(currSearchText==''){
            filteredArr=movies;
        }else{
            filteredArr=movies.filter(function(movieObj){
                let title=movieObj.title.toLowerCase();
                console.log(title);
                return title.includes(currSearchText.toLowerCase());
            })
        }

     
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-3'>
                        hello-col-3
                    </div>
                    <div className='col-9'>
                        <input type='search' value={this.state.currSearchText} onChange={this.handleChange}></input>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Rate</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredArr.map((movieObj) => {
                                        return (
                                            <tr scope='row' key={movieObj._id}>
                                                <td></td>
                                                <td> {movieObj.title} </td>
                                                <td> {movieObj.genre.name} </td>
                                                <td>{movieObj.numberInStock}</td>
                                                <td>{movieObj.dailyRentalRate}</td>
                                                <td><button onClick={() => { return this.deleteHandler(movieObj._id) }} type="button" className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}
