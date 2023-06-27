import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { UseCollectionGolbalContext } from "Context/CollectionProvider";

const Customers = () => {
  const theme = useTheme();
  const { isLoading ,data} = useGetCustomersQuery();
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

  // console.log('all',AllCollection);
  // console.log('monthly collection',monthlyCollection);
  // console.log('weekly collection', weeklyCollection);
  // console.log('daily collection', dailyCollection);

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
    </Box>
  );
};

export default Customers;
