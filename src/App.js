import React , {Component} from 'react';
import './App.css';
import Movie from './Movie';

const MOVIE_LIST_URI = 'https://yts.lt/api/v2/list_movies.json?quality=3D?sort_by=';
class App extends Component {

  constructor(props){
    super(props);

    this.state ={
      movies : [],
      isLoading: true,
    }
  }
  componentDidMount(){
    this.getAPIMovies();
  }

  _setMovies =async()=>{
    const movies = await this._callAPIMovies();
    this.setState({
      movies:movies,
      isLoading:false,
    })
  }

  getAPIMovies =()=>{
    fetch(`${MOVIE_LIST_URI}rating`)
    .then(res => res.json())
    .then(res =>{
      console.log(res);
      let movies = res.data.movies;

      if( movies != null){
        console.log('data receive successfully')
        this.setState({
          movies : movies,
          isLoading: false,
        })
      }else{
        console.log('Movies has not data');
      }
      
    })
    .catch(err =>{
      console.log(err);
    })
  }
  _renderItems =()=>{
    const movies =  this.state.movies.map(movie=>{
      return( 
        <Movie
          movie ={movie}
          key = {movie.id}
        />
     )
    })
    return movies;  
    
  }
  render(){
    return (
      <div className="App">
        {this.state.isLoading?
        <div>Now loading</div>
        :
         this._renderItems()
      }

      </div>
    );
  }
}

export default App;
