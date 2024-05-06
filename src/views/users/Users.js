import {
  CContainer,
  CButton,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CForm,
  CFormInput,
  CModalFooter,
} from "@coreui/react";
import { MdDeleteOutline } from "react-icons/md";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAllUsers, setAdminPhoneNumber, setAdminPassword, setAdminEmail, setAdminUserName, setAdminConfirmPassword, setPhoneNumber } from "../../reducers";

const Users = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const [errMessage,setErrMessage] = useState("");
  const users = useSelector((state) => state.rootReducer.users.all_users);
  const username = useSelector((state) => state.rootReducer.users.username);
  const email = useSelector((state) => state.rootReducer.users.email);
  const password = useSelector((state) => state.rootReducer.users.password);
  const confirmpassword = useSelector((state) => state.rootReducer.users.confirmpassword);
  const phone_number = useSelector((state) => state.rootReducer.users.phone_number);
  const payload = useSelector((state) => state.rootReducer.users);

  const getAllUsers = async () => {
    try {
      const result = await axios.get(
        "https://api.selfmade.city/api/admin/users"
      );

      if (result.data) {
        dispatch(setAllUsers(result.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (user_id) =>{

    try{

    
      const result = await axios.delete("https://api.selfmade.city/api/admin/users/" + user_id);
      console.log(result.data)
      if (result.data) {

        console.log(result.data)
        getAllUsers()

      }


    }catch(error){

      console.log(error)

    }

  }

  const handleAddUser = async () => {

    try {

      const details = {
        "username": username,
        "email": email,
        "role": "admin",
        "phone_number": phone_number,
        "password": password,
        "confirmpassword": confirmpassword,
      }
      const result = await axios.post("https://api.selfmade.city/api/auth/admins/registration", details);

      if (result.data) {

        console.log(result.data)
        getAllUsers()
        
      }
    } catch (error) {
      console.log(error);
    }

    setVisible(false)

  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <CContainer>
      {console.log(payload)}
      <CRow>
        <CCol className="col-12">
          <CButton color="success" variant="outline" onClick={() => setVisible(true)}>
            ADD NEW USER
          </CButton>
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol className="mt-2">
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">USERNAME</CTableHeaderCell>
                <CTableHeaderCell scope="col">EMAIL</CTableHeaderCell>
                <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users &&
                Object.keys(users).length !== 0 &&
                Object.keys(users).map((key) => {
                  const user = users[key];

                  return (
                    <CTableRow key={key}>
                      <CTableHeaderCell scope="row">{key}</CTableHeaderCell>
                      <CTableDataCell>{user.username}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>{user.role}</CTableDataCell>
                      <CTableDataCell ><MdDeleteOutline size={20} color="red" onClick={()=>{deleteUser(user.id)}}/></CTableDataCell>
                    </CTableRow>
                  );

                })}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
      <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="LiveDemoExampleLabel">
        <CModalHeader onClose={() => setVisible(false)}></CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput type="text" label="username" onChange={(e) => { dispatch(setAdminUserName(e.target.value)) }} />
            <CFormInput type="email" label="Email" onChange={(e) => { dispatch(setAdminEmail(e.target.value)) }} />
            <CFormInput type="tel" label="Phone Number" onChange={(e) => { dispatch(setAdminPhoneNumber(e.target.value)) }} />
            <CFormInput type="password" label="password" onChange={(e) => { dispatch(setAdminPassword(e.target.value)) }} />
            <CFormInput type="password" label="confirm password" onChange={(e) => { dispatch(setAdminConfirmPassword(e.target.value)) }} />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
          <CButton color="primary" onClick={handleAddUser}>Add</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default Users;
