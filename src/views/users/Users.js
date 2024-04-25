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
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAllUsers, setRoleFilter, setAdminRole, setAdminPassword, setAdminEmail, setAdminUserName, setAdminConfirmPassword } from "../../reducers";

const Users = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const users = useSelector((state) => state.rootReducer.users.all_users);
  const username = useSelector((state) => state.rootReducer.users.username);
  const email = useSelector((state) => state.rootReducer.users.email);
  const password = useSelector((state) => state.rootReducer.users.password);
  const confirmpassword = useSelector((state) => state.rootReducer.users.confirmpassword);
  const role = useSelector((state) => state.rootReducer.users.role);
  const role_filter = useSelector(
    (state) => state.rootReducer.users.role_filter
  );

  const getAllUsers = async () => {
    try {
      const result = await axios.get(
        "https://api.selfmade.city/api/auth/users"
      );

      if (result.data) {
        dispatch(setAllUsers(result.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {

    try {

      const details = {
        "username": username,
        "email": email,
        "password": password,
        "confirmpassword": confirmpassword,
        "role": role
      }
      const result = await axios.post("https://api.selfmade.city/api/auth/admins/registration", details);

      if (result.data) {

        console.log(result.data)
        getAllUsers()
        setVisible(false)
      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getAllUsers();
  }, [role_filter]);

  return (
    <CContainer>
      {console.log(role_filter)}
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
                <CTableHeaderCell scope="col">
                  <CFormSelect aria-label={role_filter} value={role_filter} onChange={(e) => { dispatch(setRoleFilter(e.target.value)) }}>
                    <option value="all">ALL</option>
                    <option value="admin">ADMIN</option>
                    <option value="owner">OWNER</option>
                    <option value="customer">CUSTOMER</option>
                  </CFormSelect>
                </CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users &&
                Object.keys(users).length !== 0 &&
                Object.keys(users).map((key) => {
                  const user = users[key];

                  if (role_filter === 'all') {

                    return (
                      <CTableRow key={key}>
                        <CTableHeaderCell scope="row">{key}</CTableHeaderCell>
                        <CTableDataCell>{user.username}</CTableDataCell>
                        <CTableDataCell>{user.email}</CTableDataCell>
                        <CTableDataCell>{user.role}</CTableDataCell>
                        <CTableDataCell>
                          <CButton>EDIT</CButton>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton color="danger">DELETE</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    );

                  } else if (role_filter === user.role) {

                    return (
                      <CTableRow key={key}>
                        <CTableHeaderCell scope="row">{key}</CTableHeaderCell>
                        <CTableDataCell>{user.username}</CTableDataCell>
                        <CTableDataCell>{user.email}</CTableDataCell>
                        <CTableDataCell>{user.role}</CTableDataCell>
                        <CTableDataCell>
                          <CButton>EDIT</CButton>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton color="danger">DELETE</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    );

                  }

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
            <CFormInput type="password" label="password" onChange={(e) => { dispatch(setAdminPassword(e.target.value)) }} />
            <CFormInput type="password" label="confirm password" onChange={(e) => { dispatch(setAdminConfirmPassword(e.target.value)) }} />
            <CFormSelect label="owner" aria-label="Default select example" onChange={(e) => { dispatch(setAdminRole(e.target.value)) }}>
              <option>Open this select menu</option>
              <option value="owner">owner</option>
              <option value="admin">admin</option>
            </CFormSelect>
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
