import React, { useContext } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const CollectionOverviewContext = React.createContext();

export const CollectionOverviewProvider = ({ children }) => {

	const allVolumeCollection = async (callBack,time) => {
        //collections?currency=usd&blockchain=1&metrics=volume&sort_by=volume&sort_order=desc&offset=0&limit=30&time_range=all&include_washtrade=true
		try {
			await axios
				.get(
					API_BASE_URL +
						`collections?currency=usd&blockchain=1&metrics=volume&sort_by=volume&sort_order=desc&offset=0&limit=30&time_range=${time}&include_washtrade=true`,
					{ headers: { accept: "application/json", "x-api-key": API_KEY } }
				)
				.then((response) => {
					if (response.status === 200){
						callBack(response.data)
					}
					
					
				})
				.catch((error) => {
					console.log(error)
					
				});
		} catch (error) {
			console.log(error);
			
		}
	};
   
	const allTransactionCollection   = async (callBack,time) => {
        //collections?currency=usd&blockchain=1&metrics=transactions&sort_by=volume&sort_order=desc&offset=0&limit=30&time_range=all&include_washtrade=true
		try {
			await axios
				.get(
					API_BASE_URL +
						`collections?currency=usd&blockchain=1&metrics=transactions&sort_by=volume&sort_order=desc&offset=0&limit=30&time_range=${time}&include_washtrade=true`,
					{ headers: { accept: "application/json", "x-api-key": API_KEY } }
				)
				.then((response) => {
					if (response.status === 200){
						callBack(response.data)
					}
					
					
				})
				.catch((error) => {
					console.log(error)
					
				});
		} catch (error) {
			console.log(error);
			
		}
	};
    const allDiamondHandCollection   = async (callBack,time) => {
        //collections?currency=usd&blockchain=1&metrics=holders_diamond_hands&sort_by=volume&sort_order=desc&offset=0&limit=30&time_range=all&include_washtrade=true
		try {
			await axios
				.get(
					API_BASE_URL +
						`collections?currency=usd&blockchain=1&metrics=holders_diamond_hands&sort_by=volume&sort_order=desc&offset=0&limit=30&time_range=${time}&include_washtrade=true`,
					{ headers: { accept: "application/json", "x-api-key": API_KEY } }
				)
				.then((response) => {
					if (response.status === 200){
						callBack(response.data)
					}
					
					
				})
				.catch((error) => {
					console.log(error)
					
				});
		} catch (error) {
			console.log(error);
			
		}
	};
   
    const collectionOfAll = async (callBack,time) => {
        // collections?currency=usd&blockchain=1&metrics=volume&sort_by=volume&sort_order=desc&offset=0&limit=100&time_range=all&include_washtrade=true


        //collections?currency=usd&blockchain=1&metrics=volume&sort_by=volume&sort_order=desc&offset=0&limit=100&time_range=all&include_washtrade=true
		try {
			await axios
				.get(
					API_BASE_URL +
						`collections?currency=usd&blockchain=1&metrics=volume&sort_by=volume&sort_order=desc&offset=0&limit=100&time_range=${time}&include_washtrade=true`,
					{ headers: { accept: "application/json", "x-api-key": API_KEY } }
				)
				.then((response) => {
					if (response.status === 200){
						callBack(response.data)
					}
					
					
				})
				.catch((error) => {
					console.log(error)
					
				});
		} catch (error) {
			console.log(error);
			
		}
	};
	const TopTenNFTByVolume = async (callBack,time) => {
        //nfts?currency=usd&blockchain=1&metrics=volume&sort_by=volume&sort_order=desc&offset=0&limit=30&time_range=all
		try {
			await axios
				.get(
					API_BASE_URL +
						`nfts?currency=usd&blockchain=1&metrics=volume&sort_by=volume&sort_order=desc&offset=0&limit=30&time_range=${time}`,
					{ headers: { accept: "application/json", "x-api-key": API_KEY } }
				)
				.then((response) => {
					if (response.status === 200){
						callBack(response.data)
					}
					
					
				})
				.catch((error) => {
					console.log(error)
					
				});
		} catch (error) {
			console.log(error);
			
		}
	};
	const TransactedNFT= async (callBack,time) => {
        //nfts?currency=usd&blockchain=1&metrics=transfers&sort_by=transfers&sort_order=desc&offset=0&limit=30&time_range=all
		try {
			await axios
				.get(
					API_BASE_URL +
						`nfts?currency=usd&blockchain=1&metrics=transfers&sort_by=transfers&sort_order=desc&offset=0&limit=30&time_range=${time}`,
					{ headers: { accept: "application/json", "x-api-key": API_KEY } }
				)
				.then((response) => {
					if (response.status === 200){
						callBack(response.data)
					}
					
					
				})
				.catch((error) => {
					console.log(error)
					
				});
		} catch (error) {
			console.log(error);
			
		}
	};	
	
	const TransactionNFT= async (callBack,time) => {
        //nfts?currency=usd&blockchain=1&metrics=transactions&sort_by=transactions&sort_order=desc&offset=0&limit=100&time_range=all
		try {
			await axios
				.get(
					API_BASE_URL +
						`nfts?currency=usd&blockchain=1&metrics=transactions&sort_by=transactions&sort_order=desc&offset=0&limit=100&time_range=${time}`,
					{ headers: { accept: "application/json", "x-api-key": API_KEY } }
				)
				.then((response) => {
					if (response.status === 200){
						callBack(response.data)
					}
					
					
				})
				.catch((error) => {
					console.log(error)
					
				});
		} catch (error) {
			console.log(error);
			
		}
	};	
    
	
	return (
		<CollectionOverviewContext.Provider value={{ allVolumeCollection, allTransactionCollection, allDiamondHandCollection, collectionOfAll,TopTenNFTByVolume,TransactedNFT,TransactionNFT}}>
			{children}
		</CollectionOverviewContext.Provider>
	);
};
export const useCollectionOverviewGlobalContext = () => {
	return useContext(CollectionOverviewContext);
};
