




import React, { useContext } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const VolumeTrendContext = React.createContext();

export const VolumeTrendProvider = ({ children }) => {

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

	
	const CollectionOfMonthly = async (callBack,time) => {
        //collections?currency=usd&blockchain=1&metrics=volume&sort_by=volume&contract_age=current_week&sort_order=desc&offset=0&limit=30&time_range=30d&include_washtrade=true

        //collections?currency=usd&blockchain=1&metrics=volume&sort_by=volume&sort_order=desc&offset=0&limit=100&time_range=30d&include_washtrade=true
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
	const monthlyVolumeTrendsCollection = async (callBack,time) => {


        //market/trend?currency=usd&blockchain=1&metrics=volume&time_range=30d&include_washtrade=false
		try {
			await axios
				.get(
					API_BASE_URL +
						`market/trend?currency=usd&blockchain=1&metrics=volume&time_range=${time}&include_washtrade=false`,
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
	const DailyVolumeTrendsCollection = async(callBack,time) =>{
        // market/trend?currency=usd&blockchain=1&metrics=volume&time_range=24h&include_washtrade=false
		try{
			await axios
				.get(
					API_BASE_URL +
						`market/trend?currency=usd&blockchain=1&metrics=volume&time_range=${time}&include_washtrade=false`,
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
		<VolumeTrendContext.Provider value={{ collectionOfAll, CollectionOfMonthly, monthlyVolumeTrendsCollection, DailyVolumeTrendsCollection}}>
			{children}
		</VolumeTrendContext.Provider>
	);
};
export const UseVolumeTrendGolbalContext = () => {
	return useContext(VolumeTrendContext);
};
