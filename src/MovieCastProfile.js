import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import { URL_IMG, IMG_SIZE_LARGE,API_KEY,URL_PERSON } from './const';
import Avatar from './images/avatar.png';


export default class MovieCastProfile extends Component{

    componentDidMount(){
        this.getAPIMovieCastProfile(this.props.personId)
    }
    constructor(props){
        super(props);

        this.state ={
            cast:[],
            profile_path:'',
        }
    }
     getAPIMovieCastProfile =async(personId)=>{
       
        await fetch(` ${URL_PERSON}${personId}${API_KEY}`)
          .then(res => res.json())
          .then(res =>{
              if(res.profile_path !== null){
                this.setState({
                    cast:res,
                    profile_path:res.profile_path
                  })
              }else{
                this.setState({
                    cast:res,
                    profile_path:''
                  })
              }
          })
          .catch(err =>{
              console.log(err);
          })
      }  
    
    render(){
        return(
            <Link to ={{
                        pathname:`/cast/${this.props.personId}`,
                        state:{
                            cast:this.state.cast
                        }
                }} 
                 
                  style={{textDecoration:'none',display:'flex',alignItems:'center'}}
            >         
                <img  
                    style={{width:30,height:30,borderRadius:50,resize:'contain'}} 
                    src ={this.state.profile_path !== ''?
                            URL_IMG+IMG_SIZE_LARGE+this.state.profile_path
                        :
                            Avatar
                        } 
                    alt={this.state.cast.name}
                    title={this.state.cast.name}
                />
                <span style={{fontSize:12,paddingLeft:5}}><span style={{color:'blue'}}>{this.props.name}</span> as {this.props.character}</span>
            </Link>
        )
    }
}



