import React, {useEffect, useState} from "react";
import classes from "./FormsControls.module.css";
import triangle from "./triangle.svg";
import NumberFormat from 'react-number-format';
import {Link} from "react-router-dom";
import TextInput from 'react-autocomplete-input';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {findPropertyAPI} from "../../api/api";

export const Input = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return(
        <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
            <div className={classes.inputInner}>
                <input className={classes.input} {...input} {...props} />
                { hasError && <div className={classes.errorInner}>
                    <div className={classes.errorText}>
                        { meta.error }
                    </div>
                    <img className={classes.errorInnerTriangle} src={triangle} alt="triangle"/>
                </div> }
            </div>
        </div>
    )
}

export const InputNumber = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return(
        <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
            <div className={classes.inputInner}>
                {/*<input className={classes.input} {...input} {...props} />*/}
                <NumberFormat autoFocus={true} format="+7(###)-###-##-##" allowEmptyFormatting mask="_" className={classes.input} {...input} {...props}/>
                { hasError && <div className={classes.errorInner}>
                    <div className={classes.errorText}>
                        { meta.error }
                    </div>
                    <img className={classes.errorInnerTriangle} src={triangle} alt="triangle"/>
                </div> }
            </div>
        </div>
    )
}

export const Checkbox = ({input, meta, ...props}) => {
    return(
        <div className={classes.checkboxInner}>
            <input className={classes.checkboxCustom} {...input} {...props} />
            <label className={classes.label} for={props.id}><div>{props.title}</div></label>
        </div>
    )
}

export const CheckboxForPolitic = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return(
        <div className={classes.formControl + " " + (hasError ? classes.errorChecked : "")}>
            <div className={classes.checkboxInner}>
                <input {...input} {...props} />
                <div className={classes.checkboxText}>Я принимаю условия <span> </span>
                    <Link className={classes.checkboxLink} target="_blank" to="/agreement">Пользовательского соглашения</Link>, <span> </span>
                    <Link className={classes.checkboxLink} target="_blank" to="/politic">Политики конфиденциальности</Link>
                </div>
            </div>
        </div>
    )
}

export const InputForFilters = ({input, meta, ...props}) => {
    return(
            <div className={classes.inputInner}>
                <input className={classes.inputForFilters} {...input} {...props} />
            </div>
    )
}

export const Auto = ({input, meta, ...props}) =>{
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(()=>{
        findPropertyAPI.getStreets()
            .then(data =>{
                setOptions(data.data.list)
                console.log(options)
            })
    }, []);

    const setStreet = street =>{
        console.log(street)
        input.onChange(street)
        setDisplay(false);
    }
    return(
        <div className={classes.inputInnerAuto}>
            <input autoComplete="new-password"
                   className={classes.inputForFilters}
                   onBlur={(e)=>{
                       console.log(e)
                       setDisplay(false)
                   }}
                   onChange={(event)=>{input.onChange(event.target.value)}}
                   id="auto"
                   onClick={()=>{ setDisplay(!display)}}
                   {...input}
                   placeholder="Поиск по улице"
                   list="streets"
                   {...props}/>
                <datalist id="streets" className={classes.autoContainer}>
                    {options
                        /*.filter((name) => name.toLowerCase().indexOf(input.value.toLowerCase()) > -1)*/
                        .map((street,i)=>{
                        return <option onClick={() => setStreet(street)} className={classes.option} key={i}>
                            {street}
                        </option>
                    })}
                </datalist>
        </div>
    )
}

export const InputForStreet = ({input, meta, ...props}) => {
    return(
        <div className={classes.inputInner}>
            <Autocomplete
                options={["apple", "apricot", "banana", "carrot"]}
                renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
            />
        </div>
    )
}

/*
export const InputForStreet = ({input, meta, ...props}) => {
    return(
        <div className={classes.inputInner}>
            <TextInput options={["apple", "apricot", "banana", "carrot"]} {...input} {...props} />
        </div>
    )
}*/
