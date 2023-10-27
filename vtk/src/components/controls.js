import React, { useState } from 'react';

function ButtonComponent() {
  // Define state to manage button clicks
  const [buttonState, setButtonState] = useState({
    button1: false,
    button2: false,
    button3: false,
  });

  // Handler function for button clicks
  const handleButtonClick = (buttonName) => {
    setButtonState((prevState) => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));
  };

  return (
    <div>
      <button onClick={() => handleButtonClick('button1')}>
        {buttonState.button1 ? 'Button 1 Clicked' : 'Button 1'}
      </button>
      <button onClick={() => handleButtonClick('button2')}>
        {buttonState.button2 ? 'Button 2 Clicked' : 'Button 2'}
      </button>
      <button onClick={() => handleButtonClick('button3')}>
        {buttonState.button3 ? 'Button 3 Clicked' : 'Button 3'}
      </button>
    </div>
  );
}

export default ButtonComponent;