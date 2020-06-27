import React from "react";
import classes from "./Tariffs.module.css"
import {SliderComponent} from "@syncfusion/ej2-react-inputs";
import "./SliderRange.css"
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";

const DaysForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <label>Количество дней:</label>
                <Field
                    name="daysCount"
                    value={props.value}
                    component={"input"}
                    placeholder={"Количество дней"}
                />
            </div>
        </form>
    )
}

const DaysFormRedux = reduxForm({form: 'days'})(DaysForm)

class Tariffs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            price: 700
        }
    }

    handleChange(event) {
        let price=0;
        let value= event.target.valueAsNumber;
        if(value === 7){
            price = 700
        }else if(value < 7){
            value = null
            price= 700
        }else if(value === 14){
            price = 1300
        }else if(value === 21){
            price = 1900
        }else if(value >= 31){
            value=31
            price = 2500
        }else if(value <21){
            price = (value - 7)*85+700
        }else if(Number.isNaN(value)){
            value=null;
            price = 700;
        }else{
            price = (value - 21)*60+1900
        }
        this.setState({value, price});
    }

    onBlurInput(event){
        let price=0;
        let value= event.target.valueAsNumber;
        if(value<7){
            value=7
            price=700
            this.setState({value, price})
        }
    }

    onChange(args){
        let price=0;
        if(args.value === 7){
            price = 700
        }else if(args.value === 14){
            price = 1300
        }else if(args.value === 21){
            price = 1900
        }else if(args.value === 31){
            price = 2500
        }else if(args.value <21){
            price = (args.value - 7)*85+700
        }else{
            price = (args.value - 21)*60+1900
        }
        this.setState({value: args.value, price})
    }



    ticks = {
        placement: "Before",
        largeStep: 24,
        smallStep: 1,
        showSmallTicks: true
    };

    tooltip = { placement: "Before", isVisible: true, showOn: "Always" };

    render() {
        return (
            <div className={classes.container}>
                <div className={classes.tariffs}>
                    <div className={classes.cards}>
                        <div className={classes.cardsRow}>
                            <div className={classes.card}>
                                <div className={classes.days}>
                                    <div className={classes.daysCount}>7</div>
                                    <div className={classes.daysText}>дней</div>
                                </div>
                                <div className={classes.price}>700₽</div>
                                <div className={classes.button}>
                                    <div className={classes.buttonText}>
                                        Купить
                                    </div>
                                </div>
                            </div>
                            <div className={classes.card}>
                                <div className={classes.days}>
                                    <div className={classes.daysCount}>14</div>
                                    <div className={classes.daysText}>дней</div>
                                </div>
                                <div className={classes.price}>1300₽</div>
                                <div className={classes.button}>
                                    <div className={classes.buttonText}>
                                        Купить
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={classes.calcInner}>
                            <div className={classes.calc}>
                                <div className={classes.title}>Калькулятор дней</div>
                                <SliderComponent
                                    id="slider"
                                    value={this.state.value}
                                    min={7}
                                    max={31}
                                    step={1}
                                    change={this.onChange.bind(this)}
                                    showButtons={false}
                                    tooltip={this.tooltip}
                                    ticks={this.ticks}
                                />
                                <div className={classes.inputDaysCount}>
                                    <div>Количество дней:</div>
                                    <input type="number" id="daysCount"
                                           name="daysCount" min="7" max="31"
                                           onChange={this.handleChange.bind(this)}
                                           onBlur={this.onBlurInput.bind(this)}
                                           value={this.state.value}
                                           placeholder={"7"}
                                    />
                                </div>

                                <div>Цена: {this.state.price} рублей</div>
                                <div className={classes.button}>
                                    <div className={classes.buttonText}>
                                        Купить
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.cardsRow}>
                            <div className={classes.card}>
                                <div className={classes.days}>
                                    <div className={classes.daysCount}>21</div>
                                    <div className={classes.daysText}>дней</div>
                                </div>
                                <div className={classes.price}>1900₽</div>
                                <div className={classes.button}>
                                    <div className={classes.buttonText}>
                                        Купить
                                    </div>
                                </div>
                            </div>
                            <div className={classes.card}>
                                <div className={classes.days}>
                                    <div className={classes.daysCount}>31</div>
                                    <div className={classes.daysText}>дней</div>
                                </div>
                                <div className={classes.price}>2500₽</div>
                                <div className={classes.button}>
                                    <div className={classes.buttonText}>
                                        Купить
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps,{})(Tariffs);