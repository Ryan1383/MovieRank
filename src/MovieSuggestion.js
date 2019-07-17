import React ,{Component} from 'react';
import {Link} from 'react-router-dom';

import { URL_IMG, IMG_SIZE_LARGE } from './const';
import NoImage from './images/noImage.png'
import './css/MovieSuggestion.css';

export default class MovieSuggestion extends Component {

    constructor(props){
        super(props);

        this.state = {
            suggestion:[],
            isLoading:true,
            reRender:false,
            isTypeMovie:true,
        }
    }

    componentDidMount(){
        if(this.props.type === 'movie'){
            this.setState({
                isTypeMovie:true,
            })
        }else{
            this.setState({
                isTypeMovie:false,
            })
        }
        this.getAPIMovieSuggestion(this.props.url);
    }

    componentWillReceiveProps(){
       this.getAPIMovieSuggestion(this.props.url)

    }

    getAPIMovieSuggestion =async(url)=>{
        const suggestion =url;
        await fetch(suggestion)
          .then(res => res.json())
          .then(res =>{
            console.log('getAPIMovieSuggestion>>>', res);

            if(this.state.isTypeMovie){
                this.setState({
                    suggestion:(res.results).splice(0,4),
                    isLoading:false,
                    total_results: res.total_results,
                })
            }else{
                this.setState({
                    suggestion:(res.cast).splice(0,4),
                    isLoading:false,
                })
            }   
           
          })
          .catch(err =>{
              console.log(err);
          })
      }  
    
      renderSuggestion =()=>{
        let render = this.state.suggestion.map( Suggestion =>
            (
                <div key={Suggestion.id} className="Suggestion_container">
                    <Link to={`/detail/${Suggestion.id}`} >
                        <img
                            className="Suggestion__poster Poster__Scale"
                            src ={Suggestion.poster_path !== null? URL_IMG+IMG_SIZE_LARGE+Suggestion.poster_path:NoImage} 
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
            <div className={!this.state.isTypeMovie?"Cast__Movie__Container":"Suggestion__movie_container"}>
                <h2>{this.props.title}</h2>
                <div className={this.state.isTypeMovie?"Suggestion__Movie_content":"Suggestion__Cast_content"}>
                        {this.state.total_results !== 0?
                           this.renderSuggestion()
                           :
                            <div className="Suggestion__no_content"><h3>No Suggenstion Data</h3></div>
                        }

                </div>
            </div>
        )


    }
}