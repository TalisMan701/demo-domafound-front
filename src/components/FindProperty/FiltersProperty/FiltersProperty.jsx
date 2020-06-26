import React from "react";
import classes from "./FiltersProperty.module.css";
import "./DropDownList.css";
import "./MultiSelect.css";
import "./SliderRange.css";
import Multiselect from 'react-widgets/lib/Multiselect';
import {MultiSelectComponent} from "@syncfusion/ej2-react-dropdowns";
import {Field, FormSection, reduxForm} from "redux-form";
import 'react-widgets/dist/css/react-widgets.css'

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
            <div>Filters</div>
            <div>
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
            </div>
            <div>
                <label>Количество комнат</label>
                <Field
                    name="countRoom"
                    component={renderMultiselect}
                    data={['1-к.', '2-к.', '3-к.', '4-к.', '5-к. и более']}
                />
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
                <button type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>Reset Values</button>
            </div>
        </form>
    )
};

const FiltersPropertyWidgetsForm = reduxForm({
    form: 'filters'  // a unique identifier for this form
})(FiltersPropertyForm)

export default FiltersPropertyWidgetsForm;