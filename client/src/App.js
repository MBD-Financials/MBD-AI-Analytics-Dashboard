import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import OverviewBlockChain from "scenes/blockchain/blockChainOverview";
import Top_NFT from "scenes/top_nfts";
import NFT_OverView from "scenes/nft_overview";
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/overview-blockchain" element={<OverviewBlockChain />} />
              <Route path="/top-collections" element={<Customers />} />
              <Route path="/collection-by-created-date" element={<Transactions />} />
              <Route path="/hot-contracts" element={<Geography />} />
              <Route path="/wallet-trends" element={<Overview />} />
              <Route path="/volume-trends" element={<Daily />} />
              <Route path="/minting" element={<Monthly />} />
              <Route path="/Volume-by-sale-type" element={<Breakdown />} />
              <Route path="/overview-collections" element={<Admin />} />
              <Route path="/collection-volume" element={<Performance />} />

              <Route path="/collection-event-pattern" element={<Performance />} />
              <Route path="/top-nft's" element={<Top_NFT />} />
              <Route path="/sale-type-volume" element={<Performance />} />
              <Route path="/nft" element={<Performance />} />
              <Route path="/nft-tracker-(volume)" element={<Performance />} />
              <Route path="/overview-nft" element={<NFT_OverView />} />
              <Route path="/metadata-nft" element={<Performance />} />

              <Route path="/overview-marketplace" element={<Performance />} />
              <Route path="/marketplace-volume" element={<Performance />} />
              <Route path="/overview-wallets" element={<Performance />} />
              <Route path="/wallet-specific" element={<Performance/>}/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
