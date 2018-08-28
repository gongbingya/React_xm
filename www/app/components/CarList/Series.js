import React from 'react';
import cn from "classnames";
import carBrandAndSeries  from "./api/carBrandAndSeries.js";
export default (props)=>{
   if(carBrandAndSeries[props.char]){
        if(!carBrandAndSeries[props.char].filter(item=> item.name == props.brand)[0]) return null;

        return <div>
            {
                carBrandAndSeries[props.char].filter(item=> item.name == props.brand)[0].series.map(item=>{
                    return <a

                                href="javascript:void(0);"
                                key={item}
                                className={cn({
                                    "line":true,
                                    "cur":item == props.series
                                })}

                                onClick= {()=>{
                                    props.onChoose(item)
                                }}
                            >
                        {item}
                    </a>
                })
            }
        </div>
   }

}