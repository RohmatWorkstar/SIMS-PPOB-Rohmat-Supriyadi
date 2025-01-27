import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ServiceDetail = () => {
    const { service_code } = useParams();
    // const [Detail, setDetail] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                const response = await API.get(`/transaction/${service_code}`, config);
                // console.log('testing',response.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return <div className="text-center font-bold">Service details for {service_code}</div>;
};

export default ServiceDetail;
