import React,{useState,useEffect} from 'react';

function MovieDetail ({match}) {

    useEffect(() => {
        getAPIMovieDetail();
        
        return () => {
           
        };
    }, []);

    const [movieDetail, setMovieDetail] = useState();

    const getAPIMovieDetail =()=>{
        fetch(`https://yts.lt/api/v2/movie_details.json?movie_id=${match.params.id}`)
        .then(res => res.json())
        .then(res =>{
            console.log('getAPIMovieDetail >>>>',res.data);       
            if(res.data != null){
                setMovieDetail(res.data.movie);
            }
        })
        .catch(err =>{
          console.log(err);
        })
      }

    return(

        <div>
        </div>
    )


}

export default MovieDetail;