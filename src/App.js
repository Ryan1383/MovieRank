import React , {Component} from 'react';
import './css/App.css';
import Movie from './Movie';
import Header from './Header';

const LOADING_TEXT = 'Now Loading'
const MOVIE_LIST_URI = 'https://yts.lt/api/v2/list_movies.json?quality=3D';
class App extends Component {

  constructor(props){
    super(props);

    this.state ={
      movies : [],
      isLoading: true,
      indicatorText:LOADING_TEXT,

    }
  }
  componentDidMount(){
    this.getAPIMovies();
  }

  _setMovies =async()=>{
    const movies = await this._callAPIMovies();
    this.setState(
      {
        movies:movies,
        isLoading:false,
      }
    )
  }

  getAPIMovies =()=>{
    this.makeLoadingIncicator();
    fetch(`https://yts.lt/api/v2/list_movies.json?limit=${40}&page=${1}&genre=drama`)
    .then(res => res.json())
    .then(res =>{
      console.log(res);
      let movies = res.data.movies;

      if( movies != null){
        console.log('data receive successfully')
        this.setState({
          movies : movies,
          isLoading: false,
        });
      }else{
        console.log('has not data');
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

  makeLoadingIncicator =()=>{
    let dot = '.';
    let dotArr = ['.'];
    let repeat = setInterval(()=>{
        if(this.state.isLoading){
          if(dotArr.length <4){    
              this.setState({
                indicatorText:LOADING_TEXT+dotArr.join(''),
              })
              dotArr.push(dot);
          }else{
            dotArr=[dot];
            this.setState({
              indicatorText:LOADING_TEXT,
            })
          }
        }else{
          clearInterval(repeat);
        }
      },300)
  }
  render(){
    return (
      <div >
          <Header/>
        <div className={!this.state.isLoading ? "App" : "App--loading"}>
          {this.state.isLoading?
          <div>{this.state.indicatorText}</div>
          :
            this._renderItems()
            
        }

        </div>
      </div>

    );
  }
}

export default App;
