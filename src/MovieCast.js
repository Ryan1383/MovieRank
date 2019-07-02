// https://api.themoviedb.org/3/discover/movie?api_key=4d4ed145d3584846f5922b6a467e1f85&with_cast=973667
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { URL_IMG, IMG_SIZE_LARGE,IMG_SIZE_SMALL } from './const';
import './css/MovieDetail.css';
import Loading from './Loading';

function MovieCast ({match}) {

    useEffect(() => {

    }, {});

   

    const getAPIMovieDetail =async()=>{
       await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=4d4ed145d3584846f5922b6a467e1f85`)
        .then(res => res.json())
        .then(res =>{
            console.log('getAPIMovieDetail >>>>',res);       
            if(res != null){
                setMovieDetail(res);
                setDetailLoading(false);
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
        background: '#f1f1f1'
    }

    // const onClickSuggestion =async(id)=>{
    //     getAPIMovieDetail(id);
    //     getAPIMovieSuggestion(id);

    // }
    console.log('movieDetail>>',movieDetail)
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
                    <img src={URL_IMG+IMG_SIZE_LARGE+movieDetail.poster_path} alt={movieDetail.title} title={movieDetail.title}/>
                </div>
                 {/*
                <div className="Movie__info">
                    <div className="Movie__title">
                       <h1>{movieDetail.original_title}</h1>
                    </div>
                    <div className="Movie__rating">
                        {movieDetail.vote_average}
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
                </div> */}
                {/* <div className="Movie__suggestion">
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
                </div> */}
            </div>
        }
        </>
    )


}



export default MovieDetail;

