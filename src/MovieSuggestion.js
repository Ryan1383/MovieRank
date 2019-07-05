import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import { URL_IMG, IMG_SIZE_LARGE,API_KEY } from './const';
import './css/MovieSuggestion.css';

export default class MovieSuggestion extends Component {

    constructor(props){
        super(props);

        this.state = {
            suggestion:[],
            isLoading:true,
            reRender:false,
        }
    }

    componentDidMount(){
        this.getAPIMovieSuggestion(this.props.movieId);
    }

    componentWillReceiveProps(){
       this.getAPIMovieSuggestion(this.props.movieId)

    }

    getAPIMovieSuggestion =async(movieId)=>{
       
        const suggestion = `https://api.themoviedb.org/3/movie/${movieId}/similar${API_KEY}&language=en-US&page=1`
       
        await fetch(suggestion)
          .then(res => res.json())
          .then(res =>{
            console.log('getAPIMovieSuggestion>>>', res);
            this.setState({
                suggestion:(res.results).splice(0,4),
                isLoading:false,
            })
           
          })
          .catch(err =>{
              console.log(err);
          })
      }  
    
      renderSuggestion =()=>{
        let render = this.state.suggestion.map( Suggestion =>
            (
                <div key={Suggestion.id} className="Suggestion_container">
                    <Link to={`/${Suggestion.id}`} >
                        <img
                            className="Suggestion__poster Poster__Scale"
                            src ={URL_IMG+IMG_SIZE_LARGE+Suggestion.poster_path} 
                            alt={Suggestion.title}
                            title={Suggestion.title}
                        />
                    </Link>
                </div>
            )
          );

          return render;
      }
      
    render(){
        return(
            <div className="Movie__suggestion">
                <h2>Suggestion</h2>
                <div className="Suggestion__content">
                        {this.renderSuggestion()}
                </div>
            </div>
        )


    }
}