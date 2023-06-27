import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import { useCollectionOverviewGlobalContext } from "Context/CollectionOveriewProvider";
import StatBox from "components/StatBox";
import { PointOfSale, Traffic } from "@mui/icons-material";
import { TopTenNftHeading } from "Styles/CollectionOverView/CollectionOverview";
import NewBarChart from "components/BarChart";
import BarChartNFT from "components/BarChartNFT";
import NFTPieChart from "components/NFTPieChart";
function formatNumber(number) {
  if (number >= 1000000000) { // Billion
    const formattedNumber = parseFloat((number / 1000000000).toFixed(1));
    return formattedNumber + 'B';
  } else if (number >= 1000000) { // Million
    const formattedNumber = parseFloat((number / 1000000).toFixed(1));
    return formattedNumber + 'M';
  } else if (number >= 1000) { // Thousand
    const formattedNumber = parseFloat((number / 1000).toFixed(1));
    return formattedNumber + 'K';
  } else {
    return number.toString(); // Return as it is if less than 1000
  }
}
const Admin = () => {
  const theme = useTheme();
	const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetAdminsQuery();
  const [allDayVolume, setAllDayVolume] = useState("");
	// const [allDayVolumeChange, setAllDayVolumeChange] = useState("")
  const [allDayTransaction,setAllDayTransaction]= useState("")
  const [allDiamondHand,setAllDiamondHand]=useState("")
  const [AllCollection,setAllCollection]=useState([])
  const [nftCollectionByVolume,setNftCollectionByVolume]= useState([])
  const [transactedNFT,setTransactedNFT] = useState([])
  const {allVolumeCollection, allTransactionCollection,allDiamondHandCollection,collectionOfAll,TopTenNFTByVolume,TransactedNFT}=useCollectionOverviewGlobalContext()
  const allDaysVolumeCollection=async()=>{

		await allVolumeCollection((response)=>{
      // console.log('all',response);
      
      const volume = formatNumber(response.metric_ranges.volume.total)
			// const volumeChange = (Number(response?.metric_values.volume_change.value)).toFixed(2) +"%"
      setAllDayVolume(volume)
			// setAllDayVolumeChange(volumeChange)
		},'all')
		
	}
  const allDaysTransactionCollection=async()=>{

		await allTransactionCollection((response)=>{
      // console.log('all',response);
      
      const volume = formatNumber(response.metric_ranges.transactions.total)
			// const volumeChange = (Number(response?.metric_values.volume_change.value)).toFixed(2) +"%"
      setAllDayTransaction(volume)
			// setAllDayVolumeChange(volumeChange)
		},'all')
		
	}
  const allDaysDiamondHandCollection=async()=>{

		await allDiamondHandCollection((response)=>{
      // console.log('all',response);
      
      const volume = formatNumber(response.metric_ranges.holders_diamond_hands.total)
			// const volumeChange = (Number(response?.metric_values.volume_change.value)).toFixed(2) +"%"
      setAllDiamondHand(volume)
			// setAllDayVolumeChange(volumeChange)
		},'all')
		
	}
  const collectionOfAllDays=async()=>{

		await collectionOfAll((response)=>{
      // console.log('all',response);
      setAllCollection(response.collections)
		},'all')
		
	}
  const TopTenNFTCollectionByVolume=async()=>{

		await TopTenNFTByVolume((response)=>{
      // console.log('all',response);
      setNftCollectionByVolume(response.nfts)
		},'all')
		
	}
  const TransactedNFTCollection=async()=>{

		await TransactedNFT((response)=>{
      // console.log('all',response);
      setTransactedNFT(response.nfts)
		},'all')
		
	}
      

  useEffect(()=>{
    collectionOfAllDays()
    allDaysVolumeCollection()
    allDaysTransactionCollection()
    allDaysDiamondHandCollection()
    TopTenNFTCollectionByVolume()
    TransactedNFTCollection()
  },[])
  // console.log('all',AllCollection);
  const columns = [
    {
      field: "collection",
      headerName: "Collection",
      flex: 1,
    },
    {
      field: "collection_address",
      headerName: "Collection Address",
      flex: 2
    },
    {
      field: "volume_usd",
      headerName: "Volume USD",
      flex: 0.5,
    },
    // {
    //   field: "phoneNumber",
    //   headerName: "Phone Number",
    //   flex: 0.5,
    //   renderCell: (params) => {
    //     return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    //   },
    // },
    // {
    //   field: "country",
    //   headerName: "Country",
    //   flex: 0.4,
    // },
    // {
    //   field: "occupation",
    //   headerName: "Occupation",
    //   flex: 1,
    // },
    // {
    //   field: "role",
    //   headerName: "Role",
    //   flex: 0.5,
    // },
  ];

  let row=[];
  AllCollection && AllCollection.forEach((col)=>{
    
    row.push({
      collection: col.metadata.name,
      collection_address:col.metadata.contract_address.toUpperCase(),
      volume_usd:formatNumber(col.metric_values.volume.value),
    })
  })
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Overview Collection" subtitle="Overveiw collection of all enteries" />
      {/* overAll volume start */}
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
        {/* <StatBox
					title="Last Day Volume"
					value={allDayVolume}
					increase={allDayVolumeChange}
					description="Since last month"
					icon={
						<PointOfSale
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/> */}
        <StatBox
					title="Total Volume"
					value={allDayVolume}
					icon={
						<Traffic
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>
        <StatBox
					title="Total Transaction"
					value={allDayTransaction}
					icon={
						<Traffic
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>
        <StatBox
					title="Total Diamond Hands"
					value={allDiamondHand}
					icon={
						<Traffic
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>
      
      </Box>
      {/* overAll volume end */}

      {/* top 10 nft  start*/}
      <Box sx={{
        padding:'2rem 1rem',
        margin:'2rem 0',
        background:theme.palette.background.alt,
        borderRadius:'0.5rem'
      }}>
      <Typography variant="h2">Top 10 NFT</Typography>
      </Box>
      {/* top 10 nft end  */}

      {/* Top 10 NFT's By Volume start */}
      <Box sx={{
        padding:'2rem 1rem',
        margin:'2rem 0',
        background:theme.palette.background.alt,
        borderRadius:'0.5rem'
      }}>
      <BarChartNFT  collection={nftCollectionByVolume} heading={"Top 10 NFT's By Volume"}/>
      <NFTPieChart newData={transactedNFT}/>

      </Box>
      {/* Top 10 NFT's By Volume end */}


      {/* table start */}
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
      <Typography variant="h3" mb={3}>Collection & Contract Address</Typography>
        <DataGrid
          loading={isLoading || data}
          getRowId={(row) => row.collection_address}
          rows={row || []}
          // pageSize={10}
          columns={columns}
        />
      </Box>
      {/* table end */}

    </Box>
  );
};

export default Admin;
