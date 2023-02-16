import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {Dashboard,Activity,Positions,Funds,Derivative,Order,Holding} from "../pages"

function Router(){

    return(
        <>
    <Routes>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Derivative" element={<Derivative/>}/>
        <Route path="/Orders" element={<Order/>}/>
        <Route path="/Holding" element={<Holding/>}/>
        <Route path="/Positions" element={<Positions/>}/>
        <Route path="/Funds" element={<Funds/>}/>
        <Route path="/Activity" element={<Activity/>}/>
        <Route path="*" element={<Navigate to="/Dashboard" />}/>
    </Routes>
    </>
        )

}

export default Router;