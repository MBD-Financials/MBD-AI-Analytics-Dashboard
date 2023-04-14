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
						`market/metrics?currency=usd&metrics=volume&metrics=volume_change&time_range=${time}&include_washtrade=true`,
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
		<APIContext.Provider value={{ volumeOfNfts}}>
			{children}
		</APIContext.Provider>
	);
};
export const useGlobalContext = () => {
	return useContext(APIContext);
};
