import React, {useState,useEffect} from 'react';
import './css/App.css';

function Loading () {

    const [indicatorText, setIndicatorText] = useState();
    const LOADING_TEXT = 'Now Loading'
    let repeat;

    useEffect(()=>{
        makeLoadingIncicator();

        return()=>{
            clearInterval(repeat);
        }

    },[]);  

    const makeLoadingIncicator =()=>{
        let dot = '.';
        let dotArr = ['.'];

        repeat = setInterval(()=>{
            if(dotArr.length <4){   
                setIndicatorText(LOADING_TEXT+dotArr.join('')); 
                dotArr.push(dot);
            }else{
                dotArr=[dot];
                setIndicatorText(LOADING_TEXT); 
            }
          },300)
      }

      const loadingStyle = {
           justifyContent: 'center',
           alignItems: 'center',
           display: 'flex',
           height: '100%',
        }
      
    return(
        <div style={loadingStyle}>
                {indicatorText}
        </div>
    )
}

export default Loading;