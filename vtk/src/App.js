import '@kitware/vtk.js/favicon';
import { useState, useRef, useEffect } from 'react';
import Renderer from './components/RendererFullScreen';
import Renderer2 from './components/RendererDiv';
import ButtonComponent from './components/controls'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
function App(){
  const [uiData, setUiData] = useState([{
    i:50,
    j:50,
    k:50,
    ic:true,
    jc:true,
    kc:true,
    c:50,
    cw:50
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