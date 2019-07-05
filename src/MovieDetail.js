import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { URL_IMG, IMG_SIZE_LARGE,API_KEY,CAST_MAX_NUM } from './const';
import './css/MovieDetail.css';
import Loading from './Loading';
import Star from './images/star.png'
import MovieCastProfile from './MovieCastProfile';
import MovieTrailer from './MovieTrailer';
import MovieReviews from './MovieReviews';
import MovieSuggestion from './MovieSuggestion';


function MovieDetail ({match}) {

    useEffect(() => {
        console.log('match>>>',match)
        getAPIMovieDetail();
        getAPIMovieCast();
        renderSuggestion();
    }, [match]);

    const movie = match.params;
    
    const [movieDetail, setMovieDetail] = useState({});
    const [movieCast, setMovieCast] = useState({});
    const [movieReview, setMovieReview] = useState({});

    const [detailLoading, setDetailLoading] = useState(true);
    const [castLoading, setCastLoading] = useState(true);
    const isLoading = !detailLoading?(!castLoading?false:true):true;
    const MAX_CAST_NUM = CAST_MAX_NUM;

    const getAPIMovieDetail =async()=>{
       await fetch(`https://api.themoviedb.org/3/movie/${movie.id}${API_KEY}`)
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
      await  fetch(`https://api.themoviedb.org/3/movie/${movie.id}/casts${API_KEY}`)
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

   
    const renderSuggestion =() =>{
        return <MovieSuggestion movieId={match.params.id}/>
    }
  
    return(
        <div className="Movie__detail">
        {isLoading?
        
          <Loading />
        :
            <>
                <div className="Movie__detail_container" >
                    <div className="Movie__poster">
                        <img src={URL_IMG+IMG_SIZE_LARGE+movieDetail.poster_path} alt={movieDetail.title} title={movieDetail.title}/>
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
                            {movieDetail.runtime !== undefined&&
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
                            {movieDetail.overview}
                        </div>
                        <div className="Movie__suggestion">
                           {renderSuggestion()}
                        </div>
                    </div>

                    <div className="Movie__cast">
                        <h2>Cast</h2>
                        {movieCast.map(cast =>(
                            <div className="Cast__profile" key={cast.id}>
                                <MovieCastProfile personId ={cast.id} />
                                <span style={{fontSize:12,paddingLeft:5}}><span style={{color:'blue'}}>{cast.name}</span> as {cast.character}</span>
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
            </>
        }
        </div>
    )


}



export default MovieDetail;

