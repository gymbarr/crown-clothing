import { configureStore } from "@reduxjs/toolkit"
import { logger } from "redux-logger"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import createSagaMiddleware from "@redux-saga/core"

import { rootSaga } from "./root-saga"

import { rootReducer } from "./root-reducer"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
}

const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
