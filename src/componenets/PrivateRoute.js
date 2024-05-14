import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { VerifyAccessToken } from './Authentication';
import axios from 'axios';
import { setRestaurantName,setRestaurantID,setUserID,setRole,isAuthenticated } from '../reducers';

const PrivateRoute = ({ element: Element, role }) => {

    const dispatch = useDispatch();

    useEffect(() => {

        const check_accesstoken = async () => {

            const access_token = localStorage.getItem("access_token");
            const verify_access_token = await VerifyAccessToken(access_token)

            if (verify_access_token.status) {

                if (verify_access_token.data.role === "owner") {

                    const get_restaurant_id = await axios.get(process.env.REACT_APP_API_HOST +'/api/restaurants/owner/' + verify_access_token.data.id)

                    console.log(get_restaurant_id)

                    if (get_restaurant_id.data.status && get_restaurant_id.data.status === "success") {

                        dispatch(setRestaurantID(get_restaurant_id.data.data.restaurant_id))

                    }

                }
                dispatch(setUserID(verify_access_token.data.id))
                dispatch(setRole(verify_access_token.data.role))
                dispatch(isAuthenticated(true));

            }

        }

        check_accesstoken()

    }, [])


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
