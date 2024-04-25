import LazyDataComponent from './LazyComponent';
import AppHeader from './componenets/AppHeader';
import AppSidebar from './componenets/AppSidebar';
import './scss/style.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Spinner from './componenets/Spinner';
import { VerifyAccessToken } from './componenets/Authentication';
import { setUserID, setRole, isAuthenticated, setRestaurantID } from './reducers';
import axios from 'axios';

const Login = React.lazy(() => import('./views/login/Login'))
const Register = React.lazy(() => import('./views/register/Register'))
const Page404 = React.lazy(() => import('./views/page404/Page404'))
const DefaultLayout = React.lazy(() => import('./views/content/Default'))

function App() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.rootReducer.profile);

  useEffect(() => {

    const check_accesstoken = async () => {

      const access_token = localStorage.getItem("access_token");
      const verify_access_token = await VerifyAccessToken(access_token)
      
      if (verify_access_token.status) {

        if (verify_access_token.data.role === "owner") {

          const get_restaurant_id = await axios.get('https://api.selfmade.city/api/restaurants/owner/'+verify_access_token.data.id)

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

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route exact path="/login/*" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="*" name="Register Page" element={<DefaultLayout />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
