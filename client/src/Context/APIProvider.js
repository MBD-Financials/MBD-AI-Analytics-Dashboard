import React, { useContext } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_URL;


export const APIContext = React.createContext();

export const APIProvider = ({ children }) => {
	const lastDayVolume = async () => {
		try {
			await axios
				.get(
					API_BASE_URL +
						"market/metrics?currency=usd&metrics=volume&metrics=volume_change&time_range=24h&include_washtrade=true",
					{headers:{'x-api-key': API_KEY}}
				)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<APIContext.Provider value={{ lastDayVolume }}>
			{children}
		</APIContext.Provider>
	);
};
export const useGlobalContext = () => {
	return useContext(APIContext);
};
