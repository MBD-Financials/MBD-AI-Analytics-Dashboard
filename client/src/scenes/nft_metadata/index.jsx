import { useTheme } from "@emotion/react";
import { FormatListBulleted } from "@mui/icons-material";
import {
  Box,
  Button,
  Icon,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { UseNFTGolbalContext } from "Context/NFTProvider";
import {
  NFTCardContainer,
  NFTDataContainer,
  NFTDataShow,
  NFTImage,
  NFTImageContainer,
  NFTInputContainer,
  NFTtraitCart,
  NFTtraitCartType,
  NftDetail,
  NftDetailContainer,
  NftDetailIcon,
  // NftDetailList,
  // NftDetailListLeft,
  // NftDetailListRight,
  // NftDetailListText,
  NftName,
  NftToken,
  NftTraitIcon,
} from "Styles/nft_metadata";
import Header from "components/Header";
import React, { useEffect, useRef, useState } from "react";
import { useGetCustomersQuery } from "state/api";
import NftDetailListContent from "./NftDetailList";
const fakeData = [
  {
    trait_type: "trait name",
    value: 3400,
  },
  {
    trait_type: "trait name",
    value: 3400,
  },
  {
    trait_type: "trait name",
    value: 3400,
  },
  {
    trait_type: "trait name",
    value: 3400,
  },
  {
    trait_type: "trait name",
    value: 3400,
  },
];
function NFT_MetaData() {
  const theme = useTheme();
  const { isLoading, data } = useGetCustomersQuery();
  const allTraitDataRef = useRef([]);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [blockchain_name, setBlockChain_name] = useState("");
  const [blockchain_address, setBlockChain_address] = useState("");
  const [blockchain_token, setBlockchain_token] = useState("");
  const [newObj, setNewObj] = useState({
    name: "",
    address: "",
    token: "",
  });
  const [showImg, setShowImg] = useState(
    "https://images.theconversation.com/files/417198/original/file-20210820-25-1j3afhs.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
  );
  const [nftName, setNftName] = useState("NFTName");
  const [nftToken, setNftToken] = useState("NFTToken");
  const [mintDate, setMintDate] = useState("NFTMintDate");
  const [rarityRank, setRarityRank] = useState("NFTRarityRank");
  const [rarityScore, setRarityScore] = useState("NFTRarityScore");
  const [address, setAddress] = useState("NFTAddress");
  // const [traitData, setTraitData] = useState({});
  const { NftTrait, NftOverAllTrait } = UseNFTGolbalContext();


  const NFTTrait = async (name, address, token) => {
    if (name && address && token) {
      return new Promise((resolve) => {
        NftTrait(
          (response) => {
            resolve(response);
          },
          name,
          address,
          token
        );
      });
    }
  };

  // const NFTOverAllTrait = async (name, address, token) => {
  //   if (name && address && token) {
  //     await NftOverAllTrait(
  //       (response) => {
  //         // console.log("all", response);
  //         setAllTraitData(response.traits);
  //       },
  //       name,
  //       address,
  //       token
  //     );
  //   }
  // };
  const NFTOverAllTrait = async (name, address, token) => {
    if (name && address && token) {
      return new Promise((resolve) => {
        NftOverAllTrait(
          (response) => {
            resolve(response.traits);
          },
          name,
          address,
          token
        );
      });
    }
  };

  const filterHandler = async (e) => {
    e.preventDefault();
    // setNewObj({
    //   name: blockchain_name,
    //   address: blockchain_address,
    //   token: blockchain_token,
    // });
    try {
      const traitResponse = await NFTTrait(
        blockchain_name,
        blockchain_address,
        blockchain_token
      );
      const traitData = traitResponse;
      // console.log('trait',traitData);
      // && traitData.collection_name && traitData.token_id && traitData.address && traitData.mint_date && traitData.rarity_rank && traitData.rarity_score
      // await NFTOverAllTrait(blockchain_name,blockchain_address, blockchain_token);
      const allTraitDataResponse = await NFTOverAllTrait(
        blockchain_name,
        blockchain_address,
        blockchain_token
      );
     
      if (
        traitData &&
        traitData.token_image_url &&
        traitData.collection_name &&
        traitData.token_id &&
        traitData.address &&
        traitData.mint_date && 
        allTraitDataResponse
      ) {
        setNftName(traitData.collection_name);
        setShowImg(traitData.token_image_url);
        setAddress(traitData.address);
        setNftToken(traitData.token_id);
        setMintDate(traitData.mint_date);
        setRarityRank(traitData.rarity_rank);
        setRarityScore(traitData.rarity_score);
        allTraitDataRef.current = allTraitDataResponse;

      }
    } catch (error) {
      console.error(error);
      // Handle error if necessary
    }
  };

  // useEffect(() => {
  //   NFTTrait(newObj.name, newObj.address, newObj.token);
  //   NFTOverAllTrait(newObj.name, newObj.address, newObj.token);
  // }, [newObj.name, newObj.address, newObj.token]);
  // console.log("trait", traitData);
  // console.log("all trait", allTraitData);
  // const column = [
  //   {
  //     field: "image",
  //     headerName: "Image",
  //     flex: 1,
  //     renderCell: (params) => (
  //       <div
  //         style={{
  //           width: "100px", // Set the desired width
  //           height: "100px", // Set the desired height
  //         }}
  //       >
  //         <img
  //           src={params.value}
  //           alt="Token Image"
  //           style={{ width: "100%", height: "100%" }}
  //         />
  //       </div>
  //     ),
  //   },
  //   {
  //     field: "token_rarity",
  //     headerName: "Token_rarity",
  //     flex: 1,
  //   },
  //   {
  //     field: "rank",
  //     headerName: "Rank",
  //     flex: 0.5,
  //   },
  // ];
  // let rows = [];
  // const rowData = {
  //   image: traitData?.token_image_url || null,
  //   token_rarity: traitData?.address || null,
  //   rank: traitData?.token_id || null,
  // };
  // if (rowData.token_rarity) {
  //   rows.push(rowData);
  // }
  // console.log(rows);
  // console.log('show', showImg);
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="NFT DASHBOARD"
        subtitle="Welcome to your NFT NFT_Metadata"
      />
      <NFTInputContainer
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Blockchain"
          variant="outlined"
          value={blockchain_name}
          onChange={(e) => setBlockChain_name(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Blockchain_addrass"
          variant="outlined"
          value={blockchain_address}
          onChange={(e) => setBlockChain_address(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Blockchain_token"
          variant="outlined"
          value={blockchain_token}
          onChange={(e) => setBlockchain_token(e.target.value)}
        />
        <Button variant="outlined" onClick={filterHandler}>
          Filter
        </Button>
      </NFTInputContainer>

      <NFTDataShow>
        <NFTImageContainer>
          <NFTImage src={showImg} />
        </NFTImageContainer>
        <NFTDataContainer>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            flexDirection={{ md: "row", xs: "column" }}
          >
            <NftName>{nftName}</NftName>
            <NftToken>#{nftToken}</NftToken>
          </Box>
          <NftDetailContainer>
            <Box display={"flex"} alignItems={"center"} padding={"2rem 0"}>
              <NftDetailIcon />
              <NftDetail>Details</NftDetail>
            </Box>
            <NftDetailListContent label={"Contract Address"} text={address} />
            <NftDetailListContent label={"Token ID"} text={nftToken} />
            <NftDetailListContent label={"Mint_date"} text={mintDate} />
            <NftDetailListContent label={"Rarity_rank"} text={rarityRank} />
            <NftDetailListContent label={"Rarity_score"} text={rarityScore} />
          </NftDetailContainer>

          <NftDetailContainer>
            <Box display={"flex"} alignItems={"center"} padding={"2rem 0"}>
              <NftTraitIcon />
              <NftDetail>Traits</NftDetail>
            </Box>
            <NFTCardContainer>
              {allTraitDataRef.current && allTraitDataRef.current.map((item, index) => (
                <NFTtraitCart key={index}>
                  <NFTtraitCartType>{item.trait_type}</NFTtraitCartType>
                  <NFTtraitCartType>{item.value}</NFTtraitCartType>
                </NFTtraitCart>
              ))}
            </NFTCardContainer>
          </NftDetailContainer>
        </NFTDataContainer>
      </NFTDataShow>

      {/* <Box
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
        <Typography variant="h3" mb={3}>
          NFT transaction details
        </Typography>
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row.token_rarity}
          rows={rows || []}
          // pageSize={10}
          columns={column}
        />
      </Box> */}
    </Box>
  );
}

export default NFT_MetaData;

// 0x4e1f41613c9084fdb9e34e11fae9412427480e56

// 9559
