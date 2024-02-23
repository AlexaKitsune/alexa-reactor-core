# JavaScript Utilities Library

<p align="center">
    <img src="https://raw.githubusercontent.com/AlexaKitsune/alexa-reactor-core/main/img/adaptative.svg" width="50%"/>
</p>

This is a JavaScript utilities library that contains a set of useful functions and custom functional tags for common tasks in web development. It can be used in web projects to improve efficiency and facilitate development.

# Install

You can install it using npm:

```bash
npm install alexa-reactor-core
```

You can use these functions by importing the module into your project as follows:

```javascript
import * as arc from 'alexa-reactor-core';
```

Or import each function:

```js
import { element, htjs } from 'alexa-reactor-core';

// Call element function.
element("#myElement").value = "Some value";
```

If you are not using a node server, or working on HTML / JS vanilla, you can import the js files directly this way:

```html
<script src="node_modules/alexa-reactor-core/src/classes.js"></script>
<script src="node_modules/alexa-reactor-core/src/functions.js"></script>
<script src="node_modules/alexa-reactor-core/src/html-parser.js"></script>
```


## Available Functions


### DOM Element Selection

- `DOMready(function_)`: Executes a function after the DOM has been loaded.
- `element(element_)`: Selects a DOM element using a CSS selector and returns the first found element.
- `elements(element_)`: Selects multiple DOM elements using a CSS selector and returns a list of elements.
- `stylize(element_)`: Retrieves the CSS style of a DOM element.
- `rewriteCSS(element_, styles_)`: Replaces the CSS style of a DOM element.
- `stackCSS(element_, styles_)`: Adds CSS styles to a DOM element.
- `clicked(element_, function_)`: Associates a function with a DOM element to execute when it is clicked.
- `getStyle(element_)`: Retrieves the computed styles of a DOM element.
- `getInnerHTML(element_)`: Retrieves the HTML content of a DOM element.


### Setting Styles

```js
setStyles(element_, stylesObject_)
```

This function allows you to apply styles to an HTML element by passing it an object with key-value pairs corresponding to the styles you want to set.

It receives the following arguments:

- `element_`: The element that you want to apply styles.
- `stylesObject`: The styles you want to apply.

*Example:*

```js
const myElement = document.getElementById("myElement");
// ...Or you can use = element("#myElement");

setStyles(myElement, {
    backgroundColor: "lightblue",
    color: "white",
    fontSize: "16px",
    padding: "10px",
    borderRadius: "5px"
});
```


### Object-Related Functions

- `keyByIndex(object_, index_)`: Retrieves the key of an item by its positional value.
- `valueByIndex(object_, index_)`: Retrieves the value of an item by its positional value.
- `keyByValue(object_, value_)`: Retrieves the key of an item through its value.


### Date and Time

- `Second()`: Retrieves the current seconds.
- `Minute()`: Retrieves the current minutes.
- `Hour()`: Retrieves the current hours.
- `Day()`: Retrieves the current day.
- `Month()`: Retrieves the current month.
- `Year()`: Retrieves the current year.
- `Century()`: Retrieves the current century.
- `Millennium()`: Retrieves the current millennium.


### Random Number Generation

```js
rand(randomArray_)
```

Generates a random number from a list of numbers as an argument. It is also possible to use a list of any other type of data.


### Number range

```js
range(start_, end_, steps_ = 1)
```

Function that returns an array of a range between two numbers. Sus argumentos son:

- `start_`: The initial number of the range (included).
- `end_`: The final number of the range (included).
- `steps_`: The steps / increment of numbers in the range.


### Keyboard Events

```js
withEnterTriggerClick(element_, button_)
```

Triggers click on button or another clickable element when pressed enter key in another element.

It receives the following arguments:

- `element_`: class or id of the element that receives the enter key.
- `button_`: class or id of the button to trigger.

```js
withKeyTriggerFunction(element_, key_, function_)
```

Executes a function when a specified key is pressed within some element.

It receives the next arguments:

- `element_`: Element that receives the key.
- `key_`: The key that will trigger the function.
- `function_`: Function to be executed.


### Drag detection over element in specific directions

```js
function detectDrag(where_, direction_, function_, sensitivity_ = 0)
```

Allows you to detect mouse dragging in a certain area or element of the web interface. It takes several parameters that allow it to detect mouse dragging in a specific direction and execute a function when said dragging occurs.

This function receives the following arguments:

- `where_`: Element or area where the dragging will be detected.
- `direction_`: The direction that will trigger the function. It can be `'right'`, `'left'`, `'up'` or `'down'`.
- `function_`: The function that will be executed when the element is dragged in the specified direction.
- `sensitivity_`: The speed and responsiveness of the mouse of touch.

The function will be executed multiple times while the element is dragged, so `sensitivity_` allow us to change the frequency of those executions.

This function doesn't drag or move anything in the DOM; it only detects mouse dragging.

### 3D/360 Model Simulation

```js
simulation360(where_, imgElement_, imagesPathArray_, direction_, repeat_, reverseControls_ = false, initialIndex_ = 0, sensitivity_ = 0)
```

Simulates a 3D/360 model using a sequence of images by dragging mouse over the displayed element/image.

It receives the following arguments:

- `where_`: The element where the event will be detected.
- `imgElement_`: The img tag element that will show the images.
- `imagesPathArray_`: An array of the images that will be shown.
- ` direction_`: Drag direction. It can be 'horizontal' or 'vertical'.
- `repeat_`: If the sequence will stop when reaches the end, or will be restarted an repeating.
- `reverseControls_`: Normal or reverse direction drag control.
- `initialIndex_`: The first image that will be shown.
- `sensitivity_`: The speed and responsiveness of the mouse of touch.


### Collision Detection

```js
detectCollision(element1_, element2_)
```

Detect collision or superposition between two elements, and returns `true` if there is a collision or `false` if not.

It receives the following arguments:

- `element1_`: Element you want to detect collision.
- `element2_`: Element where collision will be detected.


### Drag and Drop detection

```js
draggableElement(element_, dropZone_=undefined, functionDropHover_=undefined, functionDropReleased_=undefined)
```

Allows you to drag and drop an element into a specific area of the DOM, with activation functions when hovering over the area and dropping the element.

It receives the following arguments:

- `element_`: Draggable element.
- `dropZone_`: Element that will act as the drop zone.
- `functionDropHover_`: Function that will execute while the draggable element is over the drop zone, but not released yet.
- `functionDropReleased_`: Function that will execute when the draggable element is finally released on the drop zone.

### Connection line between two elements

```js
connectorLine(element1_, element2_)
```

This tag creates a visual connection line between two elements of the DOM.

It receives the following attributes:

It receives the following arguments:

- `element1_`: Element you want to detect collision.
- `element2_`: Element where collision will be detected.

This function returns the `<hr>` element (the line)
 as an object.

*Example:*

```html
<div>
    <button id="myButton1"> Btn 1 </button>
    <button id="myButton2"> Btn 2 </button>
</div>

<script>
    connectorLine("#myButton1", "myButton2");
</script>

<style>
    div{
        width: 200px;
        height: 200px;
        position: relative;
    }
    
    div button{
        position: absolute;
    }

    #myButton1{
        top: 0;
        left: 0;
    }

    #myButton2{
        right: 0;
        bottom: 0;
    }
</style>
```

Styles here are for positioning the buttons, but note that the connector line always will connect both elements.