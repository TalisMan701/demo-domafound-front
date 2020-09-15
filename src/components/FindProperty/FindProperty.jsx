import React from "react";
import classes from "./FindProperty.module.css";
import Property from "./Property/Property";
import {connect} from "react-redux";
import "./Sidebar.css"
import {
    addOneTempProperty,
    deletePropertyState,
    getFavoriteList,
    getIgnoreList,
    getProperty,
    getPropertyWithFilters,
    getPropertyWithOutFetching,
    removeToFavoriteList,
    removeToIgnoreList, setDaysAgo,
    setFilters,
    setFiltersStorage,
    setPage,
    setPageSize,
    setPolygonCords,
    setTempProperty,
    setToFavoriteList,
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
import YandexMapContainer2 from "../YandexMap/YandexMapContainer2";
import {setIsFav} from "../../redux/auth-reducer";
import {
    addToSelected, createPropertyForClient,
    removeFromSelected,
    removeSelectedProperty,
    setSelecting
} from "../../redux/propertyForClient-reducer";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";

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
            findWithMap: false,
            showModalLink: false,
            copied: false,
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

    timerID = null;

    componentDidMount() {
        if(this.props.isAuth){
            if(this.props.location.pathname == "/find_property"){
                this.props.setIsFav(false)
                this.props.getProperty(this.props.pageSize, this.props.page, this.props.filters, this.props.polygon_cords, false);
                this.timerID = setInterval(()=>{
                    this.props.getPropertyWithOutFetching(this.props.pageSize, this.props.page, this.props.filters, this.props.polygon_cords, this.props.days_ago);
                },30000)
            }else{
                this.props.setIsFav(true)
                this.props.getProperty(this.props.pageSize, this.props.page, this.props.filters, this.props.polygon_cords, this.props.days_ago, true);
                this.timerID = setInterval(()=>{
                    this.props.getPropertyWithOutFetching(this.props.pageSize, this.props.page, this.props.filters, this.props.polygon_cords, this.props.days_ago, this.props.isFav);
                },30000)
                /*this.props.getIgnoreList();
                this.props.getFavoriteList();*/
            }
        }
    }
    //КОООООСТТЫЫЫЫЫЛЬЬЬЬЬЬЬЬЬЬЬЬ нужно избавиться от этого метода, любые проблемы - вопросы к этому методу!!!
    componentWillReceiveProps(nextProps){
        if(nextProps.location.pathname != this.props.location.pathname || nextProps.isFetchingAuth != this.props.isFetchingAuth){
            if(this.props.location.pathname == "/find_property/favorite_list"){
                this.props.setIsFav(false)
                this.props.getProperty(this.props.pageSize, this.props.page, this.props.filters, this.props.polygon_cords, false);
            }else{
                this.props.setIsFav(true)
                this.props.getProperty(this.props.pageSize, this.props.page, this.props.filters, this.props.polygon_cords, this.props.days_ago, true);
            }
            return nextProps;
        } else {
            return false
        }
    }

    componentWillUnmount() {
        console.log("Poka")
        clearInterval(this.timerID)
        this.props.deletePropertyState()
    }

    onPageChanged = (pageNumber) => {
        /*if (this.props.isNext !== null) {
            this.props.getProperty(this.props.pageSize, this.props.page, this.props.filters);
        }*/
        this.props.setPage(pageNumber)
        this.props.getProperty(this.props.pageSize, pageNumber, this.props.filters, this.props.polygon_cords,this.props.days_ago, this.props.isFav);
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
                filters += `&min_price=${formData.price.end.replace(/,/g,'')}&max_price=${formData.price.end.replace(/,/g,'')}`
            }else if(typeof formData.price["end"] === "undefined"){
                filters += `&min_price=${formData.price.start.replace(/,/g,'')}&max_price=${formData.price.start.replace(/,/g,'')}`
            }else{
                filters += `&min_price=${formData.price.start.replace(/,/g,'')}&max_price=${formData.price.end.replace(/,/g,'')}`
            }
        }
        if(typeof formData["floor"] !== "undefined"){
            if (typeof formData.floor["start"] === "undefined"){
                filters += `&min_floor=${formData.floor.end}&max_floor=${formData.floor.end}`
            }else if(typeof formData.floor["end"] === "undefined"){
                filters += `&min_floor=${formData.floor.start}&max_floor=${formData.floor.start}`
            }else{
                filters += `&min_floor=${formData.floor.start}&max_floor=${formData.floor.end}`
            }
        }
        if(typeof formData["numberOfStoreys"] !== "undefined"){
            if (typeof formData.numberOfStoreys["start"] === "undefined"){
                filters += `&min_floor_count=${formData.numberOfStoreys.end}&max_floor_count=${formData.numberOfStoreys.end}`
            }else if(typeof formData.numberOfStoreys["end"] === "undefined"){
                filters += `&min_floor_count=${formData.numberOfStoreys.start}&max_floor_count=${formData.numberOfStoreys.start}`
            }else{
                filters += `&min_floor_count=${formData.numberOfStoreys.start}&max_floor_count=${formData.numberOfStoreys.end}`
            }
        }
        if(typeof formData["kitchenArea"] !== "undefined"){
            if (typeof formData.kitchenArea["start"] === "undefined"){
                filters += `&min_kitchen_area=${formData.kitchenArea.end}&max_kitchen_area=${formData.kitchenArea.end}`
            }else if(typeof formData.kitchenArea["end"] === "undefined"){
                filters += `&min_kitchen_area=${formData.kitchenArea.start}&max_kitchen_area=${formData.kitchenArea.start}`
            }else{
                filters += `&min_kitchen_area=${formData.kitchenArea.start}&max_kitchen_area=${formData.kitchenArea.end}`
            }
        }
        if(typeof formData["livingArea"] !== "undefined"){
            if (typeof formData.livingArea["start"] === "undefined"){
                filters += `&min_living_area=${formData.livingArea.end}&max_living_area=${formData.livingArea.end}`
            }else if(typeof formData.livingArea["end"] === "undefined"){
                filters += `&min_living_area=${formData.livingArea.start}&max_living_area=${formData.livingArea.start}`
            }else{
                filters += `&min_living_area=${formData.livingArea.start}&max_living_area=${formData.livingArea.end}`
            }
        }
        if(typeof formData["sectorArea"] !== "undefined"){
            if (typeof formData.sectorArea["start"] === "undefined"){
                filters += `&min_land_area=${formData.sectorArea.end}&max_land_area=${formData.sectorArea.end}`
            }else if(typeof formData.sectorArea["end"] === "undefined"){
                filters += `&min_land_area=${formData.sectorArea.start}&max_land_area=${formData.sectorArea.start}`
            }else{
                filters += `&min_land_area=${formData.sectorArea.start}&max_land_area=${formData.sectorArea.end}`
            }
        }
        if(typeof formData["phone"] !== "undefined"){
            filters += `&phone=${formData.phone}`
        }
        if(typeof formData["id"] !== "undefined"){
            filters += `&id=${formData.id}`
        }
        if(typeof formData["street"] !== "undefined"){
            filters += `&street=${formData.street}`
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
            if (typeof formData.typeProperty["cottages"] !== "undefined") {
                if (formData.typeProperty.cottages === true) {
                    filters += `&type_house=Коттеджи`
                }
            }
            if (typeof formData.typeProperty["sectors"] !== "undefined") {
                if (formData.typeProperty.sectors === true) {
                    filters += `&type_house=Участки`
                }
            }
            if (typeof formData.typeProperty["commercialProperty"] !== "undefined") {
                if (formData.typeProperty.commercialProperty === true) {
                    filters += `&type_house=Коммерческаянедвижимость`
                }
            }
        }
        if(typeof formData["typeOffer"] !== "undefined") {
            if (typeof formData.typeOffer["sale"] !== "undefined") {
                if (formData.typeOffer.sale === true) {
                    filters += `&offer_type=0`
                }
            }
            if (typeof formData.typeOffer["rent"] !== "undefined") {
                if (formData.typeOffer.rent === true) {
                    filters += `&offer_type=1`
                }
            }
        }
        if(typeof formData["dataSort"] !== "undefined") {
            localStorage.setItem("days_ago", formData.dataSort.value)
            this.props.setDaysAgo(formData.dataSort.value)
        }
        if(typeof formData["description"] !== "undefined") {
            filters += `&description=${formData.description}`
        }
        this.sidebarObj.hide();
        localStorage.setItem("filters", JSON.stringify(formData));
        localStorage.setItem("filtersForFind", filters);
        this.props.setFiltersStorage(formData)
        this.props.getPropertyWithFilters(this.props.pageSize, 1, filters, this.props.polygon_cords, typeof formData["dataSort"] === "undefined" ? 0 : formData.dataSort.value, this.props.isFav);
    }

    dropFilters = () =>{
        localStorage.removeItem("polygon");
        localStorage.removeItem("filters");
        localStorage.removeItem("filtersForFind");
        localStorage.removeItem("days_ago");
        this.props.setPolygonCords(0);
        this.props.setDaysAgo(0);
        this.props.setFiltersStorage({typeOffer:{rent:false,sale:true}});
        this.sidebarObj.hide();
        this.props.getPropertyWithFilters(this.props.pageSize, 1, "&offer_type=0", 0, 0, this.props.isFav);
    }

    getPropertyWithMap = (polygon_cords) =>{
        let polygon = 0
        if(polygon_cords.length !== 0){
            polygon_cords[0].pop()
            polygon = polygon_cords[0]
        }
        this.props.setPolygonCords(polygon);
        this.props.getPropertyWithFilters(this.props.pageSize, 1, this.props.filters, polygon, this.props.days_ago, this.props.isFav);
    }

    setPageSizeOnClick=()=>{
        this.props.setPageSize(this.state.pageSize)
        this.props.getProperty(this.state.pageSize, this.props.page, this.props.filters, this.props.polygon_cords, this.props.days_ago, this.props.isFav);
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
        return (
            <div className={classes.findProperty}>
                {this.state.showModalLink &&
                    <div className={classes.modalLinkInner}>
                        {this.props.isFetchingLink &&
                            <div className={classes.preloaderInner}>
                                <img src={preloader} className={classes.preloader} />
                            </div>
                        }
                        {!this.props.isFetchingLink &&
                            <div className={classes.modalLinkWrapper}>
                                <h3 className={classes.modalLinkText}>Ваша ссылка:</h3>
                                <a className={classes.modalLink} href={this.props.link}>{this.props.link}</a>
                                <div className={classes.copyClipboardInner}>
                                    <CopyToClipboard text={this.props.link}
                                        onCopy={()=>this.setState({copied:true})}
                                    >
                                            <div className={classes.copyClipboard}>Скопировать</div>
                                    </CopyToClipboard>
                                    {this.state.copied? <div className={classes.copySuccess}>Успешно</div>: null}
                                </div>
                                <div className={classes.modalLinkBtn} onClick={()=>{
                                    this.setState({
                                        showModalLink: false
                                    })
                                }}>Закрыть</div>
                            </div>
                        }

                    </div>
                }

                <div className={classes.fixedBtn}>
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
                    {this.props.isFav &&
                        <div>
                            {!this.props.selecting &&
                            <button className={classes.btnSelectProperty} onClick={()=>{
                                this.props.setSelecting(true)
                            }}>
                                <div className={classes.oneWord}>
                                    <div className={classes.symbol}>В</div>
                                    <div className={classes.symbol}>ы</div>
                                    <div className={classes.symbol}>д</div>
                                    <div className={classes.symbol}>е</div>
                                    <div className={classes.symbol}>л</div>
                                    <div className={classes.symbol}>и</div>
                                    <div className={classes.symbol}>т</div>
                                    <div className={classes.symbol}>ь</div>
                                </div>
                                <div className={classes.twoWord}>
                                    <div className={classes.symbol}>о</div>
                                    <div className={classes.symbol}>б</div>
                                    <div className={classes.symbol}>ъ</div>
                                    <div className={classes.symbol}>я</div>
                                    <div className={classes.symbol}>в</div>
                                    <div className={classes.symbol}>л</div>
                                    <div className={classes.symbol}>е</div>
                                    <div className={classes.symbol}>и</div>
                                    <div className={classes.symbol}>я</div>
                                </div>
                            </button>
                            }
                            {this.props.selecting &&
                                <div>
                                    {this.props.selected.length > 0 &&
                                        <button className={classes.btnSelectProperty} onClick={()=>{
                                            this.props.createPropertyForClient(this.props.selected)
                                            this.setState({
                                                showModalLink: true
                                            })
                                            this.props.removeSelectedProperty()
                                        }}>
                                            <div className={classes.oneWord}>
                                                <div className={classes.symbol}>С</div>
                                                <div className={classes.symbol}>о</div>
                                                <div className={classes.symbol}>з</div>
                                                <div className={classes.symbol}>д</div>
                                                <div className={classes.symbol}>а</div>
                                                <div className={classes.symbol}>т</div>
                                                <div className={classes.symbol}>ь</div>
                                            </div>
                                            <div className={classes.twoWord}>
                                                <div className={classes.symbol}>С</div>
                                                <div className={classes.symbol}>с</div>
                                                <div className={classes.symbol}>ы</div>
                                                <div className={classes.symbol}>л</div>
                                                <div className={classes.symbol}>к</div>
                                                <div className={classes.symbol}>у</div>
                                            </div>
                                        </button>
                                    }
                                    <button className={classes.btnSelectProperty} onClick={()=>{
                                        this.props.removeSelectedProperty()
                                    }}>
                                        <div className={classes.oneWord}>
                                            <div className={classes.symbol}>О</div>
                                            <div className={classes.symbol}>т</div>
                                            <div className={classes.symbol}>м</div>
                                            <div className={classes.symbol}>е</div>
                                            <div className={classes.symbol}>н</div>
                                            <div className={classes.symbol}>и</div>
                                            <div className={classes.symbol}>т</div>
                                            <div className={classes.symbol}>ь</div>
                                        </div>
                                        <div className={classes.twoWord}>
                                            <div className={classes.symbol}>в</div>
                                            <div className={classes.symbol}>ы</div>
                                            <div className={classes.symbol}>д</div>
                                            <div className={classes.symbol}>е</div>
                                            <div className={classes.symbol}>л</div>
                                            <div className={classes.symbol}>е</div>
                                            <div className={classes.symbol}>н</div>
                                            <div className={classes.symbol}>и</div>
                                            <div className={classes.symbol}>е</div>
                                        </div>
                                    </button>
                                </div>
                            }
                        </div>
                    }
                </div>
                <div className={classes.items}>
                            <div id="wrapper">
                                <SidebarComponent id="default-sidebar" ref={Sidebar => this.sidebarObj = Sidebar}
                                                  type={this.type} created={this.onCreate}
                                                  showBackdrop={this.showBackdrop} style={{visibility: "hidden"}}>
                                    <FiltersPropertyWidgetsForm onSubmit={this.onSubmit} props={this.props}
                                                                openMap={this.openMap.bind(this)}
                                                                setPolygonCords={this.props.setPolygonCords}
                                                                setDaysAgo={this.props.setDaysAgo}
                                                                dropFilters={this.dropFilters}
                                                                filtersStorage={this.props.filtersStorage}
                                                                setFiltersStorage={this.props.setFiltersStorage}
                                    />
                                    {/*<div className={classes.map}>
                                        <div className={classes.mapSolid}>
                                            <button onClick={this.openMap.bind(this)} id="close" className="e-btn close-btn">Поиск по карте</button>
                                        </div>
                                        <YandexMapContainer2/>
                                    </div>*/}
                                    <button onClick={this.closeClick} id="close" className="e-btn close-btn">Закрыть</button>
                                </SidebarComponent>
                                {this.state.findWithMap &&
                                    <div className={classes.modal}>
                                        <div className={classes.modalBody}>
                                            <button className={classes.closeModal} onClick={this.closeMap.bind(this)}>Закрыть</button>
                                            <YandexMapContainer getPropertyWithMap={this.getPropertyWithMap} closeMap={this.closeMap.bind(this)}/>
                                        </div>
                                    </div>

                                }
                                <div className={classes.propertyInner}>
                                    {this.props.property.length !== 0 &&
                                    <div>
                                        {this.props.property.map(p =>{
                                                let isNewProperty = false
                                                if(this.props.tempProperty.includes(p.items.id)){
                                                    isNewProperty = false
                                                }else if(this.props.tempProperty.length >0){
                                                    isNewProperty = true
                                                    this.props.addOneTempProperty(p.items.id)
                                                }
                                                /*console.log(this.props.tempProperty)*/
                                                return <Property item={p} setToIgnoreList={this.props.setToIgnoreList}
                                                          removeToFavoriteList={this.props.removeToFavoriteList}
                                                          setToFavoriteList={this.props.setToFavoriteList}
                                                          isNewProperty={isNewProperty}
                                                         jobWithClient={this.props.jobWithClient}
                                                         selecting={this.props.selecting}
                                                        selected={this.props.selected}
                                                                 addToSelected={this.props.addToSelected}
                                                                 removeFromSelected={this.props.removeFromSelected}
                                                                 percentage={this.props.percentage}
                                                                 surcharge={this.props.surcharge}

                                                />
                                        })}
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
                        {/*<Route path={`${this.props.match.path}/ignore_list`}>
                            {this.props.ignoreList.map(p =>
                                <IgnoreProperty item={p} removeToIgnoreList={this.props.removeToIgnoreList}/>
                            )}
                        </Route>
                        <Route path={`${this.props.match.path}/favorite_list`}>
                            {this.props.favoriteList.length !== 0 &&
                                <div>
                                    {this.props.favoriteList.map(p =>
                                        <FavoriteProperty item={p} setToIgnoreList={this.props.setToIgnoreList}
                                                          removeToFavoriteList={this.props.removeToFavoriteList}/>
                                    )}
                                </div>
                            }

                            {!this.props.isFetching && this.props.favoriteList.length === 0 &&
                            <div className={classes.noPropertyText}>Объявления не найдены!</div>
                            }

                            {this.props.isFetching &&
                            <div className={classes.preloaderInner}>
                                <img src={preloader} className={classes.preloader} />
                            </div>
                            }
                        </Route>*/}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    property: state.findProperty.property,
    tempProperty: state.findProperty.tempProperty,
    ignoreList: state.findProperty.ignoreList,
    isSubscription: state.auth.isSubscription,
    pageSize: state.findProperty.pageSize,
    page: state.findProperty.page,
    isNext: state.findProperty.isNext,
    favoriteList: state.findProperty.favoriteList,
    isFetching: state.findProperty.isFetching,
    filters: state.findProperty.filters,
    polygon_cords: state.findProperty.polygon_cords,
    isAuth: state.auth.isAuth,
    isFetchingAuth: state.auth.isFetchingAuth,
    totalPropertyCount: state.findProperty.totalPropertyCount,
    filtersStorage: state.findProperty.filtersStorage,
    jobWithClient: state.auth.jobWithClient,
    days_ago: state.findProperty.days_ago,
    isFav: state.auth.isFav,
    selecting: state.propertyForClient.selecting,
    selected: state.propertyForClient.selected,
    link: state.propertyForClient.link,
    isFetchingLink: state.propertyForClient.isFetchingLink,
    percentage: state.auth.percentage,
    surcharge: state.auth.surcharge
})

export default compose(
    connect(mapStateToProps, {
        getProperty, setToIgnoreList, getIgnoreList,
        removeToIgnoreList, deletePropertyState, getFavoriteList,
        setToFavoriteList, removeToFavoriteList, getPropertyWithFilters,
        setPage, setPageSize, setPolygonCords, setFiltersStorage,
        getPropertyWithOutFetching, setTempProperty, setDaysAgo,
        addOneTempProperty, setIsFav,
        addToSelected, removeFromSelected, setSelecting,
        removeSelectedProperty, createPropertyForClient
    }),
    withRouter
)(FindProperty);