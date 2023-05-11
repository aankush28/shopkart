import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WindowIcon from '@mui/icons-material/Window';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import PrintIcon from '@mui/icons-material/Print';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import './nav.css'
import { Link, useNavigate } from 'react-router-dom';
function Header() {
  const [open, setOpen] = React.useState(false);
 const native = useNavigate()
  const actions = [
    { icon: <WindowIcon style={{fontSize:"2rem"}}/>, name: 'Home',url:home},
    { icon: <ViewCarouselIcon style={{fontSize:"2rem"}}/>, name: 'Products',url:products },
    { icon: <TravelExploreIcon style={{fontSize:"2rem"}} />, name: 'Search',url:search },
    { icon:<AccountCircleIcon style={{fontSize:"2rem"}}/> , name: 'Profile', url: login },
    
  ];
function home(params) {
  native("/")
  }
  function products(params) {
    native("/products")
  }
  function search(params) {
    native("/search")
  }
  function login(params) {
    native("/login")
  }


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      
      
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <div  style={{ zIndex: "12"}}  className="speedDial1"   
      >
<h1><Link to={"/"}>Shopkart</Link></h1>
      </div>
      
        <SpeedDial
         
        ariaLabel="SpeedDial tooltip example"
        icon={<ExpandCircleDownIcon style={{fontSize:"4rem"}}/>}
        
          style={{ zIndex: "11", paddingBottom: 5 }}
          onClose={handleClose}
          onOpen={handleOpen}
          
          open={open}
          direction="down"
          className="speedDial2"
        
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.url}
            
           
          />
        ))}
      </SpeedDial> 
    </>
  )
}

export default Header
