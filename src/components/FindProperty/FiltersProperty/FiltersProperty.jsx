import React, {useEffect, useState} from "react";
import classes from "./FiltersProperty.module.css";
import "./DropDownList.css";
import "./MultiSelect.css";
import "./SliderRange.css";
import Multiselect from 'react-widgets/lib/Multiselect';
import {MultiSelectComponent} from "@syncfusion/ej2-react-dropdowns";
import {Field, FormSection, reduxForm, reset} from "redux-form";
import 'react-widgets/dist/css/react-widgets.css'
import {
    Auto, Auto2,
    Checkbox,
    Input,
    InputForFilters,
    InputForStreet
} from "../../../common/FormsControls/FormsControls";
import YandexMapContainer2 from "../../YandexMap/YandexMapContainer2";
import {setFiltersStorage, setPolygonCords} from "../../../redux/findProperty-reducer";
import {connect} from "react-redux";

const renderMultiselect = ({input, data, valueField, textField}) =>
    <Multiselect {...input}
                 onBlur={() => input.onBlur()}
                 value={input.value || []} // requires value to be an array
                 data={data}
                 valueField={valueField}
                 textField={textField}
    />

const typeTransaction = ['Продам', 'Куплю', 'Сдам', 'Посуточно', 'Сниму']
const typeProperty = ['Комнаты и Пансионаты', 'Дома/Коттеджи/Дачи', 'Коммерческая', 'Земля'];

