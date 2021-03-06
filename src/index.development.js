import React from "react"
import ReactDom from "react-dom"
import HotApp from "components/HotApp"
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import {createLogger} from "redux-logger"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import {socketMiddleware} from "lib/socketMiddleware"
import loginManager from "lib/loginManagerInstance"

import reducer from "./redux/reducer"

const logger = createLogger({
  level: "info",
  collapsed: true,
})
const store = createStore(reducer, applyMiddleware(thunk, socketMiddleware, loginManager.getMiddleware(), logger) |> composeWithDevTools)
if (module.hot) {
  module.hot.accept("./redux/reducer", () => store.replaceReducer(require("./redux/reducer").default))
}

const rootNode = document.createElement("div")
document.body.append(rootNode)

ReactDom.render(<Provider store={store}>
  <HotApp/>
</Provider>, rootNode)