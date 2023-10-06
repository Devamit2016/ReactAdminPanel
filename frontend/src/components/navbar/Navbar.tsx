import { Button } from "@mui/material";
import axiosClient from "../../axios";
import { useToken } from "../../contexts/ContextProvider";
import "./navbar.scss"
import { PowerSettingsNew } from "@mui/icons-material";

type Props = {
    user: string | null;
}




const Navbar = (props: Props) => {
    const { setUser, setToken } = useToken();
    const Logout = () => {
        axiosClient.post('/logout')
            .then(() => {
                setUser("");
                setToken("");
            })
    }


    return (
        <div className="navbar">
            <div className="logo">
                <img src="logo.svg" alt="  " />
                <span>reactTest</span>
            </div>
            <div className="icons">
                <img src="/search.svg" alt="" className="icon" />
                <img src="/app.svg" alt="" className="icon" />
                <img src="/expand.svg" alt="" className="icon" />
                <div className="notification">
                    <img src="/notifications.svg" alt="" />
                    <span>2</span>
                </div>
                <div className="user">
                    <img src="https://images.pexels.com/photos/18045813/pexels-photo-18045813/free-photo-of-close-up-of-a-car-logo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <span>{props.user}</span>
                    <Button onClick={() => {
                        Logout();
                    }}><PowerSettingsNew /></Button>
                </div>
                <img src="/settings.svg" alt="" className="icon" />
            </div>

        </div>
    )
}

export default Navbar