const FiltersPropertyForm = (props) => {

    const [isResetFilters, setIsResetFilters] = useState(false)

    useEffect(()=>{
        console.log(props.filtersStorage)
        setIsResetFilters(false)
        if (localStorage.getItem("filters") != null && localStorage.getItem("filters") != "[]"){
            props.initialize(props.filtersStorage)
        }
    },[])

    const resetFilters = () =>{
        console.log("reset")
        props.reset();
        props.dropFilters();
        setIsResetFilters(true)
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.filters}>
                <div className={classes.title}>Фильтры</div>
                <div className={classes.filtersWithMap}>
                    <div>
                        <div>
                            <label>
                                <div className={classes.labelTitle}>Тип недвижимости</div>
                            </label>
                            <FormSection name={"typeProperty"}>
                                <div className={classes.checkboxsTypeProperty}>
                                    <div className={classes.checkboxs}>
                                        <Field
                                            name="vtor"
                                            component={Checkbox}
                                            type="checkbox"
                                            id="vtor"
                                            title={"Вторичные"}
                                        />
                                        <Field
                                            name="newbuild"
                                            component={Checkbox}
                                            type="checkbox"
                                            id="newbuild"
                                            title={"Новостройки"}
                                        />
                                    </div>
                                    <div className={classes.checkboxs}>
                                        <Field
                                            name="cottages"
                                            component={Checkbox}
                                            type="checkbox"
                                            id="cottages"
                                            title={"Коттеджи"}
                                        />
                                        <Field
                                            name="sectors"
                                            component={Checkbox}
                                            type="checkbox"
                                            id="sectors"
                                            title={"Участки"}
                                        />
                                    </div>
                                    <div className={classes.checkboxs}>
                                        <Field
                                            name="commercialProperty"
                                            component={Checkbox}
                                            type="checkbox"
                                            id="commercialProperty"
                                            title={"Коммерческая недвижимость"}
                                        />
                                    </div>
                                </div>
                            </FormSection>
                        </div>
                        <div>
                            <label>
                                <div className={classes.labelTitle}>Номер телефона</div>
                            </label>
                            <Field
                                name="phone"
                                component={InputForFilters}
                                placeholder={"79009009090"}
                            />
                        </div>
                        <div>
                            <label>
                                <div className={classes.labelTitle}>ID недвижимости</div>
                            </label>
                            <Field
                                name="id"
                                component={InputForFilters}
                            />
                        </div>
                        {/*<div>
                            <label>
                                <div className={classes.labelTitle}>Улица</div>
                            </label>
                            <Field
                                name="street"
                                component={Auto}
                            />
                        </div>*/}
                        <div>
                            <label>
                                <div className={classes.labelTitle}>Улица</div>
                            </label>
                            <Field
                                name="street"
                                component={Auto}
                            />
                        </div>
                    </div>
                    <div className={classes.map}>
                        <div className={classes.mapSolid}>
                            <button onClick={props.openMap} id="close" className="e-btn close-btn open-map">Поиск по карте</button>
                        </div>
                        <YandexMapContainer2/>
                    </div>
                </div>
                <div>
                    <label>
                        <div className={classes.labelTitle}>Количество комнат</div>
                    </label>
                    {/*<Field
                    name="countRoom"
                    component={renderMultiselect}
                    data={['1к', '2к', '3к', '4к', '5+к', 'студии']}
                />*/}
                    <FormSection name={"countRoom"}>
                        <div className={classes.checkboxs}>
                            <Field
                                name="studii"
                                component={Checkbox}
                                type="checkbox"
                                id="studii"
                                title={"Студии"}
                            />
                            <Field
                                name="k1"
                                component={Checkbox}
                                type="checkbox"
                                id="1k"
                                title={"1к"}
                            />
                            <Field
                                name="k2"
                                component={Checkbox}
                                type="checkbox"
                                id="2k"
                                title={"2к"}
                            />
                            <Field
                                name="k3"
                                component={Checkbox}
                                type="checkbox"
                                id="3k"
                                title={"3к"}
                            />
                            <Field
                                name="k4"
                                component={Checkbox}
                                type="checkbox"
                                id="4k"
                                title={"4к"}
                            />
                            <Field
                                name="k5"
                                component={Checkbox}
                                type="checkbox"
                                id="5k"
                                title={"5+к"}
                            />
                        </div>
                    </FormSection>
                </div>
                <div>
                    <label>
                        <div className={classes.labelTitle}>Цена</div>
                    </label>
                    <FormSection name={"price"}>
                        <div className={classes.formSection}>
                            <Field
                                name="start"
                                component={InputForFilters}
                                placeholder={"от"}
                            />
                            <Field
                                name="end"
                                component={InputForFilters}
                                placeholder={"до"}
                            />
                        </div>
                    </FormSection>
                </div>
                <div>
                    <label>
                        <div className={classes.labelTitle}>Этаж</div>
                    </label>
                    <FormSection name={"floor"}>
                        <div className={classes.formSection}>
                            <Field
                                name="start"
                                component={InputForFilters}
                                placeholder={"от"}
                            />
                            <Field
                                name="end"
                                component={InputForFilters}
                                placeholder={"до"}
                            />
                        </div>
                    </FormSection>
                </div>
                <div>
                    <label>
                        <div className={classes.labelTitle}>Этажность</div>
                    </label>
                    <FormSection name={"numberOfStoreys"}>
                        <div className={classes.formSection}>
                            <Field
                                name="start"
                                component={InputForFilters}
                                placeholder={"от"}
                            />
                            <Field
                                name="end"
                                component={InputForFilters}
                                placeholder={"до"}
                            />
                        </div>
                    </FormSection>
                </div>
                <div>
                    <label>
                        <div className={classes.labelTitle}>Общая площадь</div>
                    </label>
                    <FormSection name={"area"}>
                        <div className={classes.formSection}>
                            <Field
                                name="start"
                                component={InputForFilters}
                                placeholder={"от"}
                            />
                            <Field
                                name="end"
                                component={InputForFilters}
                                placeholder={"до"}
                            />
                        </div>
                    </FormSection>
                </div>
                <div>
                    <label>
                        <div className={classes.labelTitle}>Площадь кухни</div>
                    </label>
                    <FormSection name={"kitchenArea"}>
                        <div className={classes.formSection}>
                            <Field
                                name="start"
                                component={InputForFilters}
                                placeholder={"от"}
                            />
                            <Field
                                name="end"
                                component={InputForFilters}
                                placeholder={"до"}
                            />
                        </div>
                    </FormSection>
                </div>
                <div>
                    <label>
                        <div className={classes.labelTitle}>Жилая площадь</div>
                    </label>
                    <FormSection name={"livingArea"}>
                        <div className={classes.formSection}>
                            <Field
                                name="start"
                                component={InputForFilters}
                                placeholder={"от"}
                            />
                            <Field
                                name="end"
                                component={InputForFilters}
                                placeholder={"до"}
                            />
                        </div>
                    </FormSection>
                </div>
                <div>
                    <label>
                        <div className={classes.labelTitle}>Площадь участка</div>
                    </label>
                    <FormSection name={"sectorArea"}>
                        <div className={classes.formSection}>
                            <Field
                                name="start"
                                component={InputForFilters}
                                placeholder={"от"}
                            />
                            <Field
                                name="end"
                                component={InputForFilters}
                                placeholder={"до"}
                            />
                        </div>
                    </FormSection>
                </div>

                <div className={classes.btns}>
                    <button className={classes.btn}>Применить фильтры</button>
                    <button className={classes.btn} type="button"
                            onClick={resetFilters}>Сбросить фильтры
                    </button>
                </div>
            </div>
        </form>
    )
};

/*const mapDispatchToProps = (dispatch) =>{
    return{
        resetForm: () => dispatch(reset('filters'))
    }
}*/

let FiltersPropertyWidgetsForm = reduxForm({
    form: 'filters',  // a unique identifier for this form
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(FiltersPropertyForm)

/*FiltersPropertyWidgetsForm = connect(
    null,
    mapDispatchToProps// bind account loading action creator
)(FiltersPropertyWidgetsForm)*/

export default FiltersPropertyWidgetsForm;