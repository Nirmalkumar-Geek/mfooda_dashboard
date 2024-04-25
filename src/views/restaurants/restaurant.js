import React, { useState, useEffect, useRef } from "react";
import { CToaster, CFormSelect, CToastBody, CToastHeader, CToast, CCardText, CCardImage, CFormInput, CForm, CContainer, CRow, CCol, CButton, CCard, CCardTitle, CCardBody, CCardFooter, CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { resetForm,setRestaurants, setRestaurantName, setDescription, setResPhoneNumber, setResUserName, setResEmail, setResPassword, setConfirmPassword } from "../../reducers";
import CIcon from "@coreui/icons-react";
import { cilStar } from '@coreui/icons'
import OptimizedImage from "../../componenets/OptimizedImage";

const Restaurant = () => {
    const [visible, setVisible] = useState(false);
    const [file, setFile] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [toast, addToast] = useState(0);
    const toaster = useRef()

    const dispatch = useDispatch();
    const restaurants = useSelector(state => state.rootReducer.restaurant.restaurants);
    const restaurant_name = useSelector(state => state.rootReducer.restaurant.restaurant_name);
    const description = useSelector(state => state.rootReducer.restaurant.description);
    const phone_number = useSelector(state => state.rootReducer.restaurant.phone_number);
    const username = useSelector(state => state.rootReducer.restaurant.username);
    const email = useSelector(state => state.rootReducer.restaurant.email);
    const password = useSelector(state => state.rootReducer.restaurant.password);
    const details = useSelector(state => state.rootReducer.restaurant);


    useEffect(() => {
        getRestaurants();
    }, [file, visible, toast]);

    const successToast = (
        <CToast>
            <CToastHeader closeButton>
                <svg
                    className="rounded me-2"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                >
                    <rect width="100%" height="100%" fill="#007aff"></rect>
                </svg>
                <div className="fw-bold me-auto">Mfooda</div>
                <small>1 sec ago</small>
            </CToastHeader>
            <CToastBody>Restaurant Successfully Dleted</CToastBody>
        </CToast>
    )

    const getRestaurants = async () => {
        try {
            const result = await axios.get("https://api.selfmade.city/api/restaurants/");
            console.log("get result")
            console.log(result)
            if (result.data) {
                dispatch(setRestaurants(result.data.data));
            }
            console.log(restaurants)
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };



    const handleAddItem = async () => {

        try {
            let formData = new FormData();
            formData.append('restaurant_name', restaurant_name)
            formData.append('file', file)
            formData.append('description', description)
            formData.append('phone_number', phone_number)
            formData.append('username', username)
            formData.append('email', email)
            formData.append('password', password)
            const result = await axios.post("https://api.selfmade.city/api/restaurants/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (result.data && result.data.data) {

                console.log(result.data)
                

            }
            

        } catch (error) {
            console.error("Error fetching restaurants:", error);
            setVisible(false)
        }
        dispatch(resetForm())
        setFile('')
        setVisible(false)

    }

    const deleteRestaurant = async (id) => {
        try {
            const result = await axios.delete("https://api.selfmade.city/api/restaurants/" + id);
            console.log(result)
            if (result.data.status === "success") {
                addToast(successToast)
            }
        } catch (error) {
            console.log(error);

        }
    }




    return (
        <CContainer>
            {console.log(details)}
            <CRow>
                <CCol className="col-12">
                    <CButton color="success" variant="outline" onClick={() => { setVisible(true);  }}>ADD NEW RESTAURANT</CButton>
                </CCol>
            </CRow>
            {restaurants && Object.keys(restaurants).length !== 0 && (
                <CRow className="mt-3">
                    {Object.keys(restaurants).map((key) => {
                        const restaurant = restaurants[key];
                        return (
                            <CCol key={key} className="mt-5">
                                
                                <CCard style={{ width: '18rem' }}>
                                               
                                    <OptimizedImage src={"https://api.selfmade.city" + restaurant.banner_path} />
                                        
                                        <CCardBody >
                                            <CCardTitle>{restaurant.name}</CCardTitle>
                                            <CCardText style={{ height: '60px' }}>
                                                {restaurant.description}
                                            </CCardText>
                                            <CCardText>
                                                <CIcon
                                                    icon={cilStar}
                                                    className="text-warning"
                                                    size="xxl"
                                                    style={{ marginRight: "10px", fontSize: "25px", verticalAlign: "middle" }}
                                                />
                                                <span style={{ fontSize: "25px", verticalAlign: "middle" }}>{restaurant.rating}</span>
                                            </CCardText>

                                        </CCardBody>
                                        <CCardFooter>
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                                
                                                <CButton color="danger" onClick={() => { deleteRestaurant(key) }}>Delete</CButton>
                                            </div>
                                        </CCardFooter>
                                    </CCard>
                                

                            </CCol>
                        );
                    })}
                </CRow>
            )}

            <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="LiveDemoExampleLabel">
                <CModalHeader onClose={() => setVisible(false)}></CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormInput type="text" label="Restaurant Name" onChange={(e) => { dispatch(setRestaurantName(e.target.value)) }} />
                        <CFormInput type="text" label="Restaurant Description" onChange={(e) => { dispatch(setDescription(e.target.value)) }} />
                        <CFormInput type="tel" label="Phone Number" onChange={(e) => { dispatch(setResPhoneNumber(e.target.value)) }} />
                        <CFormInput type="text" label="User Name" onChange={(e) => { dispatch(setResUserName(e.target.value)) }} />
                        <CFormInput type="email" label="Email" onChange={(e) => { dispatch(setResEmail(e.target.value)) }} />
                        <CFormInput type="password" label="Password" onChange={(e) => { dispatch(setResPassword(e.target.value)) }} />
                        <CFormInput type="password" label="Confirm Password" onChange={(e) => { dispatch(setConfirmPassword(e.target.value)) }} />
                        <CFormInput type="file" label="Banner" onChange={(e) => {
                            const file = e.target.files[0];
                            setFile(file)
                        }} />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => { setVisible(false); dispatch(resetForm())}}>Close</CButton>
                    <CButton color="primary" onClick={handleAddItem}>Add</CButton>
                </CModalFooter>
            </CModal>

            <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
        </CContainer>
    );
};

export default Restaurant;
