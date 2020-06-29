import React from "react";
import classes from "./FiltersProperty.module.css";
import "./DropDownList.css";
import "./MultiSelect.css";
import "./SliderRange.css";
import Multiselect from 'react-widgets/lib/Multiselect';
import {MultiSelectComponent} from "@syncfusion/ej2-react-dropdowns";
import {Field, FormSection, reduxForm} from "redux-form";
import 'react-widgets/dist/css/react-widgets.css'
import {Checkbox} from "../../../common/FormsControls/FormsControls";

const renderMultiselect = ({ input, data, valueField, textField }) =>
    <Multiselect {...input}
                 onBlur={() => input.onBlur()}
                 value={input.value || []} // requires value to be an array
                 data={data}
                 valueField={valueField}
                 textField={textField}
    />

const typeTransaction = ['Продам','Куплю','Сдам','Посуточно','Сниму']
const typeProperty = ['Комнаты и Пансионаты', 'Дома/Коттеджи/Дачи', 'Коммерческая', 'Земля'];

const FiltersPropertyForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>Фильтры</div>
            {/*<div>
                <label>Тип сделки:</label>
                <Field
                    name="typeTransaction"
                    component={renderMultiselect}
                    data={['Продам','Куплю','Сдам','Посуточно','Сниму']}
                />
            </div>
            <div>
                <label>Тип недвижимости:</label>
                <Field
                    name="typeProperty"
                    component={renderMultiselect}
                    data={['Комнаты и Пансионаты', 'Дома/Коттеджи/Дачи', 'Коммерческая', 'Земля']}
                />
            </div>*/}
            <div>
                <label>Номер телефона</label>
                <Field
                    name="phone"
                    component={"input"}
                    placeholder={"79009009090"}
                />
            </div>
            <div>
                <label>ID недвижимости</label>
                <Field
                    name="id"
                    component={"input"}
                />
            </div>
            <div>
                <label>Количество комнат</label>
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
                <label>Этаж</label>
                <FormSection name={"floor"}>
                    <Field
                        name="start"
                        component={"input"}
                        placeholder={"от"}
                    />
                    <Field
                        name="end"
                        component={"input"}
                        placeholder={"до"}
                    />
                </FormSection>
            </div>
            <div>
                <label>Этажность</label>
                <FormSection name={"numberOfStoreys"}>
                    <Field
                        name="start"
                        component={"input"}
                        placeholder={"от"}
                    />
                    <Field
                        name="end"
                        component={"input"}
                        placeholder={"до"}
                    />
                </FormSection>
            </div>
            <div>
                <label>Площадь</label>
                <FormSection name={"area"}>
                    <Field
                        name="start"
                        component={"input"}
                        placeholder={"от"}
                    />
                    <Field
                        name="end"
                        component={"input"}
                        placeholder={"до"}
                    />
                </FormSection>
            </div>
            <div>
                <label>Цена</label>
                <FormSection name={"price"}>
                    <Field
                        name="start"
                        component={"input"}
                        placeholder={"от"}
                    />
                    <Field
                        name="end"
                        component={"input"}
                        placeholder={"до"}
                    />
                </FormSection>
            </div>
            <div>
                <button>Применить фильтры</button>
                <button type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>Сбросить фильтры</button>
            </div>
        </form>
    )
};

const FiltersPropertyWidgetsForm = reduxForm({
    form: 'filters',  // a unique identifier for this form
    enableReinitialize: true
})(FiltersPropertyForm)

export default FiltersPropertyWidgetsForm;