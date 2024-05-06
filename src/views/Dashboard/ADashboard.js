import React, { useEffect,useState } from 'react';
import { VerifyAccessToken } from '../../componenets/Authentication';
import { setUserID, setRole, isAuthenticated, setRestaurantID } from '../../reducers';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { CContainer, CRow, CCol, CCard, CCardBody, CCardText } from '@coreui/react';
import { FaUsers } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FaCartArrowDown } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";


const ADashboard = () => {

    const dispatch = useDispatch();
    const profile = useSelector((state) => state.rootReducer.profile);
    const [dashboard,setDashboard] = useState({})

    const getDashboard = async () =>{


        try{

            if(profile.role === "admin"){

                const result = await axios.get('https://api.selfmade.city/api/admin/dashboard/' + profile.role)

                if (result.data && result.data.status === "success") {

                    console.log(result.data)
                    setDashboard(result.data.data)

                } else {

                    console.log(result)

                }

            } else if (profile.role === "owner"){

                const result = await axios.get('https://api.selfmade.city/api/admin/dashboard/' + profile.role+'/'+profile.restaurant_id)

                if (result.data && result.data.status === "success") {

                    console.log(result.data)
                    setDashboard(result.data.data)

                } else {

                    console.log(result)

                }

            }


        }catch(error){

            console.log(error)

        }


    }

    useEffect(() => {

        getDashboard()

    }, [])


    return (

        <CContainer fluid className='px-4'>
            {
                (()=>{

                    switch(profile.role){

                        case 'admin':
                            return (
                                Object.keys(dashboard).length === 4 && (
                                    <CRow className='g-3 my-2'>
                                        <CCol className='col-md-3  text-center'>
                                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                                <div>
                                                    <h3 className="fs-2">{dashboard.admins_count}</h3>
                                                    <p className="fs-5">Admins</p>
                                                </div>
                                                <RiAdminFill
                                                    className="fs-1 primary-text p-3"
                                                    size={80}
                                                />
                                            </div>
                                        </CCol>
                                        <CCol className='col-md-3  text-center'>
                                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                                <div>
                                                    <h3 className="fs-2">{dashboard.restaurant_count}</h3>
                                                    <p className="fs-5">Restaurants</p>
                                                </div>
                                                <BsShop size={80} className="fs-1 primary-text p-3" />
                                            </div>
                                        </CCol>
                                        <CCol className='col-md-3  text-center'>
                                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                                <div>
                                                    <h3 className="fs-2">{dashboard.customer_count}</h3>
                                                    <p className="fs-5">Users</p>
                                                </div>
                                                <FaUsers size={80} className="fs-1 primary-text p-3" />
                                            </div>
                                        </CCol>
                                        <CCol className='col-md-3  text-center'>
                                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                                <div>
                                                    <h3 className="fs-2">{dashboard.orders_count}</h3>
                                                    <p className="fs-5">Orders</p>
                                                </div>
                                                <BsFillCartCheckFill size={80} className="fs-1 primary-text p-3" />
                                            </div>
                                        </CCol>
                                    </CRow>
                                )
                            )
                        case 'owner':
                            return(

                                <CRow className='g-3 my-2'>
                                    <CCol className='col-md-3  text-center'>
                                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                            <div>
                                                <h3 className="fs-2">{dashboard.orders_count}</h3>
                                                <p className="fs-5">Orders</p>
                                            </div>
                                            <FaCartArrowDown size={90} className="fs-1 primary-text p-3" />
                                        </div>
                                    </CCol>
                                    <CCol className='col-md-3  text-center'>
                                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                            <div>
                                                <h3 className="fs-2">{dashboard.delivered_count}</h3>
                                                <p className="fs-5">Delivered </p>
                                            </div>
                                            <BsFillCartCheckFill size={90} className="fs-1 primary-text p-3" />
                                        </div>
                                    </CCol>
                                    <CCol className='col-md-3  text-center'>
                                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                            <div>
                                                <h3 className="fs-2">{dashboard.rating}</h3>
                                                <p className="fs-5">Rating</p>
                                            </div>
                                            <FaStar size={90} className="fs-1 primary-text p-3" />
                                        </div>
                                    </CCol>
                                    <CCol className='col-md-3  text-center'>
                                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                            <div>
                                                <h3 className="fs-2">{dashboard.revenue}</h3>
                                                <p className="fs-5">Ravenue</p>
                                            </div>
                                            <FaChartLine size={90} className="fs-1 primary-text p-3" />
                                        </div>
                                    </CCol>
                                </CRow>

                            )

                    }

                })()
            }
        </CContainer>

    )


}

export default ADashboard;