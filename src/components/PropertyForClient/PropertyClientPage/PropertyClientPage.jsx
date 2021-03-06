import React, {useState} from "react";
import classes from "./PropertyClientPage.module.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css"
import YandexMapContainerShowHouse from "../../YandexMap/YandexMapContainerShowHouse";

const PropertyClientPage = (props) => {
    const [downloading, setDownloading] = useState(false);
    const [zoomImages, setZoomImages] = useState(false)

    let [showMap, setShowMap] = useState(false)

    const toggleShowMap = () =>{
        setShowMap(!showMap)
    }

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    /*let jkh = []

    for(let key in props.jkhInfo){
        if(key !== "SOAP-ENV:Envelope"){
            if(typeof props.jkhInfo[key] !== "object"){
                jkh.push(
                    <div className={classes.jkhItem} key={key}>{props.jkhInfo[key]}</div>
                )
            }else if(Object.prototype.toString.call(props.jkhInfo[key]) === '[object Array]'){
                for(let key2 in props.jkhInfo[key]){
                    jkh.push(
                        <div className={classes.jkhItem}>{props.jkhInfo[key][key2].name}</div>
                    )
                }
            }else{
                for(let key2 in props.jkhInfo[key]){
                    jkh.push(
                        <div className={classes.jkhItem}>{props.jkhInfo[key][key2]}</div>
                    )
                }
            }
        }else{
            jkh.push(
                <div>ЖКХ ебет мозги! Посмотри ответ с сервера</div>
            )
        }
    }*/

    /*const downloadPhotos = () =>{
        setDownloading(true)
        findPropertyAPI.getPhotos(props.property.house.house_id)
            .then(response =>{
                window.location.assign(response.data.file)
                setDownloading(false)
            }).catch( (error) => {
            setDownloading(false)
            alert("Не удалось скачать фотографии")
        })
    }*/

/*    if (props.isFetchingOnePage) {
        return (
            <Preloader/>
        )
    } else {*/
        return (
            <div className={classes.propertyPage}>
                {zoomImages &&
                <div className={classes.zoomImagesInner}>
                    <div className={classes.zoomImagesSliderInner}>
                        <div onClick={()=>{setZoomImages(false)}}  className={classes.zoomImagesClose}>
                            Закрыть
                        </div>
                        {props.property.house.image_set.length !== 0 &&
                        <div>
                            <Slider {...settings}>
                                {props.property.house.image_set.map(img =>
                                    <div className={classes.imgInnerZoom}>
                                        <img className={classes.imgZoom} src={img.image_link} alt=""/>
                                    </div>
                                )}
                            </Slider>
                        </div>
                        }
                        {props.property.house.image_set.length === 0 && props.property.house.title_image === null &&
                        <div className={classes.noImg}>
                            <div>
                                Изображений нет
                            </div>
                        </div>
                        }
                        {props.property.house.image_set.length === 0 && props.property.house.title_image !== null &&
                        <div className={classes.imgInner}>
                            <img className={classes.img} src={props.property.house.title_image} alt=""/>
                        </div>
                        }
                    </div>
                </div>
                }
                <div className={classes.row}>
                    <div className={classes.sliderInner}>
                        {props.property.house.image_set.length !== 0 &&
                            <div>
                                <Slider {...settings}>
                                    {props.property.house.image_set.map(img =>
                                        <div onClick={()=>{setZoomImages(true)}} className={classes.imgInner}>
                                            <img className={classes.img} src={img.image_link} alt=""/>
                                        </div>
                                    )}
                                </Slider>
                                {/*<div className={classes.downloadbtn} onClick={downloadPhotos}>
                                    {!downloading &&
                                        <div className={classes.downloadInner}>
                                            <img className={classes.downloadIcon} src={cameraIcon} alt=""/>
                                            <span className={classes.downloadText}>Скачать фотографии</span>
                                        </div>

                                    }
                                    {downloading &&
                                        <img src={preloader} className={classes.preloaderForButton} />
                                    }
                                </div>*/}

                            </div>
                        }
                        {props.property.house.image_set.length === 0 && props.property.house.title_image === null &&
                            <div className={classes.noImg}>
                                <div>
                                    Изображений нет
                                </div>
                            </div>
                        }
                        {props.property.house.image_set.length === 0 && props.property.house.title_image !== null &&
                            <div className={classes.imgInner}>
                                <img className={classes.img} src={props.property.house.title_image} alt=""/>
                            </div>
                        }
                    </div>
                    <div className={classes.propertyInfo}>
                        <div className={classes.title}>{props.property.house.title}</div>

                        <div className={classes.content}>
                            <div className={classes.description}>
                                <div className={classes.descriptionTitle}>Описание</div>
                                <div className={classes.descriptionText}>
                                    Адресс: {props.property.house.address}
                                    <br/>
                                    {/*Выложено: {props.item.items.data},
                        <br/>*/}
                                    Цена: {Math.round(((props.percentage)/100+1)*(props.property.house.price)+props.surcharge)}₽ {props.property.house.offer_type === "1" && <span>в месяц</span>}
                                </div>
                            </div>
                        </div>
                        {props.property.house.house_info !== null && props.property.house.type !== "Участки" &&
                        <div className={classes.content}>
                            <div>Тип дома: <span>{props.property.house.house_info.house_type}</span></div>
                            <div>Этажность: <span>{props.property.house.house_info.floor_count}</span></div>
                            <div>Количество комнат: <span>{props.property.house.house_info.num_of_rooms}</span></div>
                            <div>Этаж: <span>{props.property.house.house_info.floor}</span></div>
                            <div>Площадь: <span>{props.property.house.house_info.total_area}</span>м²</div>
                            {props.property.house.house_info.land_area !== 0 &&
                                <div>Площадь участка: <span>{props.property.house.house_info.land_area} </span>соток</div>
                            }

                        </div>
                        }
                        {props.property.house.house_info !== null && props.property.house.type === "Участки" &&
                        <div className={classes.content}>
                            <div>ID недвижимости: <span>{props.property.house.house_info.house_id}</span></div>
                            <div>Площадь: <span>{props.property.house.house_info.land_area} </span>соток</div>
                        </div>
                        }
                        {props.property.house.house_info === null &&
                            <div className={classes.content}>
                                <div className={classes.loadInfo}>Идёт запись информации в базу</div>
                            </div>
                        }
                        {props.property.house.house_info !== null &&
                            <div>
                                <div onClick={()=>toggleShowMap()} className={classes.showOnMapText}>Показать на карте</div>
                                {showMap &&
                                    <div className={classes.modal}>
                                        <div className={classes.modalBody}>
                                            <button className={classes.closeModal} onClick={()=>toggleShowMap()}>Закрыть</button>
                                            <YandexMapContainerShowHouse x={props.property.house.x_cord} y={props.property.house.y_cord}/>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
                {props.property.house.data !== "" &&
                <div className={classes.content}>
                    <div className={classes.mainInfo}>
                        {props.property.house.data}
                    </div>
                </div>
                }
                {/*{props.jkhInfo === null &&
                <div className={classes.preloaderInner}>
                    <img src={preloader} className={classes.preloader} />
                </div>

                }
                {props.jkhInfo !== null &&
                    <div>
                        {props.jkhInfo.map(i => {
                            return <div>{i}</div>
                        })}
                        {Object.keys(props.jkhInfo).map(key=> {
                                if (!typeof props.jkhInfo[key] !== "object"){
                                    return <div>{props.jkhInfo[key]}</div>
                                }
                            }
                        )}
                        {jkh}
                    </div>
                }*/}

                <div className={classes.btns}>
                    <div className={`${classes.btnBack} ${classes.btn}`} onClick={props.goBack}>
                        Вернуться
                    </div>
                </div>
            </div>
        )
}

export default PropertyClientPage;