const { styled, Box } = require("@mui/material");

export const BarChartContainer=styled(Box)(({theme})=>({
    backgroundColor:theme.palette.background.alt,
    padding:"1rem 1rem 5rem 1rem",
    borderRadius:"0.55rem",
    marginTop:"40px",
    height:"80vh",
    width: '100%',
    border:`1px solid ${theme.palette.secondary[200]}`,
    [theme.breakpoints.down("md")]:{
        height:'100vh'
    }
}))