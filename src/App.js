import React from 'react';
import './App.css';
import Info from "./components/MainPage/Info/Info";
import MainText from "./components/MainPage/MainTitle/MainText";
import Advantages from "./components/MainPage/Advantages/Advantages";
import ForRealtors from "./components/MainPage/ForRealtors/ForRealtors";
import ForAppraisers from "./components/MainPage/ForAppraisers/ForAppraisers";
import Footer from "./components/Footer/Footer";
import {Redirect, Route} from "react-router-dom";
import Login from "./components/LoginPage/Login";
import Header from "./components/Header/Header";
import Registration from "./components/RegistrationPage/Registration";
import {connect} from "react-redux";
import {getAuthUserData} from "./redux/auth-reducer";
import Tariffs from "./components/TariffsPage/Tariffs";

class App extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData();
    }



    render() {
        return (
            <div className="app">
                <Header/>
                <div className='content'>
                    <Route exact path='/' render={() => <div>
                        <Info></Info>
                        <Advantages></Advantages>
                        <MainText text={"для риелторов"} scrollPathId={"forRealtors"}></MainText>
                        <ForRealtors></ForRealtors>
                        <MainText text={"для оценщиков"} scrollPathId={"forAppraisers"}></MainText>
                        <ForAppraisers></ForAppraisers>
                    </div>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/registration' render={() => <Registration/>}/>
                    <Route path='/tariffs' render={() => <Tariffs/>}/>
                </div>
                <Footer></Footer>

            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{getAuthUserData})(App);
