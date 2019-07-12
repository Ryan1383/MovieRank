import React,{useState,useEffect} from 'react';
import { URL_IMG, IMG_SIZE_LARGE,API_KEY } from './const';
import Loading from './Loading';
import LinesEllipsis from 'react-lines-ellipsis'
import './css/CastDetail.css';
import MovieSuggestion from './MovieSuggestion';

function MovieCast ({match,location}) {

    useEffect(() => {
        console.log('cast>>>>>>', match);
        console.log('cast props>>>>>>', location.state.cast);

        setCast(location.state.cast);
        getAPICastMovieList(match.params.id);
    }, {});

    const [cast, setCast] = useState({});
    const [castMovies, setCastMovies] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    const getAPICastMovieList =async(personId)=>{
       
        await fetch(` https://api.themoviedb.org/3/person/${personId}/movie_credits${API_KEY}`)
          .then(res => res.json())
          .then(res =>{
            console.log('getAPICastMovieList>>>', res);
                setCastMovies(res);
                setIsLoading(false);
          })
          .catch(err =>{
              console.log(err);
          })
      }  

      const noData = "don't have infomation.."

    return(
        
        <React.Fragment>
        {isLoading?
        
          <Loading />
        :
        <div className="Cast__detail">
            <div className="Cast__detail_container" >
                <div className="Cast__poster">
                    <img src={URL_IMG+IMG_SIZE_LARGE+cast.profile_path} alt={cast.name} title={cast.name}/>
                </div>
                
                <div className="Cast__info">
                    <div className="Cast__title">
                        <h1>{cast.name}</h1>
                    </div>
                    <div>
                        <p>Birthday{ cast.deathday!=null&& "-Deathday"}: {cast.birthday == null?noData: cast.deathday != null? cast.birthday +' ~ '+ cast.deathday : cast.birthday}</p>
                        <p>Known for: {cast.known_for_department}</p>
                        <p>Place of birth: {cast.place_of_birth}</p>
                    </div>
                
                    <div className="Cast__overview">
                        <LinesEllipsis
                            text={cast.biography}
                            maxLine='12'
                            trimRight
                            basedOn='letters'
                        />   
                    </div>
                </div>
                <div className="Cast__movies">
                    <MovieSuggestion 
                            title={'Movies'}
                            type={'cast'}
                            url={`https://api.themoviedb.org/3/person/${match.params.id}/movie_credits${API_KEY}`} 
                    />
                </div>
            </div>
        </div>

        }
        </React.Fragment>
    )


}



export default MovieCast;

