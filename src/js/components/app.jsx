import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from './Header.jsx';
import Main from './main/Main.jsx';
import Login from './login/login.jsx';
import withAuth from './login/withAuth.jsx';
import Register from './login/register.jsx';
import NewStart from './main/newStart.jsx';

import '../../css/custom.scss';

function App() {
    let _isMounted = false;
    const [helmetTitle, setHelmetTitle] = useState("Half Marathon");
    const [user, setUser] = useState({});

    useEffect(() => {
        _isMounted = true;
        if (_isMounted) {
            setHelmetTitle(handleTitle(window.location.hash))
        }
        return () => {
            _isMounted = false;
        }
    }, []);

    //is this attempting to store the user data gobally? 
    const storeUser = (data) => {
        setUser(data);
    };

    const handleTitle = (hash) => {
        const path = hash.replace(/^#\//, '');
        let newTitle = '';
        switch (path) {
            case 'main':
                newTitle = 'Half Marathon Schedule';
                break;
            case 'login':
                newTitle = 'Login';
                break;
            default:
                newTitle = 'Half Marathon';
        };

        if (helmetTitle != newTitle) {
            setHelmetTitle(newTitle);
        };
    }

    return (
        <>
            <Router>
                <Helmet>
                    <title>{ helmetTitle }</title>
                </Helmet>
                <Header />
                <main id="page-container">
                    <Route path='/Main' component={ withAuth(Main) } />
                    <Route path='/Login' render={() =>  <Login storeUser ={ storeUser } />}/>
                    <Route path='/NewStart' render={() =>  <NewStart user={ user } />}/>
                    <Route path='/Register' render={() =>  <Register  storeUser={ storeUser }/>}/>
                </main>
            </Router>
        </>
    )
};

export default App;
