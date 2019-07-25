import React,{useState,useEffect} from 'react';
import LinesEllipsis from 'react-lines-ellipsis'

import { URL_IMG, IMG_SIZE_LARGE,API_KEY,CAST_MAX_NUM,URL_DETAIL,URL_CAST } from './const';
import './css/MovieDetail.css';
import Loading from './Loading';
import Star from './images/star.png'
import MovieCastProfile from './MovieCastProfile';
import MovieTrailer from './MovieTrailer';
import MovieReviews from './MovieReviews';
import MovieSuggestion from './MovieSuggestion';
import NoImage from './images/noImage.png'

function MovieDetail ({match}) {

    useEffect(() => {
        console.log('match>>>',match)
        getAPIMovieDetail();
        getAPIMovieCast();
    }, [match]);

    const movie = match.params;
    
    const [movieDetail, setMovieDetail] = useState({});
    const [movieCast, setMovieCast] = useState({});

    const [detailLoading, setDetailLoading] = useState(true);
    const [castLoading, setCastLoading] = useState(true);
    const isLoading = !detailLoading?(!castLoading?false:true):true;
    const MAX_CAST_NUM = CAST_MAX_NUM;

    const getAPIMovieDetail =async()=>{
       await fetch(`${URL_DETAIL}${movie.id}${API_KEY}`)
        .then(res => res.json())
        .then(res =>{
            console.log('getAPIMovieDetail >>>>',res);       
            if(res != null){
                setMovieDetail(res);
                setDetailLoading(false);

            }else{
                console.log('has no data');
            }
        })
        .catch(err =>{
          console.log(err);
        })
      }

    const getAPIMovieCast =async(id)=>{
      await  fetch(`${URL_DETAIL}${movie.id}${URL_CAST}${API_KEY}`)
        .then(res => res.json())
        .then(res =>{
            console.log('getAPIMovieCast >>>>',res);       
            if(res.cast != null){
                if((res.cast).length >MAX_CAST_NUM){
                    setMovieCast(res.cast.splice(0,MAX_CAST_NUM));
                }else{
                    setMovieCast(res.cast);
                }
            
                setCastLoading(false);
            }else{
                console.log('has no data');
            }
        })
        .catch(err =>{
            console.log(err);
        })
    }  

    return(
        <React.Fragment>
        <div className="Movie__detail">
        {isLoading?
        
          <Loading />
        :
            <React.Fragment>
                <div className="Movie__detail_container" >
                    <div className="Movie__poster">

                        <img src={movieDetail.poster_path !== null?URL_IMG+IMG_SIZE_LARGE+movieDetail.poster_path:NoImage} alt={movieDetail.title} title={movieDetail.title}/>
                    </div>
                    <div className="Movie__info">
                        <div className="Movie__title">
                            <h1>{movieDetail.original_title}</h1>
                        </div>
                        <div className="Movie__Rating">
                            <img 
                                src={Star}
                                style={{height:15,width:15}}
                                alt={'Rating star'}
                            />
                            <span>{movieDetail.vote_average}</span>
                                {movieDetail.runtime !== null&&
                                    <span className="Movie__runtime">
                                        {`${movieDetail.runtime}분`}
                                    </span>
                                }
                        </div>
                    
                        <div className="Movie__genres">
                            {movieDetail.genres.map(genres=>(
                                <span className="Movie__genre" key={genres.id}>{genres.name}</span>
                            ))}
                        </div>
                        <div className="Movie__overview">
                        <LinesEllipsis
                            text={movieDetail.overview}
                            maxLine='7'
                            trimRight
                            basedOn='letters'
                        />   
                            
                        </div>
                        <div className="Movie__suggestion">
                           <MovieSuggestion 
                                title={'Suggestion'}
                                type={'movie'}
                                url={`https://api.themoviedb.org/3/movie/${match.params.id}/similar${API_KEY}&language=en-US&page=1`} 
                        />
                        </div>
                    </div>

                    <div className="Movie__cast">
                        <h2>Cast</h2>
                        {movieCast.map(cast =>(
                            <div className="Cast__profile" key={cast.id}>
                                <MovieCastProfile 
                                    personId ={cast.id}  
                                    name ={cast.name}
                                    character= {cast.character}
                                />
                            </div>
                        ))}
                    
                    </div>
                </div>
                <div className="Movie__trailer">
                    <h2>Movie Trailer</h2>
                    <hr/>
                    <MovieTrailer movieId={ match.params.id}/>
                </div>
                <div className="Movie__Reviews">
                     <MovieReviews movieId={ match.params.id}/>       
                </div>
            </React.Fragment>
        }
        </div>
       </React.Fragment>
    )


}



export default MovieDetail;

