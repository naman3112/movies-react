import React, { Component } from 'react'
import { getMovies } from './getMovies'
export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            movies: getMovies(),
            currSearchText: '',
            sortBasis:''
        }
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
    handleClickInc=(e)=>{
       //console.log('i am pressed')
       this.setState({sortBasis: 'inc'})
        
    }
    handleClickDec=(e)=>{
        //console.log('i am pressed')
        this.setState({sortBasis: 'dec'})
        //console.log(e.target.value)     
     }
 
    render() {
        console.log('render')
        let { movies, currSearchText } = this.state;
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

        if(this.state.sortBasis!=''){
            if(this.state.sortBasis=='inc'){
                console.log('here i am ')
              filteredArr.sort(function(obj1,obj2){

                  let rate1=obj1.dailyRentalRate;
                  let rate2=obj2.dailyRentalRate;
                  console.log("rate-1", rate1);
                  console.log("rate-2",rate2)
                  return rate1-rate2;
              }) 
              console.log("filtered Array is ",filteredArr)     
            }else{

                filteredArr.sort(function(obj1,obj2){
                    let rate1=obj1.dailyRentalRate;
                    let rate2=obj2.dailyRentalRate;
                       return rate2-rate1;
                })
            }

        }


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
                                        <button
                                        onClick={this.handleClickInc}
                                        value={'inc'}
                                        >
                                            <i class="fa fa-arrow-up" aria-hidden="true"></i>
                                        </button>

                                        <button
                                         onClick={this.handleClickDec}
                                         value={'dec'}
                                        >
                                            <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                        </button>

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
                    </div>
                </div>
            </div>

        )
    }
}
