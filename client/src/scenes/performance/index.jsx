import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetUserPerformanceQuery } from "state/api";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import { UseCollectionGolbalContext } from "Context/CollectionProvider";
import OverviewChart from "components/OverviewChart";

const Performance = () => {
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);
  const theme = useTheme();
  // console.log("data", data);
  const [AllCollection, setAllCollection] = useState([]);
  const [monthlyCollection, setMonthlyCollection] = useState([]);
  const [weeklyCollection, setWeeklyCollection] = useState([]);
  const [dailyCollection, setDailyCollection] = useState([]);
  // const [data,setData]= useState()
  const {
    collectionOfAll,
    CollectionOfMonthly,
    CollectionofWeekly,
    CollectionOfDaily,
  } = UseCollectionGolbalContext();
  const collectionOfAllDays = async () => {
    await collectionOfAll((response) => {
      // console.log('all',response);
      setAllCollection(response.collections);
    }, "all");
  };
  const collectionOfOneMonth = async () => {
    await CollectionOfMonthly((response) => {
      // console.log('monthly',response);
      setMonthlyCollection(response.collections);
    }, "30d");
  };
  const collectionOfOneWeek = async () => {
    await CollectionofWeekly((response) => {
      // console.log('weekly',response);
      setWeeklyCollection(response.collections);
    }, "7d");
  };

  const collectionOfPerDay = async () => {
    await CollectionOfDaily((response) => {
      // console.log('weekly',response);
      setDailyCollection(response.collections);
    }, "24h");
  };
  const columns = [
    {
      field: "blockchain",
      headerName: "blockchain",
      flex: 1,
    },
    {
      field: "name",
      headerName: "AllCollection",
      flex: 2,
    },

    {
      field: "daily",
      headerName: "daily",
      flex: 0.5,
      // renderCell: (params) => {
      //   return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      // },
    },
    {
      field: "weekly",
      headerName: "weekly",
      flex: 0.4,
    },
    {
      field: "monthly",
      headerName: "monthly",
      flex: 0.5,
    },
    {
      field: "value",
      headerName: "all time",
      flex: 0.5,
    },
    {
      field: "rank",
      headerName: "rank",
      flex: 0.5,
      // renderCell: (params) => {
      //   return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      // },
    },
  ];
  useEffect(() => {
    collectionOfAllDays();
    collectionOfOneMonth();
    collectionOfOneWeek();
    collectionOfPerDay();
  }, []);
  const fillterContent = () => {
    var newArray = [];

    // Key property to match
    var keyProperty = "name";

    // Search and push matching objects from complete array
    for (let i = 0; i < AllCollection.length; i++) {
      (function (completeObject) {
        var newcompletObject = AllCollection[i];

        // Search for matching object in the monthly array
        var monthlyObject = monthlyCollection.find(function (obj) {
          return obj.metadata[keyProperty] === completeObject[keyProperty];
        });

        // Search for matching object in the weekly array
        var weeklyObject = weeklyCollection.find(function (obj) {
          return obj.metadata[keyProperty] === completeObject[keyProperty];
        });

        // Search for matching object in the daily array
        var dailyObject = dailyCollection.find(function (obj) {
          return obj.metadata[keyProperty] === completeObject[keyProperty];
        });

        // Create the new object with the desired format
        var newObject = {
          allData: newcompletObject,
          monthlyData: monthlyObject ? monthlyObject : null,
          weeklyData: weeklyObject ? weeklyObject : null,
          dailyData: dailyObject ? dailyObject : null,
        };

        // Push the new object into the new array
        newArray.push(newObject);
      })(AllCollection[i].metadata);
    }

    // Display the new array
    return newArray;
  };
  const filterData = fillterContent();

  // setData(filterData)
  // console.log(filterData);
  const rows = [];
  filterData &&
    filterData.forEach((col, index) => {
      function formatNumber(number) {
        if (number >= 1000000000) {
          // Billion
          const formattedNumber = parseFloat((number / 1000000000).toFixed(1));
          return formattedNumber + "B";
        } else if (number >= 1000000) {
          // Million
          const formattedNumber = parseFloat((number / 1000000).toFixed(1));
          return formattedNumber + "M";
        } else if (number >= 1000) {
          // Thousand
          const formattedNumber = parseFloat((number / 1000).toFixed(1));
          return formattedNumber + "K";
        } else {
          return number.toString(); // Return as it is if less than 1000
        }
      }

      rows.push({
        blockchain: "ethereum",
        name: col.allData.metadata.name,
        daily:
          col.dailyData?.metric_values?.volume?.value || null
            ? formatNumber(col.dailyData.metric_values.volume.value)
            : 0,
        weekly:
          col.weeklyData?.metric_values?.volume?.value || null
            ? formatNumber(col.weeklyData.metric_values.volume.value)
            : 0,
        monthly:
          col.monthlyData?.metric_values?.volume?.value || null
            ? formatNumber(col.monthlyData.metric_values.volume.value)
            : 0,
        value: formatNumber(col.allData.metric_values.volume.value),
        rank: index + 1,
      });
    });
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TOP COLLECTION" subtitle="List of Top Collection" />
      {/* Volume By Collection Start */}

      <Box
        sx={{
          padding: "2rem 1rem",
          margin: "2rem 0",
          background: theme.palette.background.alt,
          borderRadius: "0.5rem",
        }}
      >
        <Typography variant="h3">Volume by collection</Typography>
      </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || data}
          getRowId={(row) => row.name}
          rows={rows || []}
          // pageSize={10}
          columns={columns}
        />
      </Box>
        {/* Volume By Collection end */}


        {/*Volume by month start */}

        <Box
        sx={{
          padding: "2rem 1rem",
          margin: "2rem 0",
          background: theme.palette.background.alt,
          borderRadius: "0.5rem",
        }}
      >
        <Typography variant="h3">Volume by month</Typography>
      </Box>

      <Box
					gridColumn="span 12"
					gridRow="span 3"
					backgroundColor={theme.palette.background.alt}
					p="1rem"
					borderRadius="0.55rem"
          height={'100vh'}
				>
					<h2>One Month Volume (USD)</h2>
					<OverviewChart view="sales" isDashboard={true} />
				</Box>
        {/*Volume by month end */}

    </Box>
  );
};

export default Performance;
