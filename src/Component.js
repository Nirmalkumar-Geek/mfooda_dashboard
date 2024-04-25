import React from 'react';
import { CContainer, CRow, CCol, CButton } from '@coreui/react';

const MyComponent = () => {
    return (
        <CContainer>
            <CRow className="justify-content-center">
                <CCol md="6">
                    <CButton color="primary">Primary Button</CButton>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default MyComponent;
