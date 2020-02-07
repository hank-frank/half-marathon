import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from './Header.jsx'
import Main from './main/Main.jsx';
import Login from './login/login.jsx'

function App() {
    const [helmetTitle, setHelmetTitle] = useState("Half Marathon");

    return (
        <>
            <Router>
                <Helmet>
                    <title>{ helmetTitle }</title>
                </Helmet>
                <Header />
                <main id="page-container">
                    <Route path='/Main' component={ Main }/>
                    <Route path='/Login' component={ Login }/>
                </main>
            </Router>
        </>
    )
};

export default App;
