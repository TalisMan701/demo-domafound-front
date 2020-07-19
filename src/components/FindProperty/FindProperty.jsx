import React from "react";
import classes from "./FindProperty.module.css";
import Property from "./Property/Property";
import {connect} from "react-redux";
import "./Sidebar.css"
import {
    deletePropertyState, getFavoriteList,
    getIgnoreList,
    getProperty, getPropertyWithFilters, removeToFavoriteList,
    removeToIgnoreList, setFilters, setPage, setPageSize, setToFavoriteList,
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
import {loadFilters} from "../../redux/filters-reducer";
import Pagination from "react-js-pagination";
import "./Pagination.css"
import YandexMapContainer from "../YandexMap/YandexMapContainer";

class FindProperty extends React.Component {
    constructor(props) {
        super(props);
        this.type = "Over";
        this.showBackdrop = true;
        this.state = {showBackdrop: true};
        this.closeClick = this.closeClick.bind(this);
        this.toggleClick = this.toggleClick.bind(this)
        this.onCreate = this.onCreate.bind(this);
        this.state = {
            pageSize: this.props.pageSize,
            findWithMap: false
        }
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

    openMap(){
        this.sidebarObj.hide();
        this.setState({
            findWithMap: true
        })
    }

    closeMap(){
        this.setState({
            findWithMap: false
        })
    }

    componentDidMount() {
        if(this.props.isAuth){
            if(this.props.location.pathname == "/find_property"){
                this.props.getProperty(this.props.pageSize, this.props.page, this.props.filters);
            }else{
                this.props.getIgnoreList();
                this.props.getFavoriteList();
            }
        }
    }
    //КОООООСТТЫЫЫЫЫЛЬЬЬЬЬЬЬЬЬЬЬЬ нужно избавиться от этого метода, любые проблемы - вопросы к этому методу!!!
    componentWillReceiveProps(nextProps){
        if(nextProps.location.pathname != this.props.location.pathname || nextProps.isFetchingAuth != this.props.isFetchingAuth){
            this.props.getProperty(this.props.pageSize, this.props.page, this.props.filters);
            return nextProps;
        } else {
            return false
        }
    }

    componentWillUnmount() {
        console.log("Poka")
        this.props.deletePropertyState()
    }

    onPageChanged = (pageNumber) => {
        /*if (this.props.isNext !== null) {
            this.props.getProperty(this.props.pageSize, this.props.page, this.props.filters);
        }*/
        this.props.setPage(pageNumber)
        this.props.getProperty(this.props.pageSize, pageNumber, this.props.filters);
    }

    onSubmit = (formData) =>{
        let filters = ""
        if(typeof formData["area"] !== "undefined"){
            if (typeof formData.area["start"] === "undefined"){
                filters += `&min_area=${formData.area.end}&max_area=${formData.area.end}`
            }else if(typeof formData.area["end"] === "undefined"){
                filters += `&min_area=${formData.area.start}&max_area=${formData.area.start}`
            }else{
                filters += `&min_area=${formData.area.start}&max_area=${formData.area.end}`
            }
        }
        if(typeof formData["price"] !== "undefined"){
            if (typeof formData.price["start"] === "undefined"){
                filters += `&min_price=${formData.price.end}&min_price=${formData.price.end}`
            }else if(typeof formData.price["end"] === "undefined"){
                filters += `&min_price=${formData.price.start}&min_price=${formData.price.start}`
            }else{
                filters += `&min_price=${formData.price.start}&max_price=${formData.price.end}`
            }
        }
        if(typeof formData["floor"] !== "undefined"){
            if (typeof formData.floor["start"] === "undefined"){
                filters += `&min_floor=${formData.floor.end}&min_floor=${formData.floor.end}`
            }else if(typeof formData.floor["end"] === "undefined"){
                filters += `&min_floor=${formData.floor.start}&min_floor=${formData.floor.start}`
            }else{
                filters += `&min_floor=${formData.floor.start}&max_floor=${formData.floor.end}`
            }
        }
        if(typeof formData["numberOfStoreys"] !== "undefined"){
            if (typeof formData.numberOfStoreys["start"] === "undefined"){
                filters += `&min_floor_count=${formData.numberOfStoreys.end}&min_floor_count=${formData.numberOfStoreys.end}`
            }else if(typeof formData.numberOfStoreys["end"] === "undefined"){
                filters += `&min_floor_count=${formData.numberOfStoreys.start}&min_floor_count=${formData.numberOfStoreys.start}`
            }else{
                filters += `&min_floor_count=${formData.numberOfStoreys.start}&max_floor_count=${formData.numberOfStoreys.end}`
            }
        }
        if(typeof formData["kitchenArea"] !== "undefined"){
            if (typeof formData.kitchenArea["start"] === "undefined"){
                filters += `&min_kitchen_area=${formData.kitchenArea.end}&min_kitchen_area=${formData.kitchenArea.end}`
            }else if(typeof formData.kitchenArea["end"] === "undefined"){
                filters += `&min_kitchen_area=${formData.kitchenArea.start}&min_kitchen_area=${formData.kitchenArea.start}`
            }else{
                filters += `&min_kitchen_area=${formData.kitchenArea.start}&max_kitchen_area=${formData.kitchenArea.end}`
            }
        }
        if(typeof formData["livingArea"] !== "undefined"){
            if (typeof formData.livingArea["start"] === "undefined"){
                filters += `&min_living_area=${formData.livingArea.end}&min_living_area=${formData.livingArea.end}`
            }else if(typeof formData.livingArea["end"] === "undefined"){
                filters += `&min_living_area=${formData.livingArea.start}&min_living_area=${formData.livingArea.start}`
            }else{
                filters += `&min_living_area=${formData.livingArea.start}&max_living_area=${formData.livingArea.end}`
            }
        }
        if(typeof formData["phone"] !== "undefined"){
            filters += `&phone=${formData.phone}`
        }
        if(typeof formData["id"] !== "undefined"){
            filters += `&id=${formData.id}`
        }
        if(typeof formData["countRoom"] !== "undefined"){
            if(typeof formData.countRoom["k1"] !== "undefined"){
                if(formData.countRoom.k1 === true){
                    filters += `&num_of_rooms=1к`
                }
            }
            if(typeof formData.countRoom["k2"] !== "undefined"){
                if(formData.countRoom.k2 === true){
                    filters += `&num_of_rooms=2к`
                }
            }
            if(typeof formData.countRoom["k3"] !== "undefined"){
                if(formData.countRoom.k3 === true){
                    filters += `&num_of_rooms=3к`
                }
            }
            if(typeof formData.countRoom["k4"] !== "undefined"){
                if(formData.countRoom.k4 === true){
                    filters += `&num_of_rooms=4к`
                }
            }
            if(typeof formData.countRoom["k5"] !== "undefined"){
                if(formData.countRoom.k5 === true){
                    filters += `&num_of_rooms=5к`
                }
            }
            if(typeof formData.countRoom["studii"] !== "undefined"){
                if(formData.countRoom.studii === true){
                    filters += `&num_of_rooms=студии`
                }
            }
        }
        if(typeof formData["typeProperty"] !== "undefined") {
            if (typeof formData.typeProperty["vtor"] !== "undefined") {
                if (formData.typeProperty.vtor === true) {
                    filters += `&type_house=Вторичка`
                }
            }
            if (typeof formData.typeProperty["newbuild"] !== "undefined") {
                if (formData.typeProperty.newbuild === true) {
                    filters += `&type_house=Новостройки`
                }
            }
        }
        this.sidebarObj.hide();
        this.props.getPropertyWithFilters(this.props.pageSize, 1, filters);
    }

    getPropertyWithMap = (polygon_cords) =>{
        let polygon = 0
        if(polygon_cords.length !== 0){
            polygon_cords[0].pop()
            polygon = polygon_cords[0]
        }
        this.props.getPropertyWithFilters(this.props.pageSize, 1, "", polygon);
    }

    setPageSizeOnClick=()=>{
        this.props.setPageSize(this.state.pageSize)
        this.props.getProperty(this.state.pageSize, this.props.page, this.props.filters);
    }


    render() {

        if(!this.props.isAuth){
            return <Redirect to={'/login'}/>
        }
        if(!this.props.isSubscription){
            alert("Купите тариф, чтобы воспользоваться поиском недвижимости")
            return <Redirect to={'/tariffs'}/>
        }

        if(this.props.isFetchingAuth){
            return <Preloader/>
        }
        /*if(this.props.isFetching) {
            return <Preloader/>
        }*/
        console.log(this.props)
        return (
            <div className={classes.findProperty}>
                <button className={classes.btnOpenSB} onClick={this.toggleClick} id="toggle" >
                    <div className={classes.oneWord}>
                        <div className={classes.symbol}>Д</div>
                        <div className={classes.symbol}>о</div>
                        <div className={classes.symbol}>б</div>
                        <div className={classes.symbol}>а</div>
                        <div className={classes.symbol}>в</div>
                        <div className={classes.symbol}>и</div>
                        <div className={classes.symbol}>т</div>
                        <div className={classes.symbol}>ь</div>
                    </div>
                    <div className={classes.twoWord}>
                        <div className={classes.symbol}>ф</div>
                        <div className={classes.symbol}>и</div>
                        <div className={classes.symbol}>л</div>
                        <div className={classes.symbol}>ь</div>
                        <div className={classes.symbol}>т</div>
                        <div className={classes.symbol}>р</div>
                        <div className={classes.symbol}>ы</div>
                    </div>
                </button>
                <div className={classes.items}>
                    <Switch>
                        <Route exact path={this.props.match.path}>
                            <div id="wrapper">
                                <SidebarComponent id="default-sidebar" ref={Sidebar => this.sidebarObj = Sidebar}
                                                  type={this.type} created={this.onCreate}
                                                  showBackdrop={this.showBackdrop} style={{visibility: "hidden"}}>
                                    <FiltersPropertyWidgetsForm onSubmit={this.onSubmit} props={this.props}/>
                                    <button onClick={this.openMap.bind(this)} id="close" className="e-btn close-btn">Поиск по карте</button>
                                    <button onClick={this.closeClick} id="close" className="e-btn close-btn">Закрыть
                                    </button>
                                </SidebarComponent>
                                {this.state.findWithMap &&
                                    <div className={classes.modal}>
                                        <div className={classes.modalBody}>
                                            <button className={classes.closeModal} onClick={this.closeMap.bind(this)}>Закрыть</button>
                                            <YandexMapContainer getPropertyWithMap={this.getPropertyWithMap}/>
                                        </div>
                                    </div>

                                }
                                <div className={classes.propertyInner}>
                                    {this.props.property.length !== 0 &&
                                    <div>
                                        {this.props.property.map(p =>
                                            <Property item={p} setToIgnoreList={this.props.setToIgnoreList}
                                                      removeToFavoriteList={this.props.removeToFavoriteList}
                                                      setToFavoriteList={this.props.setToFavoriteList}/>
                                        )}
                                    </div>
                                    }
                                    {!this.props.isFetching && this.props.property.length === 0 &&
                                        <div className={classes.noPropertyText}>Объявления не найдены!</div>
                                    }
                                    {this.props.isFetching &&
                                        <div className={classes.preloaderInner}>
                                            <img src={preloader} className={classes.preloader} />
                                        </div>
                                    }
                                    {/*{!this.props.isFetching && this.props.isNext !== null &&
                                        <div onClick={() => {
                                            this.onPageChanged()
                                        }} className={classes.showMore}>
                                            Показать ещё
                                        </div>
                                    }*/}
                                    {this.props.property.length !== 0 &&
                                        <div className={classes.paginationInner}>
                                            <Pagination
                                                activePage={this.props.page}
                                                itemsCountPerPage={this.props.pageSize}
                                                totalItemsCount={this.props.totalPropertyCount}
                                                pageRangeDisplayed={5}
                                                onChange={this.onPageChanged}
                                            />
                                            <div className={classes.paginationTotalCount}>Всего объявлений: <span>{this.props.totalPropertyCount}</span></div>
                                            <div className={classes.pageSizeInner}>
                                                <div className={classes.pageSizeText}>Количество объявлений на странице: </div>
                                                {/*<div className={classes.pageSize}>5</div>
                                                <div className={classes.pageSize}>10</div>
                                                <div className={classes.pageSize}>15</div>
                                                <div className={classes.pageSize}>20</div>*/}
                                                <input type="number" id="pageSize"
                                                       name="PageSize" min="5" max="20" step="5"
                                                       value={this.state.pageSize}
                                                       onChange={(e)=>{
                                                           this.setState({
                                                               pageSize: e.target.valueAsNumber
                                                           })
                                                       }}
                                                       placeholder={"1-20"}
                                                       className={classes.pageSizeInput}
                                                />
                                                <div onClick={this.setPageSizeOnClick} className={classes.pageSizeBtn}>Применить</div>
                                            </div>
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
    filters: state.findProperty.filters,
    isAuth: state.auth.isAuth,
    isFetchingAuth: state.auth.isFetchingAuth,
    totalPropertyCount: state.findProperty.totalPropertyCount
})

export default compose(
    connect(mapStateToProps, {
        getProperty, setToIgnoreList, getIgnoreList,
        removeToIgnoreList, deletePropertyState, getFavoriteList,
        setToFavoriteList, removeToFavoriteList, getPropertyWithFilters,
        setPage, setPageSize
    }),
    withRouter
)(FindProperty);