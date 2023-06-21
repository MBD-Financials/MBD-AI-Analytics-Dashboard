import React, { useContext } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const APIContext = React.createContext();

export const APIProvider = ({ children }) => {

	const volumeOfNfts = async (callBack,time) => {
		try {
			await axios
				.get(
					API_BASE_URL +
						`market/metrics?metrics=volume&metrics=volume_change&time_range=${time}&include_washtrade=true`,
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
	const totalCollections = async (callBack) => {
		try {
			await axios
				.get(
					API_BASE_URL +
						`collections?metrics=traders&sort_by=marketcap&sort_order=asc&time_range=all&include_washtrade=true`,
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
	const totalWallets = async (callBack) => {
		try {
			await axios
				.get(
					API_BASE_URL +
						`wallets?metrics=volume&sort_by=traders&sort_order=desc&&time_range=all&include_washtrade=true`,
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
	//
	const oneMonthTrend = async(callBack) =>{
		try{
			await axios
				.get(
					API_BASE_URL +
						`market/trend?currency=usd&metrics=volume&time_range=30d&include_washtrade=true`,
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
		}
		catch(error){

		}
	}
// 
	return (
		<APIContext.Provider value={{ volumeOfNfts, totalCollections, totalWallets, oneMonthTrend}}>
			{children}
		</APIContext.Provider>
	);
};
export const useGlobalContext = () => {
	return useContext(APIContext);
};
