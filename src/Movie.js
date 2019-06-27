import React, {Component}from 'react';
import LinesEllipsis from 'react-lines-ellipsis'
import './Movie.css';

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
                    <h1>{movie.title}</h1>
                    <div className="Movie__Genres">
                        {movie.genres.map((genre,index) =>{
                            return(<MovieGenres
                                genre ={genre}
                                key={index}
                            />)
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
            className="Movie__Poster"
            title={alt}
            src ={posterImg}
            alt={alt}
        />
    )

}
export default Movie;
