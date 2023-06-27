import React, { useEffect, useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseVolumeTrendGolbalContext } from "Context/VolumeTrendProvider";
import TrendVolumeBarChart from "components/TrendVolumeBarChart";
// import MyResponsiveBar from "components/TrendVolumeBarChart";

const Daily = () => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const { data } = useGetSalesQuery();
  const theme = useTheme();
  const [dialyVolumeTrend,setDailyVolumeTrend]= useState([])
  const [monthlyVolumeTrend,setMonthlyVolumeTrend]= useState([])
  const {monthlyVolumeTrendsCollection, DailyVolumeTrendsCollection}= UseVolumeTrendGolbalContext()

  const volumeTrendOfDaily = async () => {
    await DailyVolumeTrendsCollection((response) => {
      // console.log("all", response);
      setDailyVolumeTrend(response.data_points);
    }, "24h");
  };
  const volumeTrendOfMonthly = async () => {
    await monthlyVolumeTrendsCollection((response) => {
      // console.log("all", response);
      setMonthlyVolumeTrend(response.data_points);
    }, "30d");
  };
  useEffect(()=>{
    volumeTrendOfDaily()
    volumeTrendOfMonthly()
  },[])
  console.log('daily',dialyVolumeTrend);
  console.log('monthly',monthlyVolumeTrend);
  

  // const [formattedData] = useMemo(() => {
  //   if (!data) return [];

  //   const { dailyData } = data;
  //   const totalSalesLine = {
  //     id: "totalSales",
  //     color: theme.palette.secondary.main,
  //     data: [],
  //   };
  //   const totalUnitsLine = {
  //     id: "totalUnits",
  //     color: theme.palette.secondary[600],
  //     data: [],
  //   };

  //   Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
  //     const dateFormatted = new Date(date);
  //     if (dateFormatted >= startDate && dateFormatted <= endDate) {
  //       const splitDate = date.substring(date.indexOf("-") + 1);

  //       totalSalesLine.data = [
  //         ...totalSalesLine.data,
  //         { x: splitDate, y: totalSales },
  //       ];
  //       totalUnitsLine.data = [
  //         ...totalUnitsLine.data,
  //         { x: splitDate, y: totalUnits },
  //       ];
  //     }
  //   });

  //   const formattedData = [totalSalesLine, totalUnitsLine];
  //   return [formattedData];
  // }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DAILY SALES" subtitle="Chart of daily sales" />
      <TrendVolumeBarChart collection={dialyVolumeTrend} heading={'Last Day Trend (USD)'}/>
      <TrendVolumeBarChart collection={monthlyVolumeTrend} heading={'Last Month Trend (USD)'}/>
      {/* <MyResponsiveBar/> */}
    </Box>
  );
};

export default Daily;
