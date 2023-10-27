import '@kitware/vtk.js/favicon';
import { useState, useRef, useEffect } from 'react';
// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import '@kitware/vtk.js/Rendering/Profiles/Volume';

// Force DataAccessHelper to have access to various data source
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';

import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';

import '@kitware/vtk.js/favicon';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkOpenGLRenderWindow from '@kitware/vtk.js/Rendering/OpenGL/RenderWindow';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';
import vtkInteractorStyleTrackballCamera from '@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera';



import Slice from './Slice';


function Renderer(props){
  const vtkContainerRef = useRef(null);
  const context = useRef(null);
  const vtkWindow = useRef(null);
  const [renderWindow, setRenderWindow] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [data, setData] = useState(null);
  const [reader, setReader] = useState(null);

  useEffect(() => {
    if (!context.current && props.vti ) {
        const _renderWindow = vtkRenderWindow.newInstance();
        const _renderer = vtkRenderer.newInstance({ background: [0.2, 0.3, 0.4] });
        _renderWindow.addRenderer(_renderer);

        _renderer.resetCamera();

        // ----------------------------------------------------------------------------
        // Use OpenGL as the backend to view the all this
        // ----------------------------------------------------------------------------

        const openGLRenderWindow = vtkOpenGLRenderWindow.newInstance();
        _renderWindow.addView(openGLRenderWindow);

        // ----------------------------------------------------------------------------
        // Create a div section to put this into
        // ----------------------------------------------------------------------------

        const container = vtkWindow.current;
        openGLRenderWindow.setContainer(container);

        // ----------------------------------------------------------------------------
        // Capture size of the container and set it to the _renderWindow
        // ----------------------------------------------------------------------------

        const { width, height } = container.getBoundingClientRect();
        openGLRenderWindow.setSize(width, height * 0.55);

        // ----------------------------------------------------------------------------
        // Setup an interactor to handle mouse events
        // ----------------------------------------------------------------------------

        const interactor = vtkRenderWindowInteractor.newInstance();
        interactor.setView(openGLRenderWindow);
        interactor.initialize();
        interactor.bindEvents(container);

        // ----------------------------------------------------------------------------
        // Setup interactor style to use
        // ----------------------------------------------------------------------------

        interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());
        loadVti(_renderer,_renderWindow)
        
        
    }
    

    return () => {
    };
}, [vtkContainerRef,props.vti]);


function loadVti(_renderer,_renderWindow){
    const _reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
        setReader(_reader);
        _reader
            .setUrl(props.vtiURL ? props.vtiURL : props.vti, { loadData: true })
            .then(() => {
            const _data = _reader.getOutputData();
            setData(_data);
            

            _renderer.getActiveCamera().set({ position: [1, 1, 0], viewUp: [0, 0, -1] });
            _renderer.resetCamera();
            _renderWindow.render();
            });
        
            setRenderWindow(_renderWindow);
            setRenderer(_renderer);
}

useEffect(() => {
    if(props.vtiURL){
        loadVti(renderer,renderWindow)
    }
    

    return () => {
    };
}, [props.vtiURL]);

 

  return (
    <div ref={vtkContainerRef} >
        <div ref={vtkWindow} >

        </div>
      <Slice uiData={props.uiData} renderWindow={renderWindow} renderer={renderer} data={data} side={'i'}/>
      <Slice uiData={props.uiData} renderWindow={renderWindow} renderer={renderer} data={data} side={'j'}/>
      <Slice uiData={props.uiData}renderWindow={renderWindow} renderer={renderer} data={data} side={'k'}/>
    </div>
  );
}

export default Renderer;