import React ,{Component} from 'react';
import { URL_IMG, IMG_SIZE_LARGE,API_KEY } from './const';
import Avatar from './images/avatar.png';

export default class MovieCastProfile extends Component{

    componentDidMount(){
        this.getAPIMovieCastProfile(this.props.personId)
    }
    constructor(props){
        super(props);

        this.state ={
            profile_path:'',
        }
    }
     getAPIMovieCastProfile =async(personId)=>{
       
        await fetch(` https://api.themoviedb.org/3/person/${personId}${API_KEY}`)
          .then(res => res.json())
          .then(res =>{

              if(res.profile_path !== null){
                this.setState({
                    profile_path:res.profile_path
                  })
              }else{
                this.setState({
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
            
            <img  
                style={{width:30,height:30,borderRadius:50,resize:'contain'}} 
                src ={this.state.profile_path !== ''?
                         URL_IMG+IMG_SIZE_LARGE+this.state.profile_path
                      :
                         Avatar
                     } 
                alt={'image'}
            />
        )
    }
}


