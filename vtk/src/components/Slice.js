import { useState, useRef, useEffect } from 'react';

import vtkImageMapper from '@kitware/vtk.js/Rendering/Core/ImageMapper';
import vtkImageSlice from '@kitware/vtk.js/Rendering/Core/ImageSlice';

function Slice(props){

    const [dataRange, setDataRange] = useState(null);
    const [imageMapper, setImageMapper] = useState(null);
    const [imageActor, setImageActor] = useState(vtkImageSlice.newInstance());

    useEffect(() => {
        if(props.renderWindow && props.renderer && props.data && props.side){
            props.renderer.addActor(imageActor);
            const _dataRange = props.data.getPointData().getScalars().getRange();
            setDataRange(_dataRange);

            const _imageMapper = vtkImageMapper.newInstance();
            _imageMapper.setInputData(props.data);
            switch (props.side) {
                case 'i':
                    _imageMapper.setISlice(30);
                    break;
                case 'j':
                _imageMapper.setJSlice(30);
                break;
                case 'k':
                _imageMapper.setKSlice(30);
                console.log(props)
                break;
            
                default:
                    break;
            }
            imageActor.setMapper(_imageMapper);
            setImageMapper(_imageMapper);
            props.renderer.getActiveCamera().set({ position: [1, 1, 0], viewUp: [0, 0, -1] });
            props.renderer.resetCamera();
            props.renderWindow.render();

            console.log("sd")
        }

            
    return () => {
        
    };
    }, [props.renderWindow,props.data,props.renderer]);
    
  return (
    <div  >
      
    </div>
  );
}


export default Slice;