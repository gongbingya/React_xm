import React from 'react';
import BigImgBox from "./BigImgBox.js";
import InfoBox from "./InfoBox.js";
import AlbumChooseBox from "./AlbumChooseBox.js";
import CarLikeBox from "./CarLikeBox.js";
import SmallPicNavBox from "./SmallPicNavBox.js";
import { connect } from "dva";
import "./PicShow.less";
class PicShow extends React.Component {

    constructor(props) {
        super(props);

        props.dispatch({"type":"picshow/init","nowid":props.id})
    }

    render() {
        return (
            <div className="picShowcontainer">
                <BigImgBox></BigImgBox>
                <div className="sideBox">
                    <InfoBox></InfoBox>
                    <AlbumChooseBox></AlbumChooseBox>
                    <CarLikeBox></CarLikeBox>
                    <SmallPicNavBox></SmallPicNavBox>
                </div>
            </div>
        );
    }
}
export default connect()(PicShow);