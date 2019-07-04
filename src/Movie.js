import React, {Component}from 'react';
import {Link} from 'react-router-dom';
import { URL_IMG, IMG_SIZE_LARGE } from './const';
import Star from './images/star.png'
import './css/Movie.css';
import './css/App.css'
import Loading from './Loading';

class Movie extends Component {

    constructor(props){
        super(props);
    
        this.state ={
          movies : [],
          isLoading: true,
    
        }
    }

    componentDidMount(){
        // 상세화면으로 이동 후에 다시 목록 페이지로 돌아갈경우 loading창이 뜨게 되는데 이때 상태관리(redux)의 필요성을 느낌
        // 상세화면 이동 -> 뒤로가기 -> 기존에 받아온 데이터를 저장한 객체를 기반으로 렌더를 함으로서 성능 향상을 야기
        this.getAPIMovies();
        
    }

    getAPIMovies =()=>{
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=4d4ed145d3584846f5922b6a467e1f85&page=1')
        .then(res => res.json()
        .then(res =>{
          console.log('resgo>>>>>',res);
          let movies = res.results;
    
            this.setState({
              movies : movies,
              isLoading: false,
            },()=>console.log(this.state.movies));
          
        }
        )
        .catch(err =>{
          console.log(err);
        })
        )}

      _renderItems =()=>{
        return(
            this.state.movies.map(movie=>(
            <div key = {movie.id} className="Movie">
                <div className="Movie__Column">
                    <Link to={`/${movie.id}`}>
                        <MoviePoster 
                            posterImg = {URL_IMG+IMG_SIZE_LARGE+movie.poster_path}
                            alt={movie.title}
                        />
                    </Link>
                </div>
                <div className="Movie__Column">
                    <div className="Movie__Header">
                        <h1>{movie.title}</h1>
                        <div className="Movie__Rating">
                            <img 
                                src={Star}
                                style={{height:15,width:15}}
                                alt={'Rating star'}
                            />
                            <span>{movie.vote_average}</span>
                        </div>
                    </div>
                    <div className="Movie__Genres">
                        {movie.genre_ids.map((genre,index) =>
                            (
                                <MovieGenres
                                    genre ={genre}
                                    key={index}
                                />
                            )
                        )}
                    </div>
                    {/* <div className="Movie__Synopsis">
                        <LinesEllipsis
                            text={movie.synopsis}
                            maxLine='3'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                            />   
                    </div> */}
                </div>
            </div>
            
        )))
        
      }

    render () {
        return(
            <div className={!this.state.isLoading?"App":"App--loading"}>
            {this.state.isLoading?
                <Loading />
            : 
                this._renderItems()
            }
            </div>
        );
    }
}
function MovieGenres({genre}){
    return<span className="Movie__Genre">{genre.name}</span>
}
function MoviePoster({posterImg,alt}) {
    return(
        <img 
            className="Movie__Poster Poster__Scale"
            title={alt}
            src ={posterImg}
            alt={alt}
        />
    )

}
export default Movie;
