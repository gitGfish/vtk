import '@kitware/vtk.js/favicon';
import { useState, useRef, useEffect } from 'react';

import Renderer from './components/Renderer';


function App(){
  
  return (
    <div  >
      <Renderer  vti={"headsq.vti"}/>
    </div>
  );
}

export default App;