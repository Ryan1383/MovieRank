import React ,{Component} from 'react';
import {API_KEY } from './const';
import './css/MovieReviews.css';
import LinesEllipsis from 'react-lines-ellipsis'


export default class MovieReviews extends Component {

    constructor(props){
        super(props);

        this.state = {
            reviwes:[],
            isLoading:true,
            more:[],  
        }
    }

    componentDidMount(){
        this.getAPIMovieReviwes(this.props.movieId);
    }

    componentWillReceiveProps(){
        this.getAPIMovieReviwes(this.props.movieId)
 
    }
    getAPIMovieReviwes =async(movieId)=>{
       
        const reviwes = `https://api.themoviedb.org/3/movie/${movieId}/reviews${API_KEY}&language=en-US&page=1`
       
        await fetch(reviwes)
          .then(res => res.json())
          .then(res =>{
            console.log('getAPIMovieReviwes>>>', res);
            this.setState({
                reviwes:res.results,
                isLoading:false,
                total_results: res.total_results,
            })
            for(let i=0; i<(res.results).length; i++){
                this.setState({
                    more:[...this.state.more,true]
                })
            }
          })
          .catch(err =>{
              console.log(err);
          })
    }  
    handleMore = (index) => {
        const moreArray = this.state.more;
        if(moreArray[index] === false){
            moreArray[index] = true;
        }else{
            moreArray[index] = false;
        }

        this.setState({
            more:moreArray
        })

      }
      renderReviews =()=>{
        let render = this.state.reviwes.map( (review,index) =>
            (
              <div key={review.id} className="review_container">
                  <div className="review__author">
                        <h4>{review.author}</h4>
                  </div>
                  <div className="review__content" >
                      
                      {this.state.more[index]?
                        <LinesEllipsis
                            text={review.content}
                            maxLine='2'
                            trimRight
                            basedOn='letters'
                        />   
                        :
                      review.content
                      }
                      {(review.content).length >300&&
                            <p onClick={()=>this.handleMore(index)} style={{color:'blue'}}>{this.state.more[index]===true?'more':'less'}</p>
                      }
                </div>
              </div>
            )
          );

          return render;
      }
      
    render(){
        return(
            <div className="Movie__reviwes">
                <h2>Reviews</h2>
                <hr/>
                <div className="Reviwes__content">
                        {this.state.total_results !== 0?
                            this.renderReviews()
                        :
                            <div className="Review__no__data"><h2>No Review Data...</h2></div>
                        }
                </div>
            </div>
        )


    }
}