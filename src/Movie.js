import React, {Component}from 'react';
import {Link,withRouter} from 'react-router-dom';
import { URL_IMG, IMG_SIZE_LARGE,API_KEY } from './const';
import Star from './images/star.png'
import './css/Movie.css';
import './css/App.css'
import Loading from './Loading';
import SearchBar from './SearchBar';



let pageNumber = 1;
class Movie extends Component {

    constructor(props){
        super(props);
    
        this.state ={
          movies : [],
          isLoading: true,
          url:'',
          sortType:'Popularity',
          pageNumber: pageNumber,
          isSearch:false,
        }
    }

    componentDidMount(){
        // 상세화면으로 이동 후에 다시 목록 페이지로 돌아갈경우 loading창이 뜨게 되는데 이때 상태관리(redux)의 필요성을 느낌
        // 상세화면 이동 -> 뒤로가기 -> 기존에 받아온 데이터를 저장한 객체를 기반으로 렌더를 함으로서 성능 향상을 야기
        if(this.props.searchData === undefined){
            this.handleMovieUrl('Popularity');
            this.setState({
                isSearch:false,
            })
        }else{
            this.setState({
                movies: this.props.searchData,
                isLoading:false,
                isSearch:true,
            })
        }
    }

    componentWillReceiveProps(nextProps){
        console.log( 'movie.js received >>',nextProps);
        this.setState({
            movies: nextProps.searchData,
        })
    }

    
    handleMovieUrl = (sortType) =>{
        let url = '';

        if(sortType !== this.state.sortType){
            pageNumber = 1;
        }

        this.setState({
            sortType:sortType,
        })
        console.log(sortType);
        if(sortType === 'Popularity'){
                url = `https://api.themoviedb.org/3/discover/movie${API_KEY}&page=${pageNumber}`
        }else if(sortType === 'Ranking'){
                url = `https://api.themoviedb.org/3/discover/movie${API_KEY}&page=${pageNumber}&sort_by=vote_average.desc`
        }else if(sortType === 'VoteCount'){
                url = `https://api.themoviedb.org/3/discover/movie${API_KEY}&page=${pageNumber}&sort_by=vote_count.desc`
        }else{
            url = `https://api.themoviedb.org/3/discover/movie${API_KEY}&page=${pageNumber}`
        }

        this.setState({
            url: url
        })
        this.getAPIMovies(url);
        
    }
    getAPIMovies =async(url)=>{
        console.log('getAPIMovies url>>>> ',url);
        this.setState({
            isLoading:true,
        })
        await fetch(url)
        .then(res => res.json()
        .then(res =>{
          console.log('resgo>>>>>',res);
    
            this.setState({
              movies : res.results,
              isLoading: false,
            });
          
        }
        )
        .catch(err =>{
          console.log(err);
        })
        )
    }

    handlePageNumber =(type) =>{
        if(type ==='pre'){
           pageNumber = pageNumber-1;
        }else if(type ==='next'){
           pageNumber = pageNumber+1;
        }else {
            console.log('type not matched')
        }

        this.handleMovieUrl(this.state.sortType);
    } 

    

    _renderItems =()=>{
        return(
            this.state.movies.map(movie=>(
            <div key = {movie.id} className="Movie">
                <div className="Movie__Column">
                    <Link to={`/detail/${movie.id}`}>
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
                </div>
            </div>
            
        )))
    
    }

    _renderPagenation =() =>{
        return(
                <div className="Movie__page__buttons">
                    <div className="Movie__page__button" onClick={()=>this.handlePageNumber('pre')}>
                        <span>{pageNumber !==1? '←Previous' : ' '} </span>
                    </div>
                    <div className="Movie__page__button" onClick = {()=>this.handlePageNumber('next')}>
                        <span>Next → </span>
                    </div>
                </div>
        )
    }

    render () {
        return(
            <div className={!this.state.isLoading?"App":"App--loading"}>
                        
                {this.state.isLoading?
                    <Loading />
                : 
                    <React.Fragment>
                       
                        <div className="Sort__Container">
                        {!this.state.isSearch&&
                            <ul className="sort_list">
                                <li>|</li>
                                <li className={ this.state.sortType ==='Popularity'?"Poster__Scale Sort__clicked":'Poster__Scale'}
                                    onClick={()=>this.handleMovieUrl('Popularity')}>
                                        Popularity 
                                </li>
                                <li>|</li>
                                <li className={ this.state.sortType ==='Ranking'?"Poster__Scale Sort__clicked":'Poster__Scale'}
                                    onClick={()=>this.handleMovieUrl('Ranking')}>
                                        Ranking 
                                </li>

                                <li>|</li>
                                <li className={ this.state.sortType ==='VoteCount'?"Poster__Scale Sort__clicked":'Poster__Scale'}
                                    onClick={()=>this.handleMovieUrl('VoteCount')}>
                                        Vote Count
                                </li>
                                <li>|</li>
                            </ul>  
                          }
                          {!this.state.isSearch&&
                                <SearchBar isSearch={false} />
                          }
                           
                        </div>   
                        {this._renderItems()}
                        {this._renderPagenation()}
                    </React.Fragment>
                
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
export default withRouter(Movie);
