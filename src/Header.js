import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './css/Header.css';


class Header extends Component {

    render(){

        return(
            <div className="Header-Container">
                  <Link  to={{
                            pathname :`/`,
                            state:{
                                type:''
                            }
                            }}
                            className="Link_style"
                        >
                    <h1>MovieRank</h1>
                </Link>
               
            </div>
        )
    }

}
export default Header;