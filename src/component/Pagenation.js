import React, {Component} from 'react';
import './../css/Movie.css';

let pageNumber = 1;
let searchPagenumber = 1;

export class Pagenation extends Component {

    componentWillReceiveProps(props){
        console.log('componentWillReceiveProps',props);
    }
    handlePageNumber =(type) =>{
     
        if(!this.props.isSearch){
            if(!this.props.isSamePage){
                pageNumber = 1;
            }

            if(type ==='pre'){
                pageNumber = pageNumber-1;
            }else if(type ==='next'){
                pageNumber = pageNumber+1;
            }else {
                console.log('type not matched');
            }  
            this.props.handlePage(this.props.sortType, pageNumber);
        }else{

            let  isNewKeywordFlag = this.props.isNewKeyword;

            if(isNewKeywordFlag){
               isNewKeywordFlag = this.props.isNewKeyword;
            }

            if(isNewKeywordFlag){
                searchPagenumber = 1;
                isNewKeywordFlag = false;
            }

            if(type ==='pre'){
                searchPagenumber = searchPagenumber-1;
            }else if(type ==='next'){
                searchPagenumber = searchPagenumber+1;
            }else {
                console.log('type not matched')
            }
            this.props.handlePage(this.props.keyword, searchPagenumber);

            
        }
    } 


    render() {

        return(
                <div className="Movie__page__buttons">
                    <div className="Movie__page__button" onClick={()=>this.handlePageNumber('pre')}>
                        <span>{pageNumber !==1? '←Previous' : ' '} </span>
                    </div>
                    <div className="Movie__page__button" onClick = {()=>this.handlePageNumber('next')}>
                        <span>Next → </span>
                    </div>
                </div>

        )
    }
}