import React, { Component } from 'react';
import './partials.css';

class Header extends Component {
    render(){
        return(
            <header className="headwrap">
                <div className="menu_btn">
                    <div className="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="cross">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;