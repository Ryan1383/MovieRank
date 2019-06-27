import React, {Component}from 'react';
import './Movie.css';

class Movie extends Component {

    render () {
        const movie = this.props.movie;

        return(
            <div>
                <h1>{movie.title}</h1>
                <MoviePoster posterImg = {movie.medium_cover_image}/>
            </div>
        );
    }
}

function MoviePoster({posterImg}) {
    return(
        <img 
            src ={posterImg}
            alt="이미지"
        />
    )

}
export default Movie;
