import React, { Component } from 'react'
import { getMovies } from './getMovies'
import axios from 'axios'
export default class Movies extends Component {
    constructor() {
        console.log("Costructor")
        super();
        this.state = {
            movies: [],
            currSearchText: '',
            sortBasis: '',
            currPage: 2,
            limit: 4
        }
    }

    async componentDidMount(){
        console.log("Cmponet Did mount")
        let res = await axios.get('https://backend-react-movie.herokuapp.com/movies')
        console.log(res);
        this.setState({
            movies: res.data.movies
        })
    }

    handleChange = (e) => {
        let val = e.target.value;
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
    handleClickInc = (e) => {
        //console.log('i am pressed')
        this.setState({ sortBasis: 'inc' })

    }
    handleClickDec = (e) => {
        //console.log('i am pressed')
        this.setState({ sortBasis: 'dec' })
        //console.log(e.target.value)     
    }

    // class funtion of increment and decrement
    sortByRatings = (e) => {
        let className = e.target.className;
        console.log(className);
        let sortedMovies = [];

        if (className == 'fa fa-arrow-up') {
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate
            })
        } else {
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate
            })
        }
        this.setState(
            {
                movies: sortedMovies
            }
        )
    }

    handlePagechange=(pageNumber)=>{
        this.setState({
            currPage:pageNumber
        })
    }

    render() {
        console.log('render')
        let { movies, currSearchText, currPage, limit } = this.state;
        let filteredArr = [];
        if (currSearchText == '') {
            filteredArr = movies;
        } else {
            filteredArr = movies.filter(function (movieObj) {
                let title = movieObj.title.toLowerCase();
                console.log(title);
                return title.includes(currSearchText.toLowerCase());
            })
        }

        if (this.state.sortBasis != '') {
            if (this.state.sortBasis == 'inc') {
                console.log('here i am ')
                filteredArr.sort(function (obj1, obj2) {

                    let rate1 = obj1.dailyRentalRate;
                    let rate2 = obj2.dailyRentalRate;
                    console.log("rate-1", rate1);
                    console.log("rate-2", rate2)
                    return rate1 - rate2;
                })
                console.log("filtered Array is ", filteredArr)
            } else {

                filteredArr.sort(function (obj1, obj2) {
                    let rate1 = obj1.dailyRentalRate;
                    let rate2 = obj2.dailyRentalRate;
                    return rate2 - rate1;
                })
            }

        }
        let numberofPage= Math.ceil(filteredArr.length/limit);
        let pageNumerArr=[];
        
        for(let i=0;i<numberofPage;i++){
            pageNumerArr.push(i+1);
        }

        let si = (currPage - 1) * limit;
        let ei = si + limit;
        filteredArr = filteredArr.slice(si, ei);
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-3'>
                    </div>
                    <div className='col-9'>
                        <input type='search' value={this.state.currSearchText} onChange={this.handleChange}></input>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title
                                    </th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Rate
                                        <i
                                            onClick={this.sortByRatings}
                                            className="fa fa-arrow-up" aria-hidden="true"></i>
                                        <i
                                            onClick={this.sortByRatings}
                                            className="fa fa-arrow-down" aria-hidden="true"></i>


                                    </th>
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
                        <nav aria-label="...">
                            <ul className="pagination">
                             {
                              pageNumerArr.map((pageNumber)=>{
                                  let classStyle=pageNumber==currPage?'page-item active':'page-item'
                                    return (
                                        <li key={pageNumber} onClick={()=>this.handlePagechange(pageNumber)} className={classStyle}><a className="page-link" href="#">{pageNumber}</a></li>
                                    )
                                })
                                      
                             }
                                
                            </ul>
                        </nav>


                    </div>
                </div>
            </div>

        )
    }
}
{/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item active" aria-current="page">
                                    <a className="page-link" href="#">2</a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li> */}