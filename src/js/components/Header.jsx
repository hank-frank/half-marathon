import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Header() {
    return (
        <>
            <div className="header-container">
                <div className="centered-horizontal">
                    <div className="centered-vertical">
                        <h4 className="header-title">Half Marathon tracker</h4>
                    </div>
                </div>
                <div className="pin-right">
                    <Link to='/main'><span className="header-link">Main</span></Link>
                    <Link to='/login'><span className="header-link">Login</span></Link>
                </div>
            </div>
        </>
    )
};

export default Header;
