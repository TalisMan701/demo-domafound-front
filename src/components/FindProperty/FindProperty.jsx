import React from "react";
import classes from "./FindProperty.module.css";
import Property from "./Property/Property";
import {connect} from "react-redux";
import "./Sidebar.css"
import {
    deletePropertyState, getFavoriteList,
    getIgnoreList,
    getProperty, getPropertyWithFilters, removeToFavoriteList,
    removeToIgnoreList, setFilters, setToFavoriteList,
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
        this.props.getProperty(this.props.pageSize, this.props.page, this.props.filters);
        this.props.getIgnoreList();
        this.props.getFavoriteList();
    }

    componentWillUnmount() {
        console.log("Poka")
        this.props.deletePropertyState()
    }

    onPageChanged = () => {
        if (this.props.isNext !== null) {
            this.props.getProperty(this.props.pageSize, this.props.page, this.props.filters);
        }
    }

    onSubmit = (formData) =>{
        let filters = ""
        if(typeof formData["area"] !== "undefined"){
            filters += `&min_area=${formData.area.start}&max_area=${formData.area.end}`
        }
        if(typeof formData["price"] !== "undefined"){
            filters += `&min_price=${formData.price.start}&max_price=${formData.price.end}`
        }
        if(typeof formData["floor"] !== "undefined"){
            filters += `&min_floor=${formData.floor.start}&max_floor=${formData.floor.end}`
        }
        if(typeof formData["numberOfStoreys"] !== "undefined"){
            filters += `&min_floor_count=${formData.numberOfStoreys.start}&max_floor_count=${formData.numberOfStoreys.end}`
        }
        if(typeof formData["phone"] !== "undefined"){
            filters += `&phone=${formData.phone}`
        }
        if(typeof formData["id"] !== "undefined"){
            filters += `&id=${formData.id}`
        }
        if(typeof formData["countRoom"] !== "undefined"){
            formData.countRoom.map(room => {
                if(room == "5+к"){
                    filters += `&num_of_rooms=5к`
                }else{
                    filters += `&num_of_rooms=${room}`
                }
            })
        }
        this.sidebarObj.hide();
        this.props.getPropertyWithFilters(this.props.pageSize, 1, filters);
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
                                    <FiltersPropertyWidgetsForm onSubmit={this.onSubmit} props={this.props}/>
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
    isFetching: state.findProperty.isFetching,
    filters: state.findProperty.filters
})

export default compose(
    connect(mapStateToProps, {
        getProperty, setToIgnoreList, getIgnoreList,
        removeToIgnoreList, deletePropertyState, getFavoriteList,
        setToFavoriteList, removeToFavoriteList, getPropertyWithFilters
    }),
    withRouter
)(FindProperty);