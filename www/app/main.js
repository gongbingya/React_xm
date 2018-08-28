import React from "react";
import dva from "dva";
import logger from "redux-logger";
import App from "./containers/App.js";
import picshowModel from "./models/picshowModel.js";
import carlistModel from "./models/carlistModel.js";
import userlistModel from "./models/userlistModel.js";
import addCarModel from "./models/addCarModel.js";
const app = dva({
    // onAction : logger
});
// 路由的根组件是App
const router = ()=> <App />;
// 注册路由
app.router(router);
// 注册模型
app.model(picshowModel);
app.model(carlistModel);
app.model(userlistModel);
app.model(addCarModel);
// 挂载上树
app.start("#app");