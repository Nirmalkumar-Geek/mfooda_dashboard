import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element, role }) => {


    const isLoggedIn = useSelector(state => state.rootReducer.auth.isLoggedIn);
    const profile = useSelector(state => state.rootReducer.profile);

    if (isLoggedIn){

        if (role.includes(profile.role) || role.includes("all")) {

            return <Element />

        } else {

            return <Navigate to='/404' />;

        }

    }else{
        return <Navigate to='/login' />;
    }
};

export default PrivateRoute;
