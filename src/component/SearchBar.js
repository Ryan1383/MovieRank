import React, {Component} from 'react';
import SearchIMG from './../images/search.png';
import { withRouter } from "react-router-dom";
import './../css/Search.css';


class SearchBar extends Component{


    constructor(props){
        super(props);

        this.state = {
            keyword: '',
            isSearch:false,
        }
    }

    componentDidMount(){
        console.log('isSearch >>>?',this.props.isSearch);

    }

    handleSearchKeyword =(e) =>{
        this.setState({
            keyword: e.target.value
        })
    }

    handleSearch =(e) =>{
        e.preventDefault();
        if(this.state.keyword !== ''){
            this.props.history.push(`/search/${this.state.keyword}`);
        }else{
            alert('Please enter your search term');
        }

    }

    handleSearchEnterKey =(e) =>{
        if(e.key == 'Enter') {
            if(this.state.keyword !== ''){
                this.props.history.push(`/search/${this.state.keyword}`);
            }else{
                alert('Please enter your search term');
            }
        }
    }
    
    render(){

        return(
            <div className="Search__Container">
                <div className="search">
                    <input type="text" onKeyPress={this.handleSearchEnterKey} onChange={(e)=>this.handleSearchKeyword(e)} className="Search__Term" placeholder="What are you looking for?"/>
                    <button onClick={this.handleSearch} type="submit" className="Search__Button">
                        <img src ={SearchIMG} className="Search__img" alt="search"/>
                    </button>
                </div>
            </div>  
        )
    }
}

export default withRouter(SearchBar);