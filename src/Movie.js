import React, {Component}from 'react';
import {Link,withRouter} from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis'

import { URL_IMG, IMG_SIZE_LARGE,API_KEY,URL_LIST } from './const';
import Star from './images/star.png'
import NoImage from './images/noImage.png'
import './css/Movie.css';
import './css/App.css'
import Loading from './Loading';
import SearchBar from './component/SearchBar';
import { Pagenation } from './component/Pagenation';

class Movie extends Component {

    constructor(props){
        super(props);
    
        this.state ={
          movies : [],
          isLoading: true,
          url:'',
          sortType:'Popularity',
          isSearch:false,
          isSamePage: true,
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
        if(nextProps.searchData !== undefined){
            this.setState({
                movies: nextProps.searchData,
            })
        }else{
            this.handleMovieUrl('Popularity');
        }
    }

    
    handleMovieUrl = (sortType,pagenumberParam) =>{
        let url = '';

        let pageNumber = pagenumberParam === null?pageNumber : pagenumberParam;

        if(sortType !== this.state.sortType){
            this.setState({
                isSamePage:  false,
            })
        }else{
            this.setState({
                isSamePage:  true,
            })
        }

        this.setState({
            sortType:sortType,
        })
        console.log(sortType);
        if(sortType === 'Popularity'){
                url = `${URL_LIST}${API_KEY}&page=${pageNumber}`
        }else if(sortType === 'Ranking'){
                url = `${URL_LIST}${API_KEY}&page=${pageNumber}&sort_by=vote_average.desc`
        }else if(sortType === 'VoteCount'){
                url = `${URL_LIST}${API_KEY}&page=${pageNumber}&sort_by=vote_count.desc`
        }else{
            url = `${URL_LIST}${API_KEY}&page=${pageNumber}`
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

   
    

    _renderItems =()=>{
        return(
            this.state.movies.map(movie=>(
            <div key = {movie.id} className="Movie">
                <div className="Movie__Column">
                    <Link to={`/detail/${movie.id}`}>
                        <MoviePoster 
                            posterImg = {movie.poster_path !==null? URL_IMG+IMG_SIZE_LARGE+movie.poster_path: NoImage}
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
                    <div className="Movie__overview">
                        <LinesEllipsis
                                text={movie.overview}
                                maxLine='3'
                                trimRight
                                basedOn='letters'
                            />   
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


    render () {
        return(
            <React.Fragment>
            <div className={!this.state.isLoading?"App":"App--loading"}>
                        
                {this.state.isLoading?
                    <Loading />
                : 
                    <React.Fragment>
                       
                        <div className="Sort__Container" style={this.state.isSearch?{display:'none'}:{display:'block'}}>
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
                        {!this.state.isSearch?
                            <Pagenation 
                                    isSearch ={this.state.isSearch}
                                    handlePage ={(sortType,pagenumberParam)=>this.handleMovieUrl(sortType,pagenumberParam)}
                                    sortType = {this.state.sortType}
                                    isSamePage = {this.state.isSamePage}
                            />
                        :
                            <Pagenation 
                                    isSearch ={this.state.isSearch}
                                    handlePage ={(keyword,pageNumberParam)=>this.props.handlePage(keyword,pageNumberParam)}
                                    keyword = {this.props.keyword}
                                    isNewKeyword = {this.props.isNewKeyword}
                            />
                        }
                    </React.Fragment>
                
                }

            </div>
           </React.Fragment>
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
        />
    )

}
export default withRouter(Movie);
