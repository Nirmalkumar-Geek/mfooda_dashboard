import React, { useEffect } from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CLink,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import avator from "../profile.png";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../reducers";
import { Link, redirect } from "react-router-dom";

const AppHeaderDropdown = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.rootReducer.auth.isLoggedIn);
  useEffect(() => {

    const access_token = localStorage.getItem("access_token")
    const refresh_token = localStorage.getItem("refresh_token")

    if (!access_token) {

      window.location.href = '/login';

    }

  })
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avator} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Account
        </CDropdownHeader>
        <CDropdownItem component={Link} to="/profile" style={{ textDecoration: 'none' }} >
          <CIcon icon={cilUser} className="me-2" />
          profile
        </CDropdownItem>
        <CDropdownItem onClick={() => { localStorage.removeItem("access_token"); dispatch(isAuthenticated(false)); }}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
