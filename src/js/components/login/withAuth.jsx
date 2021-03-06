import React, { Component } from 'react';
// import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// function withAuth (ComponentToProtect) {
//     const [loading, setLoading] = useState(true);
//     const [redirect, setRedirect] = useState(false);

//     useEffect(() => {
//         fetch('/checkToken')
//         .then(res => {
//             if (res.status === 200) {
//                 setLoading(false);
//             } else {
//                 const error = new Error(res.error);
//                 throw error;
//             }
//         })
//         .catch(err => {
//             console.error(err);
//             setLoading(false);
//             setRedirect(true);
//         });
//     }, [])

//     if (loading) {
//         return null;
//     }
//     if (redirect) {
//         return <Redirect to="/login" />;
//     }
//         return <ComponentToProtect { ...props } />;
// };

// export default withAuth;

export default function withAuth(ComponentToProtect) {
    return class extends Component {
        _isMounted = false;
        constructor() {
        super();
        this.state = {
        loading: true,
        redirect: false,
    };
    }
    componentDidMount() {
        this._isMounted = true;
        fetch('/checkToken')
            .then(res => {
                if (res.status === 200) {
                    if (this._isMounted) {
                        this.setState({ loading: false });
                    }
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                if (this._isMounted){
                    this.setState({ loading: false, redirect: true });
                }
        });
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    render() {
        const { loading, redirect } = this.state;
        if (loading) {
            return null;
        }
        if (redirect) {
            return <Redirect to="/login" />;
        }
        return <ComponentToProtect {...this.props } />;
    }
    }
}
