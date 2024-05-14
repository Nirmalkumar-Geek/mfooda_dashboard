import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser, cilWarning } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  isAuthenticated,
  setEmail,
  setPassword,
  setUserID,
  setRole,
} from "../../reducers";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { VerifyAccessToken } from "../../componenets/Authentication";
import { Navigate,Route,Routes } from "react-router-dom";


const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.rootReducer.auth.isLoggedIn);
  const email = useSelector((state) => state.rootReducer.auth.email);
  const password = useSelector((state) => state.rootReducer.auth.password);
  const profile = useSelector((state) => state.rootReducer.auth);
  const [alert, setAlert] = useState(false);
  const [update, setUpdate] = useState(false);
  
  useEffect(() => {
    
    const check_token = async () =>{
      const access_token = localStorage.getItem("access_token");
      const verify_access_token = await VerifyAccessToken(access_token);
      if (verify_access_token.status) {
        dispatch(setUserID(verify_access_token.data.id));
        dispatch(setRole(verify_access_token.data.role));
        dispatch(isAuthenticated(true));
      }
    }

    check_token()
  }, [update,dispatch]);

  const submitLoginForm = async () => {
    try {
      const user_details = {
        email: email,
        password: password,
      };

      const result = await axios.post(
        process.env.REACT_APP_API_HOST+"/api/auth/admins/signin",
        user_details
      );

      if (result.status === 201 && result.data.status === "success") {
        const decoded_data = jwtDecode(result.data.access_token);

        if (decoded_data.data.role === "admin" || decoded_data.data.role === "owner") {
          
          localStorage.setItem("access_token", result.data.access_token);

          const verify_access_token = await VerifyAccessToken(result.data.access_token);
          if (verify_access_token.status) {
            dispatch(setUserID(verify_access_token.data.id));
            dispatch(setRole(verify_access_token.data.role));
            setUpdate(!update);
          }
        } else {
          setAlert(true);
        }
      }
    } catch (error) {

      if (error.response) {
        console.error("API error response:", error.response.data);
      }

      setAlert(true);
      setUpdate(!update);
    }
  };


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6}>
              <CCardGroup>
                <CCard className="p-4">
                  {alert && (
                    <CAlert
                      color="warning"
                      className="d-flex align-items-center"
                    >
                      <CIcon
                        icon={cilWarning}
                        className="flex-shrink-0 me-2"
                        width={24}
                        height={24}
                      />
                      <div>
                        There was a problem logging in. Check your email and
                        password or create an account.
                      </div>
                    </CAlert>
                  )}
                  <CCardBody>
                    <CForm>

                      <h1>Login</h1>
                      <p className="text-medium-emphasis">
                        Sign In to your account
                      </p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          autoComplete="email"
                          onChange={(event) => {
                            dispatch(setEmail(event.target.value));
                            setAlert(false);
                          }}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={(event) => {
                            dispatch(setPassword(event.target.value));
                            setAlert(false);
                          }}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            color="primary"
                            className="px-4"
                              onClick={() => { submitLoginForm()}}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </div>
  );
};

export default Login;
