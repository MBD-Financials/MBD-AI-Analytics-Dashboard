import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "state/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";
import { UseCollectionGolbalContext } from "Context/CollectionProvider";
import NewBarChart from "components/BarChart";
import OverviewChart from "components/OverviewChart";

const Geography = () => {
  const theme = useTheme();
  const { data } = useGetGeographyQuery();
  const [monthlyCollection, setMonthlyCollection] = useState([]);
  const [weeklyCollection, setWeeklyCollection] = useState([]);
  const [dailyCollection, setDailyCollection] = useState([]);
  const { CollectionOfMonthly, CollectionofWeekly, CollectionOfDaily } =
    UseCollectionGolbalContext();

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
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        collectionOfOneMonth(),
        collectionOfOneWeek(),
        collectionOfPerDay(),
      ]);
    };
  
    fetchData();
  }, []);


  // const firstTenMonthlyCollection = monthlyCollection.splice(0, 10);
  // const firstTenWeeklyCollection = weeklyCollection.splice(0, 10);

  // const firstTenCollection=()=>{
  //   const firstTenDailyCollection = dailyCollection.slice(0, 10);
  //   const copyOffirstTenDailyCollection = [...firstTenDailyCollection];
  //     const  graphCollection = 
  //        copyOffirstTenDailyCollection.map((item) => {
  //       return {
  //         collection: item.metadata.name,
  //         volume: item.metric_values.volume.value,
  //       };
  //     });
  //     return graphCollection
  // }
  // const dailyBaseCollection= firstTenCollection()
  
  
  

  // const testdata = [
  //   { "collection": 'Collection 1', "volume": 100 },
  //   { "collection": 'Collection 2', "volume": 200 },
  //   { "collection": 'Collection 3', "volume": 10 },
  //   { "collection": 'Collection 4', "volume": 20 },
  //   { "collection": 'Collection 5', "volume": 120 },
  //   { "collection": 'Collection 6', "volume": 90 },
  //   { "collection": 'Collection 7', "volume": 80 },
  //   { "collection": 'Collection 8', "volume": 70 },
  //   { "collection": 'Collection 9', "volume": 60 }
  // ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Hot Contracts" subtitle="Entire Hot Contract lists" />
    

       <NewBarChart  collection={dailyCollection} heading={'One daily Volume (USD)'}/>
       <NewBarChart  collection={weeklyCollection} heading={'One weekly Volume (USD)'}/>
       <NewBarChart  collection={monthlyCollection} heading={'One monthly Volume (USD)'}/>

        
      {/* <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? (
          <ResponsiveChoropleth
            data={data}
            
          />
        ) : (
          <>Loading...</>
        )}
      </Box> */}
    </Box>
  );
};

export default Geography;
