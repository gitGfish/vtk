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


import ButtonComponent from './controls'
import Slice from './Slice';


const controlPanel =`<table>
<tr>
  <td>Iso value</td>
  <td>
    <input class='isoValue' type="range" min="0.0" max="100.0" step="0.05" value="0.0" />
    
  </td>
</tr>
</table>

`;
function Renderer(props){
  const vtkContainerRef = useRef(null);
  const context = useRef(null);
  const [fullScreenRenderWindow, setFullScreenRenderWindow] = useState(null);
  const [renderWindow, setRenderWindow] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [data, setData] = useState(null);
  const [reader, setReader] = useState(null);

  useEffect(() => {
    if (!context.current && props.vti) {
        const _fullScreenRenderWindow = vtkFullScreenRenderWindow.newInstance({
                background: [0, 0, 0],
                rootContainer: vtkContainerRef.current
            });
        const _renderWindow = _fullScreenRenderWindow.getRenderWindow();
        const _renderer = _fullScreenRenderWindow.getRenderer();

        _fullScreenRenderWindow.addController(controlPanel);

        setFullScreenRenderWindow(_fullScreenRenderWindow);
        setRenderWindow(_renderWindow);
        setRenderer(_renderer);

        //  const imageActorI = vtkImageSlice.newInstance();
        //   const imageActorJ = vtkImageSlice.newInstance();
        //   const imageActorK = vtkImageSlice.newInstance();
        //   renderer.addActor(imageActorK);
        //   renderer.addActor(imageActorJ);
        //   renderer.addActor(imageActorI);
        

    
    //   function updateIsoValue(e) {
    //   const isoValue = Number(e.target.value);
        
    //   imageActorI.getProperty().setColorWindow(isoValue);
    //   imageActorJ.getProperty().setColorWindow(isoValue);
    //   imageActorK.getProperty().setColorWindow(isoValue);
    //     renderWindow.render();
    //    }
    
    const _reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
    setReader(_reader);
    _reader
        .setUrl(props.vti, { loadData: true })
        .then(() => {
        const _data = _reader.getOutputData();
            setData(_data);

        _renderer.getActiveCamera().set({ position: [1, 1, 0], viewUp: [0, 0, -1] });
        _renderer.resetCamera();
        _renderWindow.render();
        });
    
    global.fullScreen = _fullScreenRenderWindow;
    context.current = {
        _fullScreenRenderWindow,
        _renderWindow,
        _renderer,
    };
    }

    return () => {
    if (context.current) {
        const { fullScreenRenderer } = context.current;
        fullScreenRenderer.delete();
        context.current = null;
    }
};
}, [vtkContainerRef,props.vti]);


 

  return (
    <div ref={vtkContainerRef} >
      <Slice renderWindow={renderWindow} renderer={renderer} data={data} side={'i'}/>
      <Slice renderWindow={renderWindow} renderer={renderer} data={data} side={'j'}/>
      <Slice renderWindow={renderWindow} renderer={renderer} data={data} side={'k'}/>
    </div>
  );
}

export default Renderer;