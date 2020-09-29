import React, {useState} from "react";
import classes from "./HamburgerButton.module.css"
import UserInfoContainer from "./UserInfo/UserInfoContainer";
import Navbar from "./Navbar/Navbar";

const HamburgerButton = () =>{
    const [openMenu, setOpenMenu] = useState(false)
    return(
        <>
            <div
                onClick={()=>{setOpenMenu(!openMenu)}}
                className={`${classes.wrapper} ${openMenu?classes.open:''}`}
            >
                <div className={classes.btnBurger}></div>
            </div>
            {openMenu &&
            <div onClick={()=>{setOpenMenu(!openMenu)}} className={classes.menuInner}>
                <div className={classes.flex}>
                    <UserInfoContainer/>
                    <Navbar/>
                </div>
            </div>
            }
        </>
    )
}

export default HamburgerButton;
