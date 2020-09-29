import React, {useEffect, useState} from 'react';
import './App.css';
import Info from "./components/MainPage/Info/Info";
import MainText from "./components/MainPage/MainTitle/MainText";
import Advantages from "./components/MainPage/Advantages/Advantages";
import ForRealtors from "./components/MainPage/ForRealtors/ForRealtors";
import ForAppraisers from "./components/MainPage/ForAppraisers/ForAppraisers";
import Footer from "./components/Footer/Footer";
import {Route} from "react-router-dom";
import Login from "./components/LoginPage/Login";
import Header from "./components/Header/Header";
import Registration from "./components/RegistrationPage/Registration";
import {connect} from "react-redux";
import {getAuthUserData} from "./redux/auth-reducer";
import Tariffs from "./components/TariffsPage/Tariffs";
import FindProperty from "./components/FindProperty/FindProperty";
import PrivateOffice from "./components/PrivateOffice/PrivateOffice";
import PropertyPageContainer from "./components/PropertyPage/PropertyPageContainer";
import Politica from "./components/Politica/Politica";
import SuccessPage from "./components/PayPages/SuccessPage/SuccessPage";
import FailPage from "./components/PayPages/FailPage/FailPage";
import Agreement from "./components/Agreement/Agreement";
import YandexMapContainer from "./components/YandexMap/YandexMapContainer";
import PropertyForClient from "./components/PropertyForClient/PropertyForClient";
import PropertyClientPageContainer from "./components/PropertyForClient/PropertyClientPage/PropertyClientPageContainer";

function App(props) {
    const [isMobile, setIsModile] = useState(false)

    useEffect(()=>{
        props.getAuthUserData();
        window.addEventListener("resize", resize)
        resize()
    },[])

    const resize = () =>{
        setIsModile(window.innerWidth <= 670)
    }

    return (
        <div className="app">
            <Header/>
            <Route exact path='/' render={() => <div>
                <Info></Info>
                <Advantages></Advantages>
                <MainText text={"для риелторов"} scrollPathId={"forRealtors"}></MainText>
                <ForRealtors isMobile></ForRealtors>
                <MainText text={"для оценщиков"} scrollPathId={"forAppraisers"}></MainText>
                <ForAppraisers isMobile></ForAppraisers>
            </div>}/>

            <Route path='/login' render={() =>
                <div className='content'><Login/></div>
            }/>
            <Route path='/registration' render={() =>
                <div className='content'><Registration/></div>
            }/>
            <Route path='/tariffs' render={() =>
                <div className='content'><Tariffs/></div>
            }/>
            <Route path='/find_property' render={() =>
                <div className='contentForStaticEl'><FindProperty/></div>
            }/>

            <Route path='/property_for_client/:idLink?' render={() =>
                <div className='content'><PropertyForClient/></div>
            }/>

            <Route path='/office' render={() =>
                <div className='content'><PrivateOffice/></div>
            }/>
            <Route path='/propertyPage/:propertyId?' render={() =>
                <div className='content'><PropertyPageContainer/></div>
            }/>
            <Route path='/propertyClientPage/:propertyId?' render={() =>
                <div className='content'><PropertyClientPageContainer/></div>
            }/>
            <Route path='/politic' render={() =>
                <div className='content'><Politica/></div>
            }/>
            <Route path='/agreement' render={() =>
                <div className='content'><Agreement/></div>
            }/>

            <Route path='/pay_success' render={() =>
                <div className='content'><SuccessPage/></div>
            }/>
            <Route path='/pay_fail' render={() =>
                <div className='content'><FailPage/></div>
            }/>

            <Route path='/map' render={() =>
                <div className='content'><YandexMapContainer/></div>
            }/>

            <Footer></Footer>
        </div>
    );
}

const mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{getAuthUserData})(App);
