
import Home from "./Home"
import Navbar from "./Navbar"
import ShimmerUI from "./ShimmerUI"
import {ThemeController} from "./utils/ThemeController"
import { Outlet } from "react-router-dom"

function App(){
  return (
    
    <ThemeController>
      <Navbar/>
      <Outlet></Outlet>
    </ThemeController>
    /* <ShimmerUI/> */
    
  )
}

export default App