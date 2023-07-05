import { FormatListBulleted, StackedBarChart } from "@mui/icons-material";
import { Icon, Typography, styled } from "@mui/material";
import { Box, border, margin } from "@mui/system";

export const NFTInputContainer= styled(Box)(({theme})=>({
    display:'flex',
    // justifyContent:'space-between',
    alignItems:'center',
    margin:'1rem 0',
    border:'1px solid #fff',
    padding:'1rem',
    [theme.breakpoints.down("md")]:{
        flexDirection:'column'
    }
}))

export const NFTDataShow= styled(Box)(({theme})=>({
    display: 'flex',
    padding:'1rem 2rem',
    justifyContent:'space-between',
    alignItems:'flex-start',
    [theme.breakpoints.down("md")]:{
        flexDirection:'column',
        padding:'1rem'
    },  
    border:'1px solid #fff'
}))
export const NFTImageContainer= styled(Box)(({theme})=>({ 
    width:'80%',
    padding:'1rem',
    border:`1px solid ${theme.palette.primary.light}`,
    borderRadius:'0.5rem'
}))
export const NFTImage= styled("img")(({src,theme})=>({
    src:`url(${src})`,
    width:'100%',
    height:'100%',
    borderRadius:'0.5rem'
}))
export const NFTDataContainer= styled(Box)(({theme})=>({ 
    width:'100%',
    padding:'1rem',
    
}))

export const NftName=styled(Typography)(({theme})=>({
    fontWeight:600,
    fontSize:'1.5rem',
    color: theme.palette.secondary.light,
    letterSpacing:'0.2rem'
}))
export const NftToken = styled(Typography)(({theme})=>({
    fontWeight:400,
    fontSize:'1.2rem',
    color: theme.palette.secondary.dark,
    letterSpacing:'0.1rem',

}))
export const NftDetailContainer=styled(Box)(({theme})=>({
    display:'flex',
    flexDirection:'column',
    margin:'2rem 0',
    padding:'0 1rem',
    border:`1px solid ${theme.palette.primary.light}`,
    borderRadius:'0.5rem'

}))
export const NftDetailIcon=styled(FormatListBulleted)(({theme})=>({
    fontWeight:600,
    marginRight:'1rem',
    fontSize:'1.5rem',
    color: theme.palette.secondary.main,

}))
export const NftTraitIcon=styled(StackedBarChart)(({theme})=>({
    fontWeight:600,
    marginRight:'1rem',
    fontSize:'1.5rem',
    color: theme.palette.secondary.main,

}))
export const NftDetail=styled(Typography)(({theme})=>({
    fontWeight:600,
    fontSize:'1.5rem',
    color: theme.palette.secondary.main,
    letterSpacing:'0.2rem'
}))
export const NftDetailList= styled(Box)(({theme})=>({
    display:'flex',
    padding:'1rem',
    
    justifyContent:'space-between',
    [theme.breakpoints.down("md")]:{
        flexDirection:'column',
        gap:'1rem',
    }
}))
export const NftDetailListLeft= styled(Box)(({theme})=>({
    display:'flex',
    flex:0.6
}))
export const NftDetailListRight= styled(Box)(({theme})=>({
    display:'flex',
    flex:1
}))
export const NftDetailListText=styled(Typography)(({theme})=>({
    fontWeight:400,
    fontSize:'1rem',
    color: theme.palette.secondary.main,
}))

export const NFTCardContainer= styled(Box)(({theme})=>({
    display:'flex',
    flexWrap:'wrap',
    gap:'1rem',
    // justifyContent:'space-evenly',
    padding:'1rem 0'
}))
export const NFTtraitCart=styled(Box)(({theme})=>({
    display:'flex',
    flexDirection:"column",
    padding:'0.5rem',
    border:`1px solid ${theme.palette.primary.light}`,
    borderRadius:'0.5rem',
    margin:'0.5rem'
}))

export const NFTtraitCartType=styled(Typography)(({theme})=>({
    fontWeight:400,
    fontSize:'1.2rem',
    color:theme.palette.secondary.main
}))