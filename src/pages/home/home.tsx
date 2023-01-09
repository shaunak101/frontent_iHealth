import { useNavigate } from "react-router-dom";
import { setAlertEnabled } from "../../components/alertComponent";
import { getFromLocalStorage } from "../../global/localStorage";
import DoctorHome from "./doctor/doctorHome";
import UserHome from "./users/userHome";

function Home(){
    let userData = JSON.parse(JSON.parse(getFromLocalStorage("userData")));
    let navigator = useNavigate();

    if(userData !== "error"){
        if(userData.type == "Doctor"){
            return (<DoctorHome></DoctorHome>);
        } else{
            return (<UserHome></UserHome>)
        }
    } else{
        navigator("/register");
        setAlertEnabled(true, false, "acount doesn't exist");
        return (<div></div>)
    }
}

export default Home;
