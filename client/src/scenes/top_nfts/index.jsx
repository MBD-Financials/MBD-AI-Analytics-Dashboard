import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCollectionOverviewGlobalContext } from "Context/CollectionOveriewProvider";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import { useGetCustomersQuery } from "state/api";
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
function Top_NFT() {
  const theme = useTheme();
  const { isLoading, data } = useGetCustomersQuery();
  const [nftCollectionByVolume, setNftCollectionByVolume] = useState([]);
  const [nftCollectionByTransaction, setNftCollectionByTransaction] = useState([]);

  // context defined in collectionOverViewProvider file
  const { TopTenNFTByVolume,TransactionNFT } =
    useCollectionOverviewGlobalContext();
  const TopTenNFTCollectionByVolume = async () => {
    await TopTenNFTByVolume((response) => {
      // console.log('all',response);
      setNftCollectionByVolume(response.nfts);
    }, "all");
  };
  const TopTenNFTCollectionByTransaction = async () => {
    await TransactionNFT((response) => {
    //   console.log('allnew',response);
      setNftCollectionByTransaction(response.nfts);
    }, "all");
  };
 
  useEffect(() => {
    TopTenNFTCollectionByVolume();
    TopTenNFTCollectionByTransaction()
  }, []);
  const columns = [
    {
      field: "collection_name",
      headerName: "Collection",
      flex: 1,
    },
    {
      field: "token_id",
      headerName: "Token_ID",
      flex: 1,
    },
    {
      field: "volume",
      headerName: "Volume ",
      flex: 1,
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
  const TopNFT = nftCollectionByVolume.slice(0, 10);
  const copyOfTopTenNFT = [...TopNFT];
  let row = [];
  copyOfTopTenNFT &&
    copyOfTopTenNFT.forEach((col) => {
      row.push({
        collection_name: col.metadata.collection_name,
        token_id: col.metadata.token_id,
        volume: formatNumber(col.metric_values.volume.value),
      });
    });

  const column2 = [
    {
      field: "collection_name",
      headerName: "Collection",
      flex: 1,
    },
    {
      field: "token_id",
      headerName: "Token_ID",
      flex: 1,
    },
    {
      field: "volume",
      headerName: "Volume_USD",
      flex: 1,
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
  let row2 = [];
  nftCollectionByVolume &&
    nftCollectionByVolume.forEach((col) => {
      row2.push({
        collection_name: col.metadata.collection_name,
        token_id: col.metadata.token_id,
        volume: formatNumber(col.metric_values.volume.value),
      });
    });
    const column3 = [
        {
          field: "collection_name",
          headerName: "Collection",
          flex: 1,
        },
        {
          field: "token_id",
          headerName: "Token_ID",
          flex: 1,
        },
        {
          field: "transactions",
          headerName: "Number of transactions",
          flex: 1,
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
    let row3 = [];
    nftCollectionByTransaction &&
    nftCollectionByTransaction.forEach((col) => {
      row3.push({
        collection_name: col.metadata.collection_name,
        token_id: col.metadata.token_id,
        transactions: formatNumber(col.metric_values.transactions.value),
      });
    });
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TOP NFT's" subtitle="List of Top NFT's" />
      {/* Top NFT start  */}
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
        <Box
          sx={{
            padding: "2rem 1rem",
            margin: "2rem 0",
            background: theme.palette.background.alt,
            borderRadius: "0.5rem",
          }}
        >
          <Typography variant="h3">TOP NFT's</Typography>
        </Box>
        <DataGrid
          loading={isLoading || data}
          getRowId={(row) => row.token_id}
          rows={row || []}
          pageSize={10}
          columns={columns}
        />
      </Box>
      {/* Top NFT end  */}

      {/* Top NFT By Volume title start */}

      {/* Top NFT By Volume title end */}


      {/* Top NFT By Volume start */}
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
        <Box
          sx={{
            padding: "2rem 1rem",
            margin: "2rem 0",
            background: theme.palette.background.alt,
            borderRadius: "0.5rem",
          }}
        >
          <Typography variant="h3">Top NFT's by volume</Typography>
        </Box>
        <Box
          sx={{
            padding: "2rem 1rem",
            margin: "2rem 0",
            background: theme.palette.background.alt,
            borderRadius: "0.5rem",
          }}
        >
          <Typography variant="h3">Top NFT's by volume</Typography>
        </Box>
        <DataGrid
          loading={isLoading || data}
          getRowId={(row) => row.token_id}
          rows={row2 || []}
          // pageSize={10}
          columns={column2}
        />
      </Box>
      {/* Top NFT By Volume start */}

      {/* Top NFT By Transaction start*/}
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
        <Box
          sx={{
            padding: "2rem 1rem",
            margin: "2rem 0",
            background: theme.palette.background.alt,
            borderRadius: "0.5rem",
          }}
        >
          <Typography variant="h3">NFTs based on number of Transactions</Typography>
        </Box>
        <Box
          sx={{
            padding: "2rem 1rem",
            margin: "2rem 0",
            background: theme.palette.background.alt,
            borderRadius: "0.5rem",
          }}
        >
          <Typography variant="h3">NFTs based on number of Transactions</Typography>
        </Box>
        <Box
          sx={{
            padding: "2rem 1rem",
            margin: "2rem 0",
            background: theme.palette.background.alt,
            borderRadius: "0.5rem",
          }}
        >
          <Typography variant="h3">NFTs based on number of Transactions</Typography>
        </Box>
        <DataGrid
          loading={isLoading || data}
          getRowId={(row) => row.token_id}
          rows={row3 || []}
          // pageSize={10}
          columns={column3}
        />
      </Box>
      {/* Top NFT By Transaction end*/}
    </Box>
  );
}

export default Top_NFT;
