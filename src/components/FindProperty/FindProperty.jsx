import React from "react";
import classes from "./FindProperty.module.css";
import Property from "./Property/Property";
import {connect} from "react-redux";
import "./Sidebar.css"
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
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
import FiltersProperty from "./FiltersProperty/FiltersProperty";
import {SliderComponent} from "@syncfusion/ej2-react-inputs";
import FiltersPropertyWidgetsForm from "./FiltersProperty/FiltersProperty";
import Preloader from "../../common/Preloader/Preloader";
import preloader from "../../common/Preloader/Preloader.svg";

class FindProperty extends React.Component {
    constructor(props) {
        super(props);
        this.type = "Over";
        this.showBackdrop = true;
        this.state = {showBackdrop: true};
        this.closeClick = this.closeClick.bind(this);
        this.toggleClick = this.toggleClick.bind(this)
        this.onCreate = this.onCreate.bind(this);
    }

    onCreate() {
        this.sidebarObj.element.style.visibility = '';
    }

    toggleClick() {
        this.sidebarObj.show();
    }

    closeClick() {
        this.sidebarObj.hide();
    }

    componentDidMount() {
        this.props.getProperty(this.props.pageSize, this.props.page);
        this.props.getIgnoreList();
        this.props.getFavoriteList();
    }

    componentWillUnmount() {
        console.log("Poka")
        this.props.deletePropertyState()
    }

    onPageChanged = () => {
        if (this.props.isNext !== null) {
            this.props.getProperty(this.props.pageSize, this.props.page);
        }
    }


    render() {
        /*if(!this.props.isSubscription){
            alert("Купите тариф, чтобы воспользоваться поиском недвижимости")
            return <Redirect to={'/tariffs'}/>
        }*/
        /*if(this.props.isFetching) {
            return <Preloader/>
        }*/
        console.log(this.props)
        return (
            <div className={classes.findProperty}>
                <div className={classes.items}>
                    <Switch>
                        <Route exact path={this.props.match.path}>
                            <div id="wrapper">
                                <SidebarComponent id="default-sidebar" ref={Sidebar => this.sidebarObj = Sidebar}
                                                  type={this.type} created={this.onCreate}
                                                  showBackdrop={this.showBackdrop} style={{visibility: "hidden"}}>
                                    <FiltersPropertyWidgetsForm props={this.props}/>
                                    <button onClick={this.closeClick} id="close" className="e-btn close-btn">Закрыть
                                    </button>
                                </SidebarComponent>
                                <div>
                                    <button onClick={this.toggleClick} id="toggle" className="e-btn e-info">Добавить фильтры
                                    </button>
                                    {this.props.property.map(p =>
                                        <Property item={p} setToIgnoreList={this.props.setToIgnoreList}
                                                  removeToFavoriteList={this.props.removeToFavoriteList}
                                                  setToFavoriteList={this.props.setToFavoriteList}/>
                                    )}
                                    {this.props.isFetching &&
                                        <div className={classes.preloaderInner}>
                                            <img src={preloader} className={classes.preloader} />
                                        </div>
                                    }
                                    {!this.props.isFetching &&
                                        <div onClick={() => {
                                            this.onPageChanged()
                                        }} className={classes.showMore}>
                                            Показать ещё
                                        </div>
                                    }

                                </div>
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
    favoriteList: state.findProperty.favoriteList,
    isFetching: state.findProperty.isFetching
})

export default compose(
    connect(mapStateToProps, {
        getProperty, setToIgnoreList, getIgnoreList,
        removeToIgnoreList, deletePropertyState, getFavoriteList,
        setToFavoriteList, removeToFavoriteList
    }),
    withRouter
)(FindProperty);