import '@kitware/vtk.js/favicon';
import { useState, useRef, useEffect } from 'react';
// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import '@kitware/vtk.js/Rendering/Profiles/Volume';

// Force DataAccessHelper to have access to various data source
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';
import vtkImageMarchingCubes from '@kitware/vtk.js/Filters/General/ImageMarchingCubes';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';

import vtkImageMapper from '@kitware/vtk.js/Rendering/Core/ImageMapper';
import vtkImageSlice from '@kitware/vtk.js/Rendering/Core/ImageSlice';

import ButtonComponent from './controls'


const controlPanel =`<table>
<tr>
  <td>Iso value</td>
  <td>
    <input class='isoValue' type="range" min="0.0" max="100.0" step="0.05" value="0.0" />
    
  </td>
</tr>
</table>

`;
function Renderer(){
  const vtkContainerRef = useRef(null);
  const context = useRef(null);
  //const [isoValue, setisoValue] = useState(0.5);

  useEffect(() => {
    if (!context.current) {
      const fullScreenRenderWindow = vtkFullScreenRenderWindow.newInstance({
        background: [0, 0, 0],
        rootContainer: vtkContainerRef.current
      });
      const renderWindow = fullScreenRenderWindow.getRenderWindow();
     const renderer = fullScreenRenderWindow.getRenderer();

     fullScreenRenderWindow.addController(controlPanel);

     const imageActorI = vtkImageSlice.newInstance();
      const imageActorJ = vtkImageSlice.newInstance();
      const imageActorK = vtkImageSlice.newInstance();
      renderer.addActor(imageActorK);
      renderer.addActor(imageActorJ);
      renderer.addActor(imageActorI);
      

  
  function updateIsoValue(e) {
  const isoValue = Number(e.target.value);
    
  imageActorI.getProperty().setColorWindow(isoValue);
  imageActorJ.getProperty().setColorWindow(isoValue);
  imageActorK.getProperty().setColorWindow(isoValue);
    renderWindow.render();
   }
  
  const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
  
  reader
    .setUrl(`headsq.vti`, { loadData: true })
    .then(() => {
      const data = reader.getOutputData();
      const dataRange = data.getPointData().getScalars().getRange();
      const firstIsoValue = (dataRange[0] + dataRange[1]);
      const el = document.querySelector('.isoValue');
      el.setAttribute('min', dataRange[0]);
      el.setAttribute('max', dataRange[1]);
      el.setAttribute('value', firstIsoValue/2);
      el.addEventListener('input', updateIsoValue);

      const imageMapperK = vtkImageMapper.newInstance();
      imageMapperK.setInputData(data);
      imageMapperK.setKSlice(30);
      imageActorK.setMapper(imageMapperK);
      const imageMapperJ = vtkImageMapper.newInstance();
      imageMapperJ.setInputData(data);
      imageMapperJ.setJSlice(30);
      imageActorJ.setMapper(imageMapperJ);
      const imageMapperI = vtkImageMapper.newInstance();
      imageMapperI.setInputData(data);
      imageMapperI.setISlice(30);
      imageActorI.setMapper(imageMapperI);



  
      renderer.getActiveCamera().set({ position: [1, 1, 0], viewUp: [0, 0, -1] });
      renderer.resetCamera();
      renderWindow.render();
    });
  
  global.fullScreen = fullScreenRenderWindow;
  context.current = {
    fullScreenRenderWindow,
    renderWindow,
    renderer,
  };
}

return () => {
  if (context.current) {
    const { fullScreenRenderer } = context.current;
    fullScreenRenderer.delete();
    context.current = null;
  }
};
}, [vtkContainerRef]);


 

  return (
    <div ref={vtkContainerRef} >
      
    </div>
  );
}

export default Renderer;