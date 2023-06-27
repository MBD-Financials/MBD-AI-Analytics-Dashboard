import styled from "@emotion/styled";
import { BorderBottom, Padding } from "@mui/icons-material";
import { Box, List, ListItem } from "@mui/material";
import { tokensDark } from "theme";

export const OverViewNavigation=styled(Box)(()=>({
    margin:'2rem 0',
    width:"100%",
    background: tokensDark.skin,
    display:'flex',
    padding:'0 1rem'

}))
export const UnoderList=styled(List)(()=>({
    padding:0,
    marign:0,
    display:"flex",
    justifyContent:'space-between',
    alignItems:'center'
}))
export const NewListItemText=styled(Box)(()=>({
    
    textTransform:'uppercase',
    cursor:'pointer',
    position:'relative',
    padding:'0.5rem',
    color:'black',
    display:'flex',
    // borderBottom:'0.2rem solid black'
}))


export const CartStatisticContainer=styled(Box)(({theme})=>({
    display:'flex',
    flex:"1 1 100%",
    flexDirection:'column',
    background:theme.palette.background.alt,
    borderRadius:'0.55rem'
}))




