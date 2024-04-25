import React,{useEffect} from 'react';
import { VerifyAccessToken } from '../../componenets/Authentication';
import { setUserID, setRole, isAuthenticated, setRestaurantID } from '../../reducers';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

const ADashboard = () =>{

    const dispatch = useDispatch();
    const profile = useSelector((state) => state.rootReducer.profile);

    useEffect(() => {

        const check_accesstoken = async () => {

            const access_token = localStorage.getItem("access_token");
            const verify_access_token = await VerifyAccessToken(access_token)

            if (verify_access_token.status) {

                if (verify_access_token.data.role === "owner") {

                    const get_restaurant_id = await axios.get('https://api.selfmade.city/api/restaurants/owner/' + verify_access_token.data.id)

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


    return(

        <div>
            <h1>ADashboard</h1>
        </div>

    )


}

export default ADashboard;