import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Menu from "../menu/Menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "../footer/Footer";
import { useToken } from "../../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../axios";



function DefaultLayout() {
    const queryclient = new QueryClient;
    const { user, token, setToken, setUser } = useToken();

    if (!token) {
        return <Navigate to="/" />
    }
    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data.data.name)
            })
    }, [])

    return (
        <div className="main" >
            <Navbar user={user} />
            <div className="container">
                <div className="menuContainer">
                    <Menu />
                </div>
                <div className="contentContainer">
                    <QueryClientProvider client={queryclient}>
                        <Outlet />
                    </QueryClientProvider>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default DefaultLayout;
