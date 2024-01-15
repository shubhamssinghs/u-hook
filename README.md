# u-hook - A Collection of Custom React Hooks

🚀 Welcome to u-hook, a library of custom React hooks for supercharging your React applications.

![GitHub CI](https://github.com/dwyl/auth_plug/actions/workflows/ci.yml/badge.svg)

[![https://nodei.co/npm/@shubhamssingh/u-hook.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/@shubhamssingh/u-hook.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@shubhamssingh/u-hook)

## Installation

To install u-hook, use your preferred package manager:

```bash
npm install @shubhamssingh/u-hook
# or
yarn add @shubhamssingh/u-hook
# or
pnpm install @shubhamssingh/u-hook
```

# What is u-hook?

u-hook, formerly known as U-Hook, is a collection of custom React hooks designed to simplify common patterns and functionality in React applications. Each hook is designed to be easy to use and integrate into your projects.

# List of Hooks

### useArray

Maintains and manipulates state for an array with methods like push, filter, update, remove, and clear.

#### Usage

```javascript
import React from "react";
import { useArray } from "@shubhamssingh/u-hook";

function MyComponent() {
  const { array, push, filter, update, remove, clear } = useArray([
    1, 2, 3, 4, 5,
  ]);

  // Adding a new element
  push(6);

  // Filtering the array
  filter((value) => value > 2);

  // Updating an element at a specific index
  update(1, 10);

  // Removing an element at a specific index
  remove(3);

  // Clearing the entire array
  clear();

  return (
    <div>
      {/* Render your component with the updated array */}
      {array.map((item) => (
        <span key={item}>{item} </span>
      ))}
    </div>
  );
}

export default MyComponent;
```

### useAsync

Handles asynchronous operations and manages loading, error, and data states.

#### Usage

```javascript
import React from "react";
import { useAsync } from "@shubhamssingh/u-hook";

// Define an asynchronous function to be used with useAsync
const fetchData: () => Promise<any> = async () => {
  // Simulate an asynchronous operation (e.g., fetching data from an API)
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  return data;
};

function MyAsyncComponent() {
  // Usage of useAsync hook [] => is the list of dependencies
  const { loading, error, value }: UseAsyncResult = useAsync(fetchData, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {value && (
        <div>
          <h1>Data:</h1>
          {/* Render your component with the fetched data */}
          {JSON.stringify(value, null, 2)}
        </div>
      )}
    </div>
  );
}

export default MyAsyncComponent;
```

### useClickOutside

Detects clicks outside a specified element, useful for handling click events outside a modal or dropdown.

#### Usage

```javascript
import React, { useRef } from "react";
import { useClickOutside } from "@shubhamssingh/u-hook";

function MyComponent() {
  const myRef = useRef(null);

  const handleClickOutside = (event) => {
    // Handle the click outside logic here
    console.log("Clicked outside!", event);
  };

  // Attach the click outside listener to the component's ref
  useClickOutside(myRef, handleClickOutside);

  return (
    <div ref={myRef}>
      <h1>Click inside or outside me!</h1>
    </div>
  );
}

export default MyComponent;
```

### useDebounce

Delays the execution of a function until after a specified delay, useful for handling input debounce.

#### Usage

```javascript
import React, { useState, useEffect } from "react";
import { useDebounce } from "@shubhamssingh/u-hook";

function MyComponent() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDebouncedInputChange = () => {
    // Your logic to handle the debounced input change
    console.log("Debounced input value:", inputValue);
  };

  // Use the useDebounce hook to debounce the input change callback
  useDebounce({
    callback: handleDebouncedInputChange,
    delay: 500, // Set your desired debounce delay in milliseconds
    dependencies: [inputValue], // Add the input value as a dependency
  });

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
    </div>
  );
}

export default MyComponent;
```

### useEffectOnce

Runs an effect only once when the component mounts, similar to componentDidMount.

#### Usage

```javascript
import React from "react";
import { useEffectOnce } from "@shubhamssingh/u-hook";

function MyComponent() {
  // useEffectOnce will run the provided callback only once
  useEffectOnce(() => {
    // Your logic to run only once when the component mounts
    console.log("Component is mounted!");
  });

  return (
    <div>
      <h1>Hello, useEffectOnce!</h1>
    </div>
  );
}

export default MyComponent;
```

### useEventListener

Attaches event listeners to elements and handles event callback functions.

#### Usage

```javascript
import React from "react";
import { useEventListener } from "@shubhamssingh/u-hook";

function MyComponent() {
  const handleKeyPress = (event) => {
    // Your logic to handle key press events
    console.log("Key pressed:", event.key);
  };

  // Use the useEventListener hook to listen for key press events on the document
  useEventListener("keypress", handleKeyPress, document);

  return (
    <div>
      <h1>Press a key to see the event!</h1>
    </div>
  );
}

export default MyComponent;
```

### useGeolocation

Tracks the user's geolocation and provides loading, error, and data states.

#### Usage

```javascript
import React from "react";
import { useGeolocation } from "@shubhamssingh/u-hook";

function LocationComponent() {
  // Use the useGeolocation hook to get the current location
  const { loading, error, data } = useGeolocation();

  return (
    <div>
      <h1>Geolocation Example</h1>
      {loading && <p>Loading...</p>}
      {error && (
        <p>
          Error: {error.code} - {error.message}
        </p>
      )}
      {data.latitude && data.longitude && (
        <div>
          <p>Latitude: {data.latitude}</p>
          <p>Longitude: {data.longitude}</p>
          <p>Accuracy: {data.accuracy} meters</p>
          {data.altitude != null && <p>Altitude: {data.altitude} meters</p>}
          {data.altitudeAccuracy != null && (
            <p>Altitude Accuracy: {data.altitudeAccuracy} meters</p>
          )}
          {data.heading != null && <p>Heading: {data.heading} degrees</p>}
          {data.speed != null && <p>Speed: {data.speed} meters/second</p>}
          <p>Timestamp: {data.timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default LocationComponent;
```

### useHover

Detects whether an element is currently being hovered over.

#### Usage

```javascript
import React, { useRef } from "react";
import { useHover } from "@shubhamssingh/u-hook";

function HoverComponent() {
  // Create a ref to attach to the element you want to track hover on
  const myRef = useRef(null);

  // Use the useHover hook to determine if the element is currently being hovered
  const isHovered = useHover({ ref: myRef });

  return (
    <div>
      <div
        ref={myRef}
        style={{
          width: "200px",
          height: "100px",
          backgroundColor: isHovered ? "lightblue" : "lightgray",
          padding: "10px",
        }}
      >
        {isHovered ? "Hovered!" : "Not Hovered!"}
      </div>
    </div>
  );
}

export default HoverComponent;
```

### useLongPress

Triggers a callback function after a long press on a specified element.

#### Usage

```javascript
import React, { useRef } from "react";
import { useLongPress } from "@shubhamssingh/u-hook";

function LongPressComponent() {
  // Create a ref to attach to the element you want to track long press on
  const myRef = useRef(null);

  // Define the callback function to be executed on long press
  const handleLongPress = () => {
    console.log("Long press detected!");
    // Your logic for long press action goes here
  };

  // Use the useLongPress hook to set up long press behavior
  useLongPress({ ref: myRef, cb: handleLongPress, options: { delay: 1000 } });

  return (
    <div>
      <button ref={myRef}>Press and hold me!</button>
    </div>
  );
}

export default LongPressComponent;
```

### useOnlineStatus

Tracks the online/offline status of the user.

#### Usage

```javascript
import React from "react";
import { useOnlineStatus } from "@shubhamssingh/u-hook";

function OnlineStatusComponent() {
  // Use the useOnlineStatus hook to track online status
  const isOnline = useOnlineStatus();

  return (
    <div>
      <h1>{isOnline ? "Online" : "Offline"}</h1>
    </div>
  );
}

export default OnlineStatusComponent;
```

### useOnScreen

Detects whether an element is currently visible on the screen.

#### Usage

```javascript
import React, { useRef } from "react";
import { useOnScreen } from "@shubhamssingh/u-hook";

function OnScreenComponent() {
  // Create a ref to attach to the element you want to track visibility for
  const myRef = useRef(null);

  // Use the useOnScreen hook to track whether the element is currently visible on the screen
  const isOnScreen = useOnScreen(myRef);

  return (
    <div>
      <div
        ref={myRef}
        style={{
          height: "200px",
          backgroundColor: isOnScreen ? "lightgreen" : "lightgray",
          padding: "10px",
        }}
      >
        {isOnScreen ? "On Screen!" : "Not On Screen!"}
      </div>
      <p>Scroll down to see changes!</p>
    </div>
  );
}

export default OnScreenComponent;
```

### usePrevious

Returns the previous value of a state or variable.

#### Usage

```javascript
import React, { useState, useEffect } from "react";
import { usePrevious } from "@shubhamssingh/u-hook";

function PreviousValueComponent() {
  // State to store the current value
  const [count, setCount] = useState(0);

  // Use the usePrevious hook to get the previous value of the count
  const previousCount = usePrevious(count);

  // Function to increment the count
  const incrementCount = () => setCount((prevCount) => prevCount + 1);

  return (
    <div>
      <p>Current Count: {count}</p>
      <p>
        Previous Count: {previousCount !== undefined ? previousCount : "N/A"}
      </p>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}

export default PreviousValueComponent;
```

### useRenderCount

Counts the number of times a component renders.

#### Usage

```javascript
import React from "react";
import { useRenderCount } from "@shubhamssingh/u-hook";

function RenderCountComponent() {
  // Use the useRenderCount hook to get the render count of the component
  const renderCount = useRenderCount();

  return (
    <div>
      <h1>Render Count: {renderCount}</h1>
    </div>
  );
}

export default RenderCountComponent;
```

### useScript

Dynamically loads an external script and provides loading and error states.

#### Usage

```javascript
import React from "react";
import { useScript } from "@shubhamssingh/u-hook";

function ScriptLoaderComponent() {
  // Use the useScript hook to asynchronously load a script
  const scriptStatus = useScript("https://example.com/script.js");

  return (
    <div>
      <h1>Script Loader Example</h1>
      {scriptStatus.loading && <p>Loading script...</p>}
      {scriptStatus.error && <p>Error loading script</p>}
      {!scriptStatus.loading && !scriptStatus.error && (
        <p>Script loaded successfully!</p>
      )}
    </div>
  );
}

export default ScriptLoaderComponent;
```

### useSize

Tracks the size of a specified element using the ResizeObserver API.

#### Usage

```javascript
import React, { useRef } from "react";
import { useSize } from "@shubhamssingh/u-hook";

function SizeComponent() {
  // Create a ref to attach to the element you want to track size for
  const myRef = useRef(null);

  // Use the useSize hook to get the width and height of the element
  const size = useSize(myRef);

  return (
    <div>
      <h1>Element Size</h1>
      <div
        ref={myRef}
        style={{
          width: "50%",
          height: "100px",
          backgroundColor: "lightblue",
          padding: "10px",
        }}
      >
        <p>Width: {size.width}px</p>
        <p>Height: {size.height}px</p>
      </div>
      <p>Resize the element to see changes!</p>
    </div>
  );
}

export default SizeComponent;
```

### useStateWithValidation

Manages a state with a validation function to ensure the value meets specific criteria.

#### Usage

```javascript
import React from "react";
import { useStateWithValidation } from "@shubhamssingh/u-hook";

function ValidationComponent() {
  // Validation function that checks if a number is even
  const isEven = (value) => value % 2 === 0;

  // Use the useStateWithValidation hook to manage a state with validation
  const [number, setNumber, isValid] = useStateWithValidation(isEven, 0);

  return (
    <div>
      <h1>State with Validation</h1>
      <label>
        Enter a number:{" "}
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value, 10))}
        />
      </label>
      {isValid ? (
        <p>Entered number is even.</p>
      ) : (
        <p>Entered number is not even.</p>
      )}
    </div>
  );
}

export default ValidationComponent;
```

### useStorage

Manages state stored in either local or session storage.

#### Usage

```javascript
import React from "react";
import { useStorage } from "@shubhamssingh/u-hook";

function StorageComponent() {
  // Example using useLocalStorage hook
  const [localStorageValue, setLocalStorageValue, removeLocalStorageValue] =
    useStorage.useLocalStorage("myKey", "defaultValue");

  // Example using useSessionStorage hook
  const [
    sessionStorageValue,
    setSessionStorageValue,
    removeSessionStorageValue,
  ] = useStorage.useSessionStorage("myKey", "defaultValue");

  return (
    <div>
      <h1>Storage Examples</h1>

      <div>
        <h2>Local Storage</h2>
        <label>
          Local Storage Value:{" "}
          <input
            type="text"
            value={localStorageValue}
            onChange={(e) => setLocalStorageValue(e.target.value)}
          />
        </label>
        <button onClick={removeLocalStorageValue}>
          Remove from Local Storage
        </button>
      </div>

      <div>
        <h2>Session Storage</h2>
        <label>
          Session Storage Value:{" "}
          <input
            type="text"
            value={sessionStorageValue}
            onChange={(e) => setSessionStorageValue(e.target.value)}
          />
        </label>
        <button onClick={removeSessionStorageValue}>
          Remove from Session Storage
        </button>
      </div>
    </div>
  );
}

export default StorageComponent;
```

### useTimeout

Executes a callback function after a specified delay.

#### Usage

```javascript
import React from "react";
import { useTimeout } from "@shubhamssingh/u-hook";

function TimeoutComponent() {
  // Define the callback function to be executed after the timeout
  const handleTimeout = () => {
    console.log("Timeout reached!");
    // Your logic for the timeout action goes here
  };

  // Use the useTimeout hook to set up a timeout with a 2000ms delay
  const { reset, clear } = useTimeout(handleTimeout, 2000);

  // Function to manually trigger the timeout
  const triggerTimeout = () => {
    console.log("Manually triggering timeout!");
    reset(); // Resetting the timeout
  };

  return (
    <div>
      <h1>Timeout Example</h1>
      <button onClick={triggerTimeout}>Trigger Timeout</button>
    </div>
  );
}

export default TimeoutComponent;
```

### useToggle

Toggles between true and false states.

#### Usage

```javascript
import React from "react";
import { useToggle } from "@shubhamssingh/u-hook";

function ToggleComponent() {
  // Use the useToggle hook to manage a boolean state
  const [isToggled, toggle] = useToggle(false);

  return (
    <div>
      <h1>Toggle Example</h1>
      <p>Current State: {isToggled ? "ON" : "OFF"}</p>
      <button onClick={() => toggle()}>Toggle</button>
    </div>
  );
}

export default ToggleComponent;
```

### useUpdateEffect

Runs an effect only when dependencies change, excluding the initial render.

#### Usage

```javascript
import React, { useState } from "react";
import { useUpdateEffect } from "@shubhamssingh/u-hook";

function UpdateEffectComponent() {
  // State to track changes
  const [count, setCount] = useState(0);

  // Use the useUpdateEffect hook to run an effect only on subsequent renders
  useUpdateEffect(() => {
    console.log("Effect triggered on update. Count:", count);
  }, [count]);

  // Function to update the count
  const incrementCount = () => setCount((prevCount) => prevCount + 1);

  return (
    <div>
      <h1>Update Effect Example</h1>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}

export default UpdateEffectComponent;
```

### useWindowSize

Tracks the dimensions of the browser window.

#### Usage

```javascript
import React from "react";
import { useWindowSize } from "@shubhamssingh/u-hook";

function WindowSizeComponent() {
  // Use the useWindowSize hook to track the window size
  const { width, height } = useWindowSize();

  return (
    <div>
      <h1>Window Size Example</h1>
      <p>Window Width: {width}px</p>
      <p>Window Height: {height}px</p>
    </div>
  );
}

export default WindowSizeComponent;
```

# Contribution [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

If you have additional hooks or improvements to existing ones, feel free to contribute!

# License

u-hook is MIT licensed with ❤️ by Shubham Singh.
