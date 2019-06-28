import React, {Component}from 'react';
import LinesEllipsis from 'react-lines-ellipsis'
import Star from './images/star.png'
import './css/Movie.css';

class Movie extends Component {

    render () {
        const movie = this.props.movie;
        return(
            <div className="Movie">
                <div className="Movie__Column">
                    <MoviePoster 
                        posterImg = {movie.medium_cover_image}
                        alt={movie.title}
                    />
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
