import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "components/Header/Header";
import "./Landing.css";
import Matter from "components/matter/Matter.js";
import { useNavigate } from "react-router-dom";
import Footer from 'components/footer/footer';

export default function Landing() {
    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const token = sessionStorage.getItem("accessToken");
                const response = await axios.get(`${serverAddress}/api/v1/problems`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProblems(response.data);
            } catch (error) {
                console.error("페치페일:", error);
            }
        };

        fetchProblems();
    }, []);

    const handleTryProblem = (_problem) => {
        sessionStorage.setItem("selectedProblem", JSON.stringify(_problem));
        console.log(_problem)
        navigate("/codespace");
    };

    return (
        <div className="container">
            <Header></Header>
            <div className="content">

                <div className="title">Problems</div>
                {problems.map((problem) => (
                    <Matter key={problem.id} problem={problem} onTryProblem={handleTryProblem} />
                ))}
                
                <Footer></Footer>
            </div>

        </div>
    );
}
