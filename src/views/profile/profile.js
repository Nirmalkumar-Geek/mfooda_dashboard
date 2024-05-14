import { CContainer, CRow, CCol, CCard, CFormInput, CCardHeader, CCardBody, CCardTitle, CCardFooter, CButton } from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Spinner from '../../componenets/Spinner';
import axios from 'axios';
import { setUserName, setPhoneNumber, setEmailAddress, setAddress } from "../../reducers";

const Profile = () => {

    const dispatch = useDispatch();
    const profile = useSelector(state => state.rootReducer.profile);
    const user_id = useSelector(state => state.rootReducer.profile.user_id);
    const username = useSelector(state => state.rootReducer.profile.username);
    const email = useSelector(state => state.rootReducer.profile.email);
    const phone_number = useSelector(state => state.rootReducer.profile.phone_number);
    const address = useSelector(state => state.rootReducer.profile.address);
    const [loader, setLoader] = useState(false)

    const getProfile = async (id) => {
        try {
            const result = await axios.get(process.env.REACT_APP_API_HOST+"/api/admin/profile/" + id);
            if (result.data && result.data.data) {

                dispatch(setUserName(result.data.data.username))
                dispatch(setEmailAddress(result.data.data.email))
                dispatch(setPhoneNumber(result.data.data.phone_number))
                dispatch(setAddress(""))

            }
        } catch (error) {
            console.log(error);
        }

        setLoader(true)
    }

    useEffect(() => {

        getProfile(user_id)

    })

    return (

        <CContainer>
            {console.log(profile)}
            {loader ? (

                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                Profile
                            </CCardHeader>
                            <CCardBody>
                                <CCardTitle>Name</CCardTitle>
                                <CFormInput disabled placeholder={username} />
                                <CCardTitle>Email</CCardTitle>
                                <CFormInput disabled placeholder={email} />
                                <CCardTitle>Phone Number</CCardTitle>
                                <CFormInput disabled placeholder={phone_number} />
                            </CCardBody>
                            <CCardFooter className='text-center'>
                                
                            </CCardFooter>
                        </CCard>
                    </CCol>
                </CRow>

            ) : (
                <Spinner />
            )}
        </CContainer>

    )


}

export default Profile;