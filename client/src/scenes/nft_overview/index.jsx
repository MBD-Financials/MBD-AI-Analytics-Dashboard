import React, { useEffect, useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  // DownloadOutlined,
  // Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  // Button,
  // Typography,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import BreakdownChart from "components/BreakdownChart";
// import OverviewChart from "components/OverviewChart";
// import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import { UseNFTGolbalContext } from "Context/NFTProvider";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCustomersQuery } from "state/api";
import BarGraph from "components/BarGraph";

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
function fromatDate(dateStr){
  const dateObj = new Date(dateStr);

// Step 2: Extract the year, month, and day from the Date object
const year = dateObj.getFullYear();
const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
const day = String(dateObj.getDate()).padStart(2, '0');

// Step 3: Create the formatted date string
const formattedDate = `${year}-${month}-${day}`;
return formattedDate
}

const NFT_OverView = () => {
  const theme = useTheme();
  const { isLoading, data } = useGetCustomersQuery();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const {
    NftTotalVolume,
    NftWashTradeVolume,
    NftMoneyLaundered,
    NftNoOfSales,
    NftTransaction,
    NftVolume,
  } = UseNFTGolbalContext();

  const [allnftVolume, setAllnftVolume] = useState("");
  const [washTradeVolume, setWashTradeVolume] = useState("");
  const [moneyLaundered, setMoneyLaundered] = useState("");
  const [totalSales, setTotalSales] = useState("");
  const [transactions, setTransaction] = useState([]);
  const [trackerVolume,setTrackerVolume] = useState([])

  const NFTVolume = async () => {
    await NftTotalVolume((response) => {
      // console.log('nft',response);

      const volume = formatNumber(response.metric_ranges.volume.total);
      setAllnftVolume(volume);
    }, "all");
  };
  const NFTWashTrade = async () => {
    await NftWashTradeVolume((response) => {
      // console.log('wash',response);
      const volume = formatNumber(
        response.metric_ranges.washtrade_volume.total
      );

      setWashTradeVolume(volume);
    }, "all");
  };

  const NFTTotalMoneyLaunched = async () => {
    await NftMoneyLaundered((response) => {
      // console.log('money_laundered',response);

      const volume = formatNumber(
        response.metric_ranges.washtrade_suspect_sales.total
      );

      setMoneyLaundered(volume);
    }, "all");
  };
  const NFTTotalNoOfSales = async () => {
    await NftNoOfSales((response) => {
      // console.log('total no of sales',response);

      const volume = formatNumber(response.metric_ranges.sales.total);
      setTotalSales(volume);
    }, "all");
  };
  const NFTTotalTransaction = async () => {
    await NftTransaction((response) => {
      // console.log('transaction',response);
      setTransaction(response.transactions);
    }, "all");
  };
  const NFTTrackerVolume = async () => {
    await NftVolume((response) => {
      // console.log('tracker volume',response);
      setTrackerVolume(response.nfts);
    }, "all");
  };

  const column = [
    {
      field: "seller",
      headerName: "Seller",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 1,
    },
    {
      field: "timestamp",
      headerName: "TimeStamp",
      flex: 0.5,
    },
    {
      field: "is_washtrade",
      headerName: "is_Washtrade",
      flex: 0.5,
    },
    {
      field: "hash",
      headerName: "Hash",
      flex: 1,
    },
  ];
  let rows = [];
  transactions &&
    transactions.forEach((col) => {
      rows.push({
        seller: col.sending_address,
        buyer: col.receiving_address,
        timestamp: fromatDate(col.transaction_date),
        is_washtrade: col.is_washtrade ? "Washtrade":"Not Washtrade",
        hash: col.hash,
      });
    });
  useEffect(() => {
    NFTVolume();
    NFTWashTrade();
    NFTTotalMoneyLaunched();
    NFTTotalNoOfSales();
    NFTTotalTransaction();
    NFTTrackerVolume()
  }, []);


  const firstTenCollection = (collection) => {
    console.log('collection',collection);
    const graphCollection = collection.map((item) => {
      return {
        collection: item.metadata.minted_date,
        volume: item.metric_values.volume.value,
      };
    });
    return graphCollection;
  };
  const graphDate=firstTenCollection(trackerVolume);
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="NFT DASHBOARD"
        subtitle="Welcome to your NFT NFT_OverView"
      />

      {/* nft Statistics box start  */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Total NFT Volume"
          value={allnftVolume}
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Total Wash Trade Volume"
          value={washTradeVolume}
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Money Laundered"
          value={moneyLaundered}
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total No Of Sales"
          value={totalSales}
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
      </Box>
      {/* nft Statistics box end  */}
        <BarGraph data={graphDate} heading={'NFT Tracker (Volume)'}/>
      {/* nft transaction table box start  */}
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
      <Typography variant="h3" mb={3}>NFT transaction details</Typography>
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row.buyer}
          rows={rows || []}
          // pageSize={10}
          columns={column}
        />
      </Box>
      {/* nft transaction table box end  */}

    </Box>
  );
};

export default NFT_OverView;

