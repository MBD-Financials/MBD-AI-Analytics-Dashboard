import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Analytics
  
} from "@mui/icons-material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InsightsIcon from '@mui/icons-material/Insights';
import ImageIcon from '@mui/icons-material/Image';
import WalletIcon from '@mui/icons-material/Wallet';
import CollectionsIcon from '@mui/icons-material/Collections';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "BLOCKCHAIN" ,
    icon: null,
  },
  {
    text: "Overview Blockchain",
    icon: <RemoveRedEyeIcon />,
  },
  {
    text: "Top Collections",
    icon: <EqualizerIcon />,
  },
  {
    text: "Collection by created date",
    icon: <InsightsIcon />,
  },
  {
    text: "Hot Contracts",
    icon: <AutoAwesomeIcon />,
  },
  {
    text: "Wallet trends",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    text: "Volume trends",
    icon: <InsightsIcon />,
  },
  {
    text: "Minting",
    icon: <GetAppIcon />,
  },
  {
    text: "Volume by sale type",
    icon: <InsightsIcon />,
  },
  {
    text: "COLLECTIONS",
    icon: null,
  },
  {
    text: "Overview Collections",
    icon: <RemoveRedEyeIcon />,
  },
  {
    text: "Collection Volume",
    icon: <InsightsIcon />,
  },
  {
    text: "Collection event pattern",
    icon: <CollectionsIcon />,
  },
  {
    text: "Top NFT's",
    icon: <EqualizerIcon />,
  },
  {
    text: "Sale type volume",
    icon: <InsightsIcon />,
  },
  // {
  //   text: "NFT",
  //   icon: <ImageIcon />,
  // },
  {
    text: "NFT Tracker (Volume)",
    icon: <InsightsIcon />,
  },
  {
    text: "NFT",
    icon: null,
  },
  {
    text: "Overview NFT",
    icon: <RemoveRedEyeIcon />,
  },
  {
    text: "MetaData NFT",
    icon: <Analytics />,
  },
  {
    text: "MARKETPLACE",
    icon: null,
  },
  {
    text: "Overview Marketplace",
    icon: <RemoveRedEyeIcon />,
  },
  {
    text: "Marketplace Volume",
    icon: <InsightsIcon />,
  },

  {
    text: "WALLET",
    icon: null,
  },
  {
    text: "Overview Wallets",
    icon: <RemoveRedEyeIcon />,
  },
  {
    text: "Wallet Specific",
    icon: <WalletIcon />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    MBD AI Analytics
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase().split(' ').join('-');
               
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px",
                }}
              />
            </FlexBetween>
          </Box> */}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
