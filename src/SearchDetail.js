import React, {Component} from 'react';
import { URL_IMG, IMG_SIZE_LARGE,API_KEY } from './const';
import { withRouter } from "react-router-dom";
import Movie from './Movie';
import Loading from './Loading';
import SearchBar from './SearchBar';


 class SearchDetail extends Component{

    constructor(props){
        super(props);

        this.state = {
            keyword: '',
            searchData: {},
            isLoading: true,
            isSearch:false,
        }
    }

    componentDidMount(){
        this.getAPISearchItems(this.props.match.params.keyword);
    }

    componentWillReceiveProps(nextProps){
        console.log('nextProps>>>',nextProps);
        console.log('searchDetail new >>',nextProps.match.params.keyword);
        this.getAPISearchItems(nextProps.match.params.keyword);
    }

    handleSearchData =(newKeyword)=>{
        console.log('newKeyword >>>', newKeyword);
        this.setState({
            keyword:newKeyword,
        });
        this.getAPISearchItems(this.state.keyword);
    }


    getAPISearchItems = async(keyword)=>{
        await fetch(`https://api.themoviedb.org/3/search/movie${API_KEY}&language=en-US&page=1&include_adult=false&query=${keyword}`)
        .then(res => res.json()
        .then(res =>{
          console.log('getAPISearchItems>>>>>',res);
          this.setState({
             searchData: res.results,
             isLoading:false,
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
              <React.Fragment>
                  <SearchBar isSearch={true} handleSearchData={this.handleSearchData} />
                 <Movie searchData ={this.state.searchData} />
              </React.Fragment>

            }
          </React.Fragment>
        )
    }
}

export default withRouter(SearchDetail);