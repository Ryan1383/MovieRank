import React, {Component}from 'react';
import LinesEllipsis from 'react-lines-ellipsis'
import {Link} from 'react-router-dom';

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

    _setMovies = async()=>{
        const movies = await this._callAPIMovies();
        this.setState({
                movies:movies,
                isLoading:false,
        });
    }

    getAPIMovies =()=>{
       
        fetch(`https://yts.lt/api/v2/list_movies.json?limit=${20}&page=${1}&genre=drama`)
        .then(res => res.json())
        .then(res =>{
          console.log(res);
          let movies = res.data.movies;
    
          if( movies != null){
            console.log('data received successfully')
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
        return(
            this.state.movies.map(movie=>(
            <div key = {movie.id} className="Movie">
                <div className="Movie__Column">
                    <Link to={`/${movie.id}`}>
                        <MoviePoster 
                            posterImg = {movie.medium_cover_image}
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
                            <span>{movie.rating}</span>
                        </div>
                    </div>
                    <div className="Movie__Genres">
                        {movie.genres.map((genre,index) =>{
                            return(
                                <MovieGenres
                                    genre ={genre}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                    <div className="Movie__Synopsis">
                        <LinesEllipsis
                            text={movie.synopsis}
                            maxLine='3'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                            />   
                    </div>
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
    return<span className="Movie__Genre">{genre}</span>
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
