import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

import './css/MovieDetail.css';
import Loading from './Loading';

function MovieDetail ({match}) {

    useEffect(() => {
        getAPIMovieDetail(match.params.id);
        getAPIMovieSuggestion(match.params.id);

    }, {});

    const movie = match.params;
    
    const [movieDetail, setMovieDetail] = useState({});
    const [movieSuggestions, setMovieSuggestions] = useState({});
    const   [detailLoading, setDetailLoading] = useState(true);
    const   [suggestionLoading, setSuggestionLoading] = useState(true);
    const isLoading = !detailLoading?(!suggestionLoading?false:true):true;
    const trailerUrl = `https://www.youtube.com/watch?v=${movie.yt_trailer_code}`

    const getAPIMovieDetail =async(id)=>{
       await fetch(`https://yts.lt/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`)
        .then(res => res.json())
        .then(res =>{
            console.log('getAPIMovieDetail >>>>',res.data);       
            if(res.data != null){
                setMovieDetail(res.data.movie);
                setDetailLoading(false);
            }else{
                console.log('has no data');
            }
        })
        .catch(err =>{
          console.log(err);
        })
      }
    const getAPIMovieSuggestion =async(id)=>{
      await  fetch(`https://yts.lt/api/v2/movie_suggestions.json?movie_id=${id}`)
        .then(res => res.json())
        .then(res =>{
            console.log('getAPIMovieSuggestion >>>>',res.data);       
            if(res.data.movie_count > 0){
                setMovieSuggestions(res.data.movies);
                setSuggestionLoading(false);

            }else{
                console.log('has no data');
            }
        })
        .catch(err =>{
            console.log(err);
        })
    }  

    const movie_container_style ={
        backgroundImage: `url(${movieDetail.background_image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'


    }

    const onClickSuggestion =async(id)=>{
        getAPIMovieDetail(id);
        getAPIMovieSuggestion(id);

    }

    return(
        /**
         * UI 구성 요소
         *  1.  title - title_long  O
         *  2.  thumbnail image - medium_cover_image O
         *  3.  description - description_full
         *  4.  cast - cast {character_name, name, url_small_image}
         *  5.  genres - genres O
         *  6.  screen_shot images - (medium_screenshot_image1, medium_screenshot_image2, medium_screenshot_image3)
         *  7.  rating - rating O
         *  8.  runtime(minute) - runtime O
         *  9.  year - year
         *  10. trailercode 
         *  11. background_image - background_image
         * 
         *  12. suggestion 
         */
        
        <>
        {isLoading?
        
          <Loading />
        :
            <div className="Movie__detail" style={movie_container_style}>
                <div className="Movie__poster">
                    <img src={movieDetail.medium_cover_image} alt={movieDetail.title} title={movieDetail.title}/>
                </div>
                <div className="Movie__info">
                    <div className="Movie__title">
                       <h1>{movieDetail.title_long}</h1>
                    </div>
                    <div className="Movie__rating">
                        {movieDetail.rating}
                    </div>
                    <div className="Movie__year">
                        {movieDetail.year}
                    </div>
                    <div className="Movie__runtime">
                        {movieDetail.runtime}
                    </div>
                    <div className="Movie__genres">
                        {movieDetail.genres}
                    </div>
                </div>
                <div className="Movie__suggestion">
                    <div className="Suggestion__title">
                        <h3>Movie Suggestion</h3>
                    </div>
                    <div className="Suggestion_list">
                        {movieSuggestions.map(movie =>(
                            <div onClick={()=>onClickSuggestion(movie.id)}>
                                <img src={movie.small_cover_image} alt={movie.title} title={movie.title} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        }
        </>
    )


}



export default MovieDetail;

