import React ,{Component} from 'react';
import Iframe from 'react-iframe'

import { URL_YOUTUBE,API_KEY } from './const';
import './css/MovieTrailer.css';

export default class MovieTrailer extends Component {

    constructor(props){
        super(props);

        this.state = {
            trailer:[],
        }
    }

    componentDidMount(){
        this.getAPIMovieTrailer(this.props.movieId);
    }

    componentWillReceiveProps(){
        this.getAPIMovieTrailer(this.props.movieId)
 
    }
    getAPIMovieTrailer =async(movieId)=>{
        const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos${API_KEY}`
       
        await fetch(trailerUrl)
          .then(res => res.json())
          .then(res =>{
            console.log('getAPIMovieTrailer>>>', res.results);
            this.setState({
                trailer:res.results.splice(0,3),
                isTrailerExist: (res.results).length !== 0,
            })
            console.log(' trailer length >>',(res.results).length);
          })
          .catch(err =>{
              console.log(err);
          })
      }  
    
      renderTrailers =(trailers)=>{

        console.log('trailers >>',trailers);
        let render;

        if(trailers.length === 0){
            
            render = <div className="Trailer__no_content"><h2>No Trailer Data</h2></div>

            return render;
        }else{
            render = trailers.map(function(trailer) {
                return(
                  <div  key={trailer.id} >
                    <Trailer trailer={trailer.key} />
                  </div>
                );
              });
    
              return render;
        }
        
        
      }
      
    render(){
        console.log('movie trailer exist >>', this.state.isTrailerExist)
        return(
            <div className="Movie__trailer">
                <div className="Trailer__content">
                     {this.renderTrailers(this.state.trailer)}
                </div>
            </div>
        )


    }
}
  function Trailer({trailer}) {
    return(
        <Iframe url={URL_YOUTUBE + trailer}
            className="Trailer__Iframe"
            allowFullScreen
        />
    )
  }