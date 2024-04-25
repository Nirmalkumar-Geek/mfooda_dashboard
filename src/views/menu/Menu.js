import React, { useState, useEffect } from "react";
import {
    CCardText, CCardImage, CFormInput, CForm, CContainer, CRow, CCol, CButton, CCard, CCardTitle, CCardBody, CCardFooter, CModal, CModalHeader, CModalBody, CModalFooter
} from "@coreui/react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setItems, removeItem, setItemName, setItemPrice, setItemImage } from "../../reducers";

const Menu = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.rootReducer.menu.items);
    const role = useSelector(state => state.rootReducer.profile.role);
    const restaurant_id = useSelector(state => state.rootReducer.profile.restaurant_id);
    const details = useSelector(state => state.rootReducer.menu);
    const [visible, setVisible] = useState(false);
    const [file,setFile] = useState(null)

    const getItems = async (store_id) => {
        try {
            const result = await axios.get("https://api.selfmade.city/api/menu/" + store_id);
            if (result.data && result.data.data) {
                dispatch(setItems(result.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async (item_id) => {
        try {
            console.log(item_id)
            const result = await axios.delete("https://api.selfmade.city/api/menu/" + item_id,);
            console.log(result)
            if (result.data) {
                dispatch(removeItem(item_id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        if(role === "owner"){

            getItems(restaurant_id);

        }
        


    }, [file]);


    const handleAddItem = async () => {
        try {

            let formData = new FormData();
            formData.append('name', details.item_name)
            formData.append('file', file)
            formData.append('price',details.item_price)
            formData.append('restaurant_id',restaurant_id)
            const result = await axios.post("https://api.selfmade.city/api/menu/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})

                if(result){
                    console.log(result)
                }

        } catch (error) {
            console.log(error);
        }
        dispatch(setItemName(""))
        dispatch(setItemPrice(""))
        setVisible(false)
        setFile(null);
    };

    return (
        <CContainer fluid>
            {console.log(details)}
            <CRow>
                <CCol className="col-12">
                    <CButton color="success" variant="outline" onClick={() => setVisible(true)}>ADD NEW ITEM</CButton>
                </CCol>
            </CRow>
            {items && Object.keys(items).length !== 0 && (
                <CRow className="mt-3">
                    {Object.keys(items).map((key) => {
                        const item = items[key];
                        return (
                            <CCol className="mt-5" key={key}>
                                <CCard style={{ width: '18rem' }}>
                                    <CCardImage style={{ width: '18rem', height: '200px' }} orientation="top" src={"https://api.selfmade.city" + item.img_path} />
                                    <CCardBody>
                                        <CCardTitle>{item.item_name}</CCardTitle>
                                        <CCardText>{item.price} RM</CCardText>
                                    </CCardBody>
                                    <CCardFooter>
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                            <CButton color="danger" onClick={() => deleteItem(key)}>Delete</CButton>
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
                        <CFormInput type="text" label="Item Name"  onChange={(e) => { dispatch(setItemName(e.target.value)) }} />
                        <CFormInput type="number" label="Price"  onChange={(e) => { dispatch(setItemPrice(e.target.value)) }} />
                        <CFormInput type="file" label="Item Image" name="file"  onChange={(e) => {
                            const file = e.target.files[0];
                            setFile(file)
                        }} />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
                    <CButton color="primary" onClick={handleAddItem}>Add</CButton>
                </CModalFooter>
            </CModal>
        </CContainer>
    );
};

export default Menu;
