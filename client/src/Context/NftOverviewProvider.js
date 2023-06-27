import React, { useContext } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const NFTOverViewContenxt = React.createContext();

export const NFTOverviewProvider = ({ children }) => {
  const NftTotalVolume = async (callBack, time) => {
    // nfts?currency=usd&blockchain=1&metrics=volume&sort_by=volume&sort_order=desc&offset=0&limit=30&time_range=all
    try {
      await axios
        .get(
          API_BASE_URL +
            `nfts?currency=usd&blockchain=1&metrics=volume&sort_by=volume&sort_order=desc&offset=0&limit=30&time_range=${time}`,
          { headers: { accept: "application/json", "x-api-key": API_KEY } }
        )
        .then((response) => {
          if (response.status === 200) {
            callBack(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const NftWashTradeVolume = async (callBack, time) => {
    //nfts?currency=usd&blockchain=1&metrics=washtrade_volume&sort_by=washtrade_volume&sort_order=desc&offset=0&limit=30&time_range=all
    try {
      await axios
        .get(
          API_BASE_URL +
            `nfts?currency=usd&blockchain=1&metrics=washtrade_volume&sort_by=washtrade_volume&sort_order=desc&offset=0&limit=30&time_range=${time}`,
          { headers: { accept: "application/json", "x-api-key": API_KEY } }
        )
        .then((response) => {
          if (response.status === 200) {
            callBack(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const NftMoneyLaundered = async (callBack, time) => {
    //nfts?currency=usd&blockchain=1&metrics=washtrade_suspect_sales&sort_by=washtrade_suspect_sales&sort_order=desc&offset=0&limit=30&time_range=all
    try {
      await axios
        .get(
          API_BASE_URL +
            `nfts?currency=usd&blockchain=1&metrics=washtrade_suspect_sales&sort_by=washtrade_suspect_sales&sort_order=desc&offset=0&limit=30&time_range=${time}`,
          { headers: { accept: "application/json", "x-api-key": API_KEY } }
        )
        .then((response) => {
          if (response.status === 200) {
            callBack(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  //
  const NftNoOfSales = async (callBack, time) => {
    // market/trend?currency=usd&blockchain=1&metrics=volume&time_range=24h&include_washtrade=false
    try {
      await axios
        .get(
          API_BASE_URL +
            `market/trend?currency=usd&blockchain=1&metrics=volume&time_range=${time}&include_washtrade=false`,
          { headers: { accept: "application/json", "x-api-key": API_KEY } }
        )
        .then((response) => {
          if (response.status === 200) {
            callBack(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };
  //
  return (
    <NFTOverViewContenxt.Provider
      value={{
        NftTotalVolume,
        NftWashTradeVolume,
        NftMoneyLaundered,
        NftNoOfSales,
      }}
    >
      {children}
    </NFTOverViewContenxt.Provider>
  );
};
export const UseNFTOverViewGolbalContext = () => {
  return useContext(NFTOverViewContenxt);
};
