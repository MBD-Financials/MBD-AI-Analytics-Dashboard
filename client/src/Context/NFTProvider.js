import React, { useContext } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const NFTAPIContext = React.createContext();

export const NFTProvider = ({ children }) => {
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

    //nfts?currency=usd&metrics=sales&sort_by=sales&sort_order=desc&offset=0&limit=30&time_range=all
    try {
      await axios
        .get(
          API_BASE_URL +
            `nfts?currency=usd&metrics=sales&sort_by=sales&sort_order=desc&offset=0&limit=30&time_range=${time}`,
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
  const NftTransaction = async (callBack, time) => {
   //transactions?currency=usd&blockchain=1&sort_by=transaction_date&sort_order=desc&time_range=all&offset=0&limit=30
    try {
      await axios
        .get(
          API_BASE_URL +
            `transactions?currency=usd&blockchain=1&sort_by=transaction_date&sort_order=desc&time_range=${time}&offset=0&limit=30`,
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
  const NftVolume = async (callBack, time) => {
   //nfts?currency=usd&blockchain=1&metrics=volume&metrics=volume&sort_by=volume&sort_order=desc&offset=0&limit=100&time_range=all
    try {
      await axios
        .get(
          API_BASE_URL +
            `nfts?currency=usd&blockchain=1&metrics=volume&metrics=volume&sort_by=volume&sort_order=desc&offset=0&limit=100&time_range=${time}`,
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
  const NftTrait = async (callBack, name,address,token) => {
    // console.log('block',name);
    // console.log('address',address);
    // console.log('token',token);
   //nft/blockchain/address/token?currency=usd&include_washtrade=true
    try {
      // alert("call")
      await axios
        .get(
          API_BASE_URL +
            `nft/${name}/${address}/${token}?currency=usd&include_washtrade=true`,
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
  const NftOverAllTrait= async (callBack, name,address,token) => {
    // nft/blockchain/address/token/traits?currency=usd
    // alert("call")
    // console.log('block',name);
    //   console.log('address',address);
    //   console.log('token',token);
    
     try {
       await axios
         .get(
           API_BASE_URL +
             `nft/${name}/${address}/${token}/traits?currency=usd`,
           { headers: { accept: "application/json", "x-api-key": API_KEY } }
         )
         .then((response) => {
           if (response.status === 200) {
            // console.log(response);
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
    <NFTAPIContext.Provider
      value={{
        NftTotalVolume,
        NftWashTradeVolume,
        NftMoneyLaundered,
        NftNoOfSales,
        NftTransaction,
        NftVolume,
        NftTrait,
        NftOverAllTrait
      }}
    >
      {children}
    </NFTAPIContext.Provider>
  );
};
export const UseNFTGolbalContext = () => {
  return useContext(NFTAPIContext);
};
