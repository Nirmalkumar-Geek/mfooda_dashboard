import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import Spinner from './Spinner'
import PrivateRoute from './PrivateRoute'

const AppContent = () => {
    useEffect(() => {

        console.log("from content")

    })
    return (
        <CContainer lg>
            <Suspense fallback={<Spinner />}>
                <Routes>
                    {routes.map((route, idx) => {
                        return (
                            route.element && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    element={<PrivateRoute element={route.element} role={route.role} />}
                                />
                            )
                        )
                    })}
                    {/*<Route path="/" element={<Navigate to="menu" replace />} />*/}
                </Routes>
            </Suspense>
        </CContainer>
    )
}

export default React.memo(AppContent)
