import { useState, useRef, useEffect } from 'react';

import vtkImageMapper from '@kitware/vtk.js/Rendering/Core/ImageMapper';
import vtkImageSlice from '@kitware/vtk.js/Rendering/Core/ImageSlice';

function Slice(props){

    const [dataRange, setDataRange] = useState([]);
    const [extent, setExtent] = useState([]);
    const [imageMapper, setImageMapper] = useState(vtkImageMapper.newInstance());
    const [imageActor, setImageActor] = useState(vtkImageSlice.newInstance());

    useEffect(() => {
        if(props.renderWindow && props.renderer && props.data && props.side){
            
            
            props.renderer.removeActor(imageActor);
            props.renderWindow.render();
            props.renderer.addActor(imageActor);
            
            const _dataRange = props.data.getPointData().getScalars().getRange();
            const _extent = props.data.getExtent();
            setExtent(_extent)
            setDataRange(_dataRange);
            imageMapper.setInputData(props.data);
            switch (props.side) {
                case 'i':
                    
                imageMapper.setISlice(0.5 * (_extent[1] - _extent[0]));
                setExtent([_extent[0],_extent[1]])
                    break;
                case 'j':
                imageMapper.setJSlice(0.5 * (_extent[3] - _extent[2]));
                setExtent([_extent[2],_extent[3]])
                    break;
                case 'k':
                imageMapper.setKSlice(0.5 * (_extent[5] - _extent[4]));
                setExtent([_extent[4],_extent[5]])
                    break;
            
                default:
                    break;
            }
            imageActor.setMapper(imageMapper);
            props.renderer.getActiveCamera().set({ position: [1, 1, 0], viewUp: [0, 0, -1] });
            props.renderer.resetCamera();
            props.renderWindow.render();

        }

            
    return () => {
        
    };
    }, [props.renderWindow,props.data,props.renderer]);

    useEffect(() => {
        if(!props.renderWindow || props.uiData.length <= 0) return;
        if(!props.uiData[0][props.side + "c"]){
            props.renderer.removeActor(imageActor);
        }else{
            if(! props.renderer.getActors()[imageActor]){
                props.renderer.addActor(imageActor);
            }
        }
        let uiValue = props.uiData[0][props.side] * (extent[1] - extent[0]) / 100;
        switch (props.side) {
            case 'i':
                imageMapper.setISlice(uiValue);

                break;
            case 'j':
                imageMapper.setJSlice(uiValue);

                break;
            case 'k':
                imageMapper.setKSlice(uiValue);
                break;
        
            default:
                break;
        }
        imageActor.getProperty().setColorLevel(props.uiData[0]["c"] * dataRange[1] / 100);
        imageActor.getProperty().setColorWindow(props.uiData[0]["cw"] * dataRange[1] / 100);
        props.renderWindow.render();
    return () => {
        
    };
    }, [props.uiData,props.renderWindow,dataRange]);
    
  return (
    <div  >
      
    </div>
  );
}


export default Slice;