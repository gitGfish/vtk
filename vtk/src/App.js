import '@kitware/vtk.js/favicon';
import { useState, useRef, useEffect } from 'react';
import Renderer from './components/RendererFullScreen';
import Renderer2 from './components/RendererDiv';
import ButtonComponent from './components/controls'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
function App(){
  const [uiData, setUiData] = useState([{
    i:50, // I Slider inital value [0 - 100] 
    j:50, // J Slider inital value [0 - 100] 
    k:50, // k Slider inital value [0 - 100] 
    ic:true, // I checkBox inital value [false,true]
    jc:true, // J checkBox inital value [false,true]
    kc:true, // K checkBox inital value [false,true]
    c:50, // Color value inital value [0 - 100]
    cw:50 // Color window value inital value [0 - 100]
  }]);

  const [vtiURL, setVtiURL] = useState("");
  
  return (
    <CardContent>
      <Card style={{padding:"15px"}}>
        <div  style={{width:"100%",height:"100%",position:"relative"}}>
          
            <div style={{float:"left",width:"85%",height:"25%"}}>
              <Renderer2  vti={"headsq.vti"} vtiURL={vtiURL} uiData={uiData} />
              
              
            </div>
            <div style={{float:"right",marginRight:"2%",marginTop:"2%"}}>
                <ButtonComponent setUiData={setUiData} uiData={uiData} setVtiURL={setVtiURL}/>
            </div>
          
          
          
        </div>
        </Card>
    </CardContent>
  );
}

export default App;