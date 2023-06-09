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
} from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
// import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import { useGlobalContext } from "../../Context/APIProvider";
const Dashboard = () => {
	const theme = useTheme();
	const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
	const { volumeOfNfts, totalCollections, totalWallets } = useGlobalContext();

	const [oneDayVolume, setOneDayVolume] = useState("");
	const [oneDayVolumeChange, setOneDayVolumeChange] = useState("")

	const [sevenDayVolumeChange, setSevenDayVolumeChange] = useState("")
	const [sevenDayVolume, setSevenDayVolume] = useState("")

	const [thirtyDayVolumeChange, setThirtyDayVolumeChange] = useState("")
	const [thirtyDayVolume, setThirtyDayVolume] = useState("")

	const [allTimeVolumeChange, setAllTimeVolumeChange] = useState("")
	const [allTimeVolumeNFTs, setAllTimeVolumeNFTs] = useState("")

	const [totalCollectionCount, setTotalCollectionCount] = useState("")

	const [allWallets, setAllWallets] = useState("")


	const volumeLastDay = async()=>{

		await volumeOfNfts((response)=>{
			const volume = (Number(response?.metric_values.volume.value) / 1.0e+6).toFixed(2) + " M"
			const volumeChange = (Number(response?.metric_values.volume_change.value)).toFixed(2) +"%"
			setOneDayVolume(volume)
			setOneDayVolumeChange(volumeChange)
		},'24h')
		
	}
	const volumeSevenDays = async()=>{

		await volumeOfNfts((response)=>{
			const volume = (Number(response?.metric_values.volume.value) / 1.0e+6).toFixed(2) + " M"
			const volumeChange = (Number(response?.metric_values.volume_change.value)).toFixed(2) +"%"
			setSevenDayVolume(volume)
			setSevenDayVolumeChange(volumeChange)
		},'7d')
		
	}

	const volumeThirtyDays = async()=>{

		await volumeOfNfts((response)=>{
			const volume = (Number(response?.metric_values.volume.value) / 1.0e+9).toFixed(2) + " B"
			const volumeChange = (Number(response?.metric_values.volume_change.value)).toFixed(2) +"%"
			setThirtyDayVolume(volume)
			setThirtyDayVolumeChange(volumeChange)
		},'30d')
		
	}
	const allTimeVolume = async()=>{

		await volumeOfNfts((response)=>{
			const volume = (Number(response?.metric_values.volume.value) / 1.0e+9).toFixed(2) + " B"
			const volumeChange = (Number(response?.metric_values.volume_change.value)).toFixed(2) +"%"
			setAllTimeVolumeNFTs(volume)
			setAllTimeVolumeChange(volumeChange)
		},'all')
		
	}
	
	const allCollection = async() =>{
		await totalCollections((response)=>{
			const totalCount = (Number(response?.pagination.total_items) / 1.0e+3).toFixed(2) + " K"
			setTotalCollectionCount(totalCount)
		})
	}

	const allTimeWalletsCount = async () =>{
		await totalWallets ((response)=>{
			const totalCount = (Number(response?.pagination.total_items) / 1.0e+6).toFixed(2) + " M"
			setAllWallets(totalCount)
		})
	}



 	useEffect(() => {
		volumeLastDay();
		volumeSevenDays();
		volumeThirtyDays();
		allTimeVolume();	
		allCollection();
		allTimeWalletsCount();
	},[])


	return (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Header
					title="NFT DASHBOARD"
					subtitle="Welcome to your NFT Dashboard"
				/>

				{/* <Box>
					<Button
						sx={{
							backgroundColor: theme.palette.secondary.light,
							color: theme.palette.background.alt,
							fontSize: "14px",
							fontWeight: "bold",
							padding: "10px 20px",
						}}
					>
						<DownloadOutlined sx={{ mr: "10px" }} />
						Download Reports
					</Button>
				</Box> */}
			</FlexBetween>

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
				{/* ROW 1 */}

				<StatBox
					title="Last Day Volume"
					value={oneDayVolume}
					increase={oneDayVolumeChange}
					description="Since last month"
					icon={
						<PointOfSale
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>

				<StatBox
					title="7 Days Volume"
					value={sevenDayVolume}
					increase={sevenDayVolumeChange}
					description="Since last month"
					icon={
						<PersonAdd
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>
				<StatBox
					title="30 Days Volume"
					value={thirtyDayVolume}
					increase={thirtyDayVolumeChange}
					description="Since last month"
					icon={
						<Traffic
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>
				<StatBox
					title="Total Volume"
					value={allTimeVolumeNFTs}
					increase={allTimeVolumeChange}
					description="Since last month"
					icon={
						<Traffic
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>
				<StatBox
					title="Total Collections"
					value={totalCollectionCount}
					increase=""
					icon={
						<Traffic
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>
				
				<StatBox
					title="Total Unique Wallets"
					value={allWallets}
					icon={
						<Traffic
							sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
						/>
					}
				/>

				<Box
					gridColumn="span 12"
					gridRow="span 3"
					backgroundColor={theme.palette.background.alt}
					p="1rem"
					borderRadius="0.55rem"
				>
					<h2>One Month Volume (USD)</h2>
					<OverviewChart view="sales" isDashboard={true} />
				</Box>

				{/* ROW 2 */}
				{/* <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box> */}
				{/* <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box> */}
			</Box>
		</Box>
	);
};

export default Dashboard;
