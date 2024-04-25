import React, { useState, useEffect } from 'react';
import axios from "axios";
import { CSpinner, CButton, CContainer } from '@coreui/react';
import Spinner from './componenets/Spinner';
const LazyDataComponent = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const result = await axios.get("https://api.selfmade.city/api/menu/11");
            //setData(result.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        fetchData(); // Call the async function

    }, []);

    return (
        <div>
            {Object.keys(data).length !== 0 ? (

                Object.entries(data).map(([key, value]) => {
                    return <h1 key={key}>{key}</h1>
                })

            ) : (
                <Spinner />
            )}

        </div>
    );
};

export default LazyDataComponent;
