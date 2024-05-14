import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CContainer, CNavItem, CNavLink, CNavbar, CNavbarNav, CRow } from "@coreui/react";
import Spinner from "../../componenets/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setOrders, selectOrder } from '../../reducers';
import './orders.css'
import axios from 'axios';

const Orders = () => {

    const dispatch = useDispatch();
    const orders = useSelector((state) => state.rootReducer.orders.orders);
    const selected_order = useSelector((state) => state.rootReducer.orders.selected_order);
    const profile = useSelector((state) => state.rootReducer.profile);
    const [update,setUpdate] = useState(false)

    const getOrders = async () => {

        try{

            const result = await axios.get(process.env.REACT_APP_API_HOST+'/api/admin/orders/' + profile.restaurant_id)


            if (result.data && result.data.data) {

                dispatch(setOrders(result.data.data))

            }

        }catch(error){


            console.log(error)

        }

    }


    const updateStatus = async (order_id) =>{

        const payload = { "order_id": order_id }
        const result = await axios.put(process.env.REACT_APP_API_HOST+'/api/orders/', payload)

        setUpdate(!update)
        if (result.data && result.data.data) {

            dispatch(setOrders(result.data.data))

        }


    }

    useEffect(()=>{

        const pollingInterval = setInterval(getOrders, 5000);

        return () => clearInterval(pollingInterval);

    },[])

    useEffect(()=>{

        getOrders()

        return () => {

            dispatch(setOrders({}));
            dispatch(selectOrder(null));

         }

    },[update])

    return (
        <CContainer fluid>
            {console.log("selected order", selected_order)}
            <CRow>
                {console.log(profile)}
                <CCol className='col-md-4 col-12 mt-3'>
                    
                    <CCard >
                            <CCardHeader>
                                <CCardText>
                                    Orders
                                </CCardText>
                            </CCardHeader>  
                        <div style={{ maxHeight: 'calc(90vh - 70px)', overflowY: 'auto' }}>
                            <CCardBody style={{ 'height': '70vh' }}>
                            
                                {
                                    Object.keys(orders).length !== 0 && Object.keys(orders).map((key)=>{

                                        return(
                                            <CRow key={key} >
                                                <CCol className='col-12 mt-1 mb-3'>
                                                    <CAlert color={selected_order === key ? "danger" : "success"} onClick={() => { dispatch(selectOrder(key))}}>
                                                        <CRow>
                                                            <CCol className='col-12'>
                                                                <CCardText>Order #{key}</CCardText>
                                                                <span>{orders[key].created_at}</span>
                                                            </CCol>
                                                        </CRow>
                                                    </CAlert>
                                                </CCol>
                                            </CRow>
                                        )

                                    })
                                }
                                
                            </CCardBody>
                        </div>
                    </CCard>
                    
                </CCol>
                <CCol className='col-md-8 col-12  mb-5 mt-3'>
                    
                    <CCard>
                        <CCardHeader>
                            <CCardText>Order Detail</CCardText>
                        </CCardHeader>
                        <div style={{ maxHeight: 'calc(90vh - 70px)', overflowY: 'auto' }}>
                            <CCardBody style={{ 'height': '70vh' }}>
                                {console.log(selected_order)}
                                {
                                    
                                    selected_order ? 
                                        (
                                            <div>
                                                {console.log(orders[selected_order])}
                                                <div id='order-group-1'>
                                                    <div id='order-title'>Order #{selected_order}</div>
                                                    <span id='order-item'>{orders[selected_order].created_at}</span>
                                                    <div id='order-title'>Name : {orders[selected_order].username}</div>
                                                    <div id='order-title'>Phone Number : {orders[selected_order].phone_number}</div>
                                                </div >
                                                <div id='order-group-2' className='mt-3'>
                                                    <div id='order-title' className='mt-2'>Delivery Address</div>
                                                    <span id='order-item'>{orders[selected_order].address}</span>
                                                </div>
                                                <div id='order-group-3' className='mt-3'>
                                                    <div id='order-title' className='mt-2'>Order Menu</div>
                                                    <CContainer>
                                                        {
                                                            orders[selected_order].line_items.map((values,key)=>{
                                                                console.log(values)
                                                                return(
                                                                    <CRow className='mt-2' key={key}>
                                                                        <CCol className='col-6'>{values.name}</CCol>
                                                                        <CCol className='col-6'>x {values.quantity}</CCol>
                                                                    </CRow>
                                                                )
                                                            })
                                                        }
                                                        
                                                        {/*<CRow className='mt-2'>
                                                            <CCol className='col-6' id='order-total'>Total</CCol>
                                                            <CCol className='col-6' id='order-total'>RM 5.59</CCol>
                                                    </CRow>*/}
                                                    </CContainer>
                                                </div>
                                                <div className='mt-5 text-center'>
                                                    {
                                                        (()=>{
                                                            switch (orders[selected_order].order_status){

                                                                case 'created':
                                                                    return (<CButton color='success m-3' variant="outline" onClick={() => { updateStatus(selected_order) }}>Accept Order</CButton>)
                                                                case 'accepted':
                                                                    return (<CButton color='warning m-3' variant="outline" onClick={() => { updateStatus(selected_order) }}>Out For Deliver</CButton>)
                                                                case 'outfordeliver':
                                                                    return (<CButton color='info m-3' variant="outline" onClick={() => { updateStatus(selected_order) }}>Mark as Delivered</CButton>)

                                                            }
                                                        })()
                                                    }
                                                </div>
                                            </div>
                                        ):(
                                            <div>
                                                Please pick order
                                            </div>
                                        )
                                    
                                }
                            </CCardBody>
                        </div>
                    </CCard>
                    
                </CCol>
            </CRow>
        </CContainer>
    );
}

export default Orders;
