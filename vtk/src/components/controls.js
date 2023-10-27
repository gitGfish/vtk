import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


import TextField from '@mui/material/TextField';

/**
 * The ButtonComponent is a React component responsible for rendering a card with UI controls
 * for manipulating slices, color, and color window, as well as input for VTI URL.
 *
 * @param {Object} props - Component properties.
 * @param {array} props.uiData - User interface data or configuration.
 * @param {Function} props.setUiData - Function to set the user interface data.
 * @param {string} props.setVtiURL - Function to set the VTI URL.
 * @returns {JSX.Element} - Rendered component.
 */

function ButtonComponent(props) {
  
  const handleChangeI = (event, newValue) => {
    if(event.type != 'mousedown' && event.type != 'mousemove'){
      props.uiData[0]['ic'] = newValue
    }else{
      
      props.uiData[0]['i'] = newValue 
    }
    
    props.setUiData([...props.uiData]);
  };
  const handleChangeJ = (event, newValue) => {
    if(event.type != 'mousedown' && event.type != 'mousemove'){
      props.uiData[0]['jc'] = newValue
    }else{
      props.uiData[0]['j'] = newValue
    }
    
    props.setUiData([...props.uiData]);
  };
  const handleChangeK = (event, newValue) => {
    if(event.type != 'mousedown' && event.type != 'mousemove'){
      props.uiData[0]['kc'] = newValue
    }else{
      props.uiData[0]['k'] = newValue
    }
    
    props.setUiData([...props.uiData]);
  };

  const handleChangeColor = (event, newValue) => {
    
    props.uiData[0]['c'] = newValue
    
    
    props.setUiData([...props.uiData]);
  };
  const handleChangeColorWindow = (event, newValue) => {
    
    props.uiData[0]['cw'] = newValue
    
    
    props.setUiData([...props.uiData]);
  };

  const handleChangeURL = (event) => {
    props.setVtiURL(event.target.value);

  };
  


  return (
      <Card style={{padding:"15px"}}>
        <Box sx={{ width: 200 }} >
          <TextField
              id="outlined-required"
              label="VTI URL"
              type="search"
              onChange={handleChangeURL}
            />
          <FormControlLabel control={<Checkbox defaultChecked onChange={handleChangeI}/>} label={
            <Typography variant="h5" component="h2">
              Slice I
            </Typography>} />
          <Slider disabled={!props.uiData[0]['ic']} onChange={handleChangeI} defaultValue={50} aria-label="Slice I" valueLabelDisplay="auto" />
          
          <FormControlLabel control={<Checkbox defaultChecked onChange={handleChangeJ}/>} label={
            <Typography variant="h5" component="h2">
              Slice J
            </Typography>} />
          <Slider disabled={!props.uiData[0]['jc']} onChange={handleChangeJ} defaultValue={50} aria-label="Slice J" valueLabelDisplay="auto" />
          <FormControlLabel control={<Checkbox defaultChecked onChange={handleChangeK}/>} label={
            <Typography variant="h5" component="h2">
              Slice K
            </Typography>} />
          <Slider disabled={!props.uiData[0]['kc']} onChange={handleChangeK} defaultValue={50} aria-label="Slice K" valueLabelDisplay="auto" />
          <Typography variant="h5" component="h2">
            color
          </Typography>
          <Slider  onChange={handleChangeColor} defaultValue={50} aria-label="Color" valueLabelDisplay="auto" />
          <Typography variant="h5" component="h2">
            color Window
          </Typography>
          <Slider  onChange={handleChangeColorWindow} defaultValue={50} aria-label="Color Window" valueLabelDisplay="auto" />
        </Box>
      </Card>
    
  );
}

export default ButtonComponent;