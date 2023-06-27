import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import { CartStatisticContainer, NewListItemText, OverViewNavigation } from "Styles/overview-dashboard";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import LinkIcon from '@mui/icons-material/Link';
import { KeyboardArrowRight, LibraryAddCheck, LocalConvenienceStore, PersonAdd, PointOfSale, Traffic, Wallet } from "@mui/icons-material";
import StatBox from "components/StatBox";
import { useTheme } from "@emotion/react";
import { useGlobalContext } from "Context/APIProvider";
function OverviewBlockChain() {
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
        <Header
          title="Overveiw Blockchain"
          subtitle="Welcome to your NFT Dashboard"
        />
        <Divider light/>
        {/* <OverViewNavigation>
            <List sx={{padding:'0',margin:'0',display:'flex'}}>
                
               <NewListItemText>
                    <LinkIcon sx={{color:'black',marginRight:'0.5rem'}}/>Blockchain
               </NewListItemText>
               <NewListItemText>
                    <LibraryAddCheck sx={{color:'black',marginRight:'0.5rem'}}/>Collection
               </NewListItemText>
               <NewListItemText>
                    <LinkIcon sx={{color:'black',marginRight:'0.5rem'}}/>nft
               </NewListItemText>
               <NewListItemText>
                    <LocalConvenienceStore sx={{color:'black',marginRight:'0.5rem'}}/>Marketplace
               </NewListItemText>
               <NewListItemText>
                    <Wallet sx={{color:'black',marginRight:'0.5rem'}}/>wallet
               </NewListItemText>
               <NewListItemText>
                    money laundering
               </NewListItemText>
            </List>
        </OverViewNavigation>
        <OverViewNavigation>
            <List sx={{padding:'0',margin:'0',display:'flex'}}>
                
               <NewListItemText>
                    <KeyboardArrowRight sx={{color:'black',marginRight:'0.5rem'}}/>Overveiw
               </NewListItemText>
               <NewListItemText>
                    <KeyboardArrowRight sx={{color:'black',marginRight:'0.5rem'}}/>Top Collection
               </NewListItemText>
               <NewListItemText>
                    <KeyboardArrowRight sx={{color:'black',marginRight:'0.5rem'}}/>nft
               </NewListItemText>
               <NewListItemText>
                    <KeyboardArrowRight sx={{color:'black',marginRight:'0.5rem'}}/>Collection By created date
               </NewListItemText>
               <NewListItemText>
                    <KeyboardArrowRight sx={{color:'black',marginRight:'0.5rem'}}/>hot Contract
               </NewListItemText>
            
            </List>
        </OverViewNavigation> */}
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
            
            </Box>
    </Box>
  );
}

export default OverviewBlockChain;
