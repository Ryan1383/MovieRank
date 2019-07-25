import React, {Component} from 'react';
import { URL_IMG, IMG_SIZE_LARGE,API_KEY,URL_SEARCH } from './const';
import { withRouter } from "react-router-dom";
import Movie from './Movie';
import Loading from './Loading';
import SearchBar from './component/SearchBar';
import './css/SearchDetail.css'

 class SearchDetail extends Component{

    constructor(props){
        super(props);

        this.state = {
            keyword: '',
            searchData: {},
            isLoading: true,
            isSearch:false,
            isNewKeyword: false,
        }
    }

    componentDidMount(){
        this.getAPISearchItems(this.props.match.params.keyword);
        this.setState({
          keyword: this.props.match.params.keyword,
        })
    }

    componentWillReceiveProps(nextProps){
        this.getAPISearchItems(nextProps.match.params.keyword);
        this.setState({
          keyword:nextProps.match.params.keyword,
          isNewKeyword: this.props.match.params.keyword !== nextProps.match.params.keyword,
        })
    }


    getAPISearchItems = async(keyword,pageNumberParam)=>{
      
       let pageNumber = pageNumberParam === undefined? 1 : pageNumberParam;

        await fetch(`${URL_SEARCH}${API_KEY}&language=en-US&page=${pageNumber}&include_adult=false&query=${keyword}`)
        .then(res => res.json()
        .then(res =>{
          console.log('getAPISearchItems>>>>>',res);
          this.setState({
             searchData: res.results,
             isLoading:false,
             total_results : res.total_results,
          })
        }
        
        )
        .catch(err =>{
          console.log(err);
        })
        )
    }

    render(){
        return(
          
          <React.Fragment>  
            {this.state.isLoading?
               <Loading />
            :
              <div className= "Search__datail">
                  <SearchBar isSearch={true} />
                  <div className = "Search__result">
                      <div className = "Search__result__container">
                          <h2>Search : {this.state.keyword}</h2> <span>{this.state.total_results} movies</span>
                      </div>
                    <hr/>
                  </div>
                  {this.state.total_results !== 0 ?
                    <Movie
                        keyword = {this.state.keyword} 
                        handlePage = {(keyword,pageNumberParam)=>this.getAPISearchItems(keyword,pageNumberParam)}
                        searchData ={this.state.searchData} 
                        isNewKeyword ={this.state.isNewKeyword}
                    />
                    :
                      <div className ="Search__NoResult">
                        <h1>No results were found for your search</h1>
                      </div>
                  }
              </div>

            }
          </React.Fragment>
        )
    }
}

export default withRouter(SearchDetail);