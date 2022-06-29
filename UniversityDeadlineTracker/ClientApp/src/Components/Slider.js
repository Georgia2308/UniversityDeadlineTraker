import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./Slider.css";
import "./Slider-Carousel.css";
import "./Slider-Carousel-theme.css";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import FiberManualRecordTwoToneIcon from "@mui/icons-material/FiberManualRecordTwoTone";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import { TaskCard } from "./TaskCard";
import { ACCENT_COLOR, getAccentColor } from "../Utils/Constants.js";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getPermissions, getUser } from "../Utils/Token";
import AddEditTaskPopup from "../Components/AddEditTaskPopup";

export const SimpleSlider = (props) => {
    let sliderRef = useRef(null);
    const [showPopupAdd, setShowPopupAdd] = useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            return sliderRef.current?.slickGoTo(props.initialSlide);
        }, 150);
    }, []);

    const getSettings = () => {
        return {
            dots: true,
            infinite: false,
            speed: 1500,
            slidesToShow: 4.3,
            slidesToScroll: 2,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };
    };

    const getCardList = () => {
        return props.tasks?.map((day) => {
            const taskCards = day.map((item) => (
                <TaskCard
                    item={item}
                    token={props.token}
                    user={props.user}
                    refreshSlider={props.refreshSlider}
                />
            ));
            return (
                <div className="card-list-container">
                    <span className="date">
                        {new Date(day[0].task.deadline).toDateString()}
                    </span>
                    <span className="dot">
                        <FiberManualRecordTwoToneIcon fontSize="small" />
                    </span>
                    {taskCards}
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            [
            {props.tasks.length > 0 ? (
                <div className="slider-component">
                    {getPermissions() ? (
                        <AddCircleIcon
                            className="add-task"
                            style={{ fontSize: "70" }}
                            onClick={() => {
                                setShowPopupAdd(true);
                            }}
                        />
                    ) : (
                        ""
                    )}
                    <div className="long-arrow">
                        <div className="little-arrow">
                            <ArrowRightTwoToneIcon fontSize="large" />
                        </div>
                    </div>
                    <Slider ref={sliderRef} {...getSettings()}>
                        {getCardList()}
                    </Slider>
                </div>
            ) : (
                <div className="slider-no-tasks">
                    No tasks? Go have <span className="orange">fun</span>!
                </div>
            )}
            ,
            {getPermissions() && (
                <AddEditTaskPopup
                    token={props.token}
                    user={props.user}
                    open={showPopupAdd}
                    setOpen={setShowPopupAdd}
                    button="Add Task Card"
                    refreshSlider={props.refreshSlider}
                />
            )}
            ]
        </React.Fragment>
    );
};
export default SimpleSlider;

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <ArrowForwardIosRoundedIcon
            className={className}
            style={{
                ...style,
                display: "block",
                width: "40px",
                height: "40px",
                position: "absolute",
                top: "134px",
                right: "-50px",
                color: getAccentColor(),
            }}
            onClick={onClick}
        />
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <ArrowBackIosNewRoundedIcon
            className={className}
            style={{
                ...style,
                display: "block",
                width: "40px",
                height: "40px",
                position: "absolute",
                top: "134px",
                left: "-50px",
                color: getAccentColor(),
            }}
            onClick={onClick}
        />
    );
};
