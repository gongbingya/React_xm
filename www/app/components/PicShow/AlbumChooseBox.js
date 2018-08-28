import React from 'react';
import { connect } from "dva";
import cn from "classnames";
class AlbumChooseBox extends React.Component {

    constructor(props) {
        super(props);
        this.albumLis = [
            {"chinese":"外观","english":"view"},
            {"chinese":"内饰","english":"inner"},
            {"chinese":"结构及发动机","english":"engine"},
            {"chinese":"更多细节","english":"more"}
        ]
    }

    render() {
        const nowalbum = this.props.nowalbum;
        const carimages = this.props.carimages;
        if(!carimages.view) return null;
        return (
            <div className="albumChooseBox">
                <ul>
                    {
                        this.albumLis.map(item=>{
                            return <li
                                key={item.english}
                                className={cn({"cur":nowalbum == item.english})}
                                onClick = {()=>{
                                    this.props.dispatch({"type":"picshow/changeNowAlbum","nowalbum":item.english})
                                }}
                            >
                            {item.chinese} {carimages[item.english].length}
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}
export default connect(
    ({picshow})=>({
        "carimages":picshow.carimages,
        "nowalbum":picshow.nowalbum

    })
)(AlbumChooseBox);