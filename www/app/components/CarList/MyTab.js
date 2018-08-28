import React from 'react';
import carBrandAndSeries  from "./api/carBrandAndSeries.js";
import cn from "classnames";
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
export default (props)=>{
    return <div>
                <Tabs defaultActiveKey="A" >
                    {
                        Object.keys(carBrandAndSeries).map(char=>{

                            return <TabPane
                                tab={char}
                                key={char}
                            >
                                {
                                    carBrandAndSeries[char].map(brand=>{
                                        return <a href="javascript:void(0);"
                                            className={cn({
                                                "line":true,
                                                "cur":brand.name == props.brand

                                            })}
                                            key={brand.name}
                                            onClick={()=>{props.onChoose(brand.name,char)}}
                                        >
                                            {brand.name}
                                        </a>
                                    })
                                }
                            </TabPane>
                        })
                    }
                </Tabs>
            </div>
}

