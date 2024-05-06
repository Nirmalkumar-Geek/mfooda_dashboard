import { CCard, CCardBody, CContainer, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react"
import axios from "axios"
import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";

const Reviews = () =>{

    const [reviews,setReviews] = useState([])

    const profile = useSelector((state) => state.rootReducer.profile);

    const getReviews = async () =>{

        try{

            const result = await axios.get('https://api.selfmade.city/api/admin/orders/reviews/' + profile.restaurant_id)

            console.log(result)

            if(result.data && result.data.status === "success"){

                console.log(result.data.data)

                setReviews(result.data.data)

            }

        }catch(error){

            console.log(error)

        }

    }

    useEffect(()=>{

        getReviews()

    },[])

    return(
        <CContainer>
            <CCard>
                <CCardBody>
                    <CTable className="text-center">
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>order no</CTableHeaderCell>
                                <CTableHeaderCell>rating</CTableHeaderCell>
                                <CTableHeaderCell>comment</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {
                                reviews.length !== 0 && reviews.map((value, key) => {

                                    return (
                                        <CTableRow key={key}>
                                            <CTableDataCell>{value.order_id}</CTableDataCell>
                                            <CTableDataCell>{value.rating}</CTableDataCell>
                                            <CTableDataCell>{value.comment}</CTableDataCell>
                                        </CTableRow>
                                    )

                                })
                            }
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </CContainer>

    )



}

export default Reviews;