import AppContent from "../../componenets/AppContent";
import AppHeader from "../../componenets/AppHeader";
import AppSidebar from "../../componenets/AppSidebar";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DefaultLayout = () => {
    useEffect(() => {

        console.log("from default ")

    });

    const isLoggedIn = useSelector((state) => state.rootReducer.auth.isLoggedIn);

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <AppSidebar />
                    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                        <AppHeader />
                        <div className="body flex-grow-1 px-3">
                            <AppContent />
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to="/login" replace/>
            )}
        </div>
    );
};

export default DefaultLayout;
