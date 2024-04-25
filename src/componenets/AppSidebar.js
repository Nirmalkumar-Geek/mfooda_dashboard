import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CNavItem,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { setDisable } from "../reducers";
import routes from "../routes";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector(
    (state) => state.rootReducer.dashboard.sidebarShow
  );
  const role = useSelector((state) => state.rootReducer.profile.role);

  return (
    <CSidebar
      position="fixed"
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setDisable(visible));
      }}
    >
      {console.log("from side bar")}
      <CSidebarBrand className="d-none d-md-flex" to="/">
        Mfooda
      </CSidebarBrand>
      <CSidebarNav>
        {routes.map((values, index) => {
          if (values.role.includes(role)) {
            return (
              <SimpleBar key={index}>
                  <CNavItem component={Link} to={values.path} style={{ textDecoration: "none" }}>
                    <CIcon customClassName="nav-icon" icon={values.icon} />
                    {values.name}
                  </CNavItem>
                
              </SimpleBar>
            );
          }
          return ''
        })}
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
