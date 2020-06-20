import React from "react";
import classes from "./FindProperty.module.css";
import Property from "./Property/Property";
import {connect} from "react-redux";
import {
    deletePropertyState, getFavoriteList,
    getIgnoreList,
    getProperty, removeToFavoriteList,
    removeToIgnoreList, setToFavoriteList,
    setToIgnoreList
} from "../../redux/findProperty-reducer";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import PrivateOffice from "../PrivateOffice/PrivateOffice";
import {compose} from "redux";
import IgnoreProperty from "./IgnoreProperty/IgnoreProperty";
import FavoriteProperty from "./FavoriteProperty/FavoriteProperty";

class FindProperty extends React.Component {

    componentDidMount() {
        this.props.getProperty(this.props.pageSize, this.props.page);
        this.props.getIgnoreList();
        this.props.getFavoriteList();
    }

    componentWillUnmount(){
        console.log("Poka")
        this.props.deletePropertyState()
    }

    onPageChanged = () => {
        if(this.props.isNext !== null){
            this.props.getProperty(this.props.pageSize, this.props.page);
        }
    }


    render() {
        /*if(!this.props.isSubscription){
            alert("Купите тариф, чтобы воспользоваться поиском недвижимости")
            return <Redirect to={'/tariffs'}/>
        }*/



        return (
            <div className={classes.findProperty}>
                <div  className={classes.container}>
                    <Switch>
                        <Route exact path={this.props.match.path}>
                            {this.props.property.map(p =>
                                <Property item={p} setToIgnoreList={this.props.setToIgnoreList}
                                          removeToFavoriteList={this.props.removeToFavoriteList}
                                          setToFavoriteList={this.props.setToFavoriteList}/>
                            )}
                            <div onClick={()=>{this.onPageChanged()}} className={classes.showMore}>
                                Show More
                            </div>
                        </Route>
                        <Route path={`${this.props.match.path}/ignore_list`}>
                            {this.props.ignoreList.map(p =>
                                <IgnoreProperty item={p} removeToIgnoreList={this.props.removeToIgnoreList}/>
                            )}
                        </Route>
                        <Route path={`${this.props.match.path}/favorite_list`}>
                            {this.props.favoriteList.map(p =>
                                <FavoriteProperty item={p} setToIgnoreList={this.props.setToIgnoreList}
                                                  removeToFavoriteList={this.props.removeToFavoriteList}/>
                            )}
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    property: state.findProperty.property,
    ignoreList: state.findProperty.ignoreList,
    isSubscription: state.auth.isSubscription,
    pageSize: state.findProperty.pageSize,
    page: state.findProperty.page,
    isNext: state.findProperty.isNext,
    favoriteList: state.findProperty.favoriteList
})

export default compose(
    connect(mapStateToProps,{getProperty, setToIgnoreList, getIgnoreList,
        removeToIgnoreList, deletePropertyState, getFavoriteList,
        setToFavoriteList, removeToFavoriteList}),
    withRouter
)(FindProperty);