import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";
import { APIProvider } from "./Context/APIProvider";
import { CollectionProvider } from "Context/CollectionProvider";
import { VolumeTrendProvider } from "Context/VolumeTrendProvider";
import { CollectionOverviewProvider } from "Context/CollectionOveriewProvider";
import { NFTProvider } from "Context/NFTProvider";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <APIProvider>
      <CollectionProvider>
        <VolumeTrendProvider>
          <CollectionOverviewProvider>
            <NFTProvider>
              <Provider store={store}>
                <App />
              </Provider>
            </NFTProvider>
          </CollectionOverviewProvider>
        </VolumeTrendProvider>
      </CollectionProvider>
    </APIProvider>
  </React.StrictMode>
);
