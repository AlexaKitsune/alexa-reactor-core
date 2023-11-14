# JavaScript Utilities Library

<p align="center">
    <img src="https://raw.githubusercontent.com/AlexaKitsune/alexa-reactor-core/main/img/alexa.svg" width="50%"/>
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

// Call htjs function to analize and processing the HTML tags.
arc.htjs();
```

Or import each function:

```js
import { element, htjs } from 'alexa-reactor-core';

// Call htjs and element.
element("#myElement").value = "Some value";
htjs();
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


# HTML Parser for JavaScript

This is a JavaScript module that provides functions for parsing and processing HTML elements with custom attributes. These functions can be useful for advanced manipulation and processing of HTML content in web applications.

> [!WARNING]  
> For the moment, \<if> and \<for> tags only allow one level of nesting depth.

## Available Functions


### If conditional

```html
<if cond="">
    <!--condition true-->
<else/>
    <!--condition false-->
</if>
```

This tag evaluates the condition in `cond` y muestra el contenido correspondiente.

The `<else/>` tag is optional; if the condition is false, nothing will be rendered.

*Example:*

```html
<script>
    const age1 = 25;
    const membership = false;
</script>

<if cond="age1 > 18">
    <b>You can access.</b>
</if>

<if cond="membership == true">
    <b>Access granted.</b>
<else/>
    <b>Access denied.</b>
</if>
```

This will render something like this:

**You can access**

**Access denied**

### For loop

```html
<for init="">
    <!-- loop -->
</for>
```

This tag allows you to render content in a way similar to a for loop. You can write some javascript between `{{}}` into the tag and it will be executed.

The attributes it receives are all required, but they will depend on the type of loop you want to execute.

**Classic for loop**

To execute a classic for loop, it requires the following attributes:

- `init`: Variable declaration or initialization.
- `cond`: Halting condition. 
- `incr`: Increment.

**For in and For of**

For executing a "for of" loop, you need the following attributes:

- `init`: The name of the variable used inside `{{}}` within the tag, representing the current element in the array being iterated.
- `off`: Object or array to loop through.

*Example:*

```html
<script>
    const GREETINGS = ["Hola", "Hello", "Konnichiwa"];
</script>

<!-- Classic for loop -->
<for init="i = 0" cond="i < 5" incr="i++">
    <p>Iteration {{i}}</p>
</for>

<!-- For in -->
<for init="item" in="ANIMALS">
    <p>There are {{item}} animals</p>
</for>

<!-- For of -->
<for init="item" of="ANIMALS">
    <p>Character's species is {{item}}</p>
</for>
```

This will render:

Iteration 0<br/>
Iteration 1<br/>
Iteration 2<br/>
Iteration 3<br>
Iteration 4<br/>

There are 0 animals<br/>
There are 1 animals<br/>
There are 2 animals<br/>

Character's species is dog<br/>
Character's species is cat<br/>
Character's species is fox<br/>


### Assistive reading text

```html
<assistext>
    <!-- TEXT - Lorem ipsum dolor sit amet... -->
</assistext>
```

This tag renders a text where the first few letters of words are emphasised by using bold type.

*Example:*

```html
<assistext>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, aperiam?
</assistext>
```

This will render something like this:

<div><b></b> <b>Lo</b>rem <b>ip</b>sum <b>do</b>lor <b>s</b>it <b>am</b>et <b>conse</b>ctetur <b>adipi</b>sicing <b>el</b>it. <b>Cupid</b>itate, <b>aper</b>iam? <b></b></div>


### Connection line between two elements

```html
<connector-line from="" to=""> </connector-line>
```

This tag creates a visual connection line between two elements of the DOM.

It receives the following attributes:

- `from`: The id of the first element to connect.
- `to`: The id of the second element to connect.

*Example:*

```html
<connector-line from="myButton1" to="myButton2"> </connector-line>

<div>
    <button id="myButton1"> Btn 1 </button>
    <button id="myButton2"> Btn 2 </button>
</div>

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

This code will render some like this:

<div style="width:200px; height:200px; position:relative;">
    <button id="myButton1" style="position:absolute; top:0; left:0;"> Btn 1 </button>
    <button id="myButton2" style="position:absolute; right:0; bottom:0;"> Btn 2 </button>
    <hr id="" class="" style="position: absolute; margin: 0px; padding: 0px; transform-origin: left top 0px; top: 18.6px; left: 29.2px; width: 238.343px; transform: rotate(0.848335rad);">
</div><br>

Styles here are for positioning the buttons, but note that the connector line always will connect both elements.

### Javascript Code Editor

```html
<editor name="myCodeEditor" input> </editor>

<editor name="myCodeEditor" output> </editor>
```

This function creates an interactive editor in which you can write JavaScript code. Evaluates the code and shows the result in real time.

It works having two editor tags: the first is the input (where we will write our code), and the second is the output (where we will see the results of the execution). This second one is optional, but if whe choose to have both, both has to have the same `name` attribute and value.

It receives the following attributes:

- `input` (boolean): The element that will act as editor code. We will write here.
- `output` (boolean): The element that will display the results.


### Slider

```html
<slider id="" interval="">
    <!-- Multiple divs -->
</slider>
```

This function creates a slider of elements in the DOM that scrolls automatically. The elements within the slider are arranged and scrolled continuously.

It receives the following attribute:

- `interval`: Time in milliseconds that each image will be displayed (optional) (default is 1000).

> [!WARNING]
> `id` is a **required** attribute for the correct working of the slider.

*Example:*

```html
<slider id="mySlider">
    <div><p>¡Hello!</p><button>click me</button></div>
    <div><img src="assets/image1"/></div>
    <div><img src="assets/image2"/></div>
</slider>
```

Each display of the render doesn't necessarily have to be an image; can be full HTML content, as in the first div.



### Radial Text

```html
<radial-text adjust-rotation="" angle="">
    <!-- TEXT - Lorem ipsum dolor sit amet... -->
</radial-text>
```

This function arranges and displays text radially on an element. You can adjust the rotation angle and other attributes.

It receives the following (optional) attributes:

- `adjust-rotation`: The point where the text starts. Default is 0.
- `angle`: Defines the maximum angle that the text will occupy. Default is 360, meaning that the text will occupy the entire circle.

*Example:*

```html
<radial-text>
    Lorem ipsum dolor sit amet
</radial-text>

<radial-text angle="180">
    Lorem ipsum dolor sit amet 180deg
</radial-text>
```

This code will render some like this (assuming each radial-text has a width and height of 100px):
<div style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;"><div style="position: absolute; height: inherit; transform: rotate(0deg);">L</div><div style="position: absolute; height: inherit; transform: rotate(12.8571deg);">o</div><div style="position: absolute; height: inherit; transform: rotate(25.7143deg);">r</div><div style="position: absolute; height: inherit; transform: rotate(38.5714deg);">e</div><div style="position: absolute; height: inherit; transform: rotate(51.4286deg);">m</div><div style="position: absolute; height: inherit; transform: rotate(64.2857deg);"> </div><div style="position: absolute; height: inherit; transform: rotate(77.1429deg);">i</div><div style="position: absolute; height: inherit; transform: rotate(90deg);">p</div><div style="position: absolute; height: inherit; transform: rotate(102.857deg);">s</div><div style="position: absolute; height: inherit; transform: rotate(115.714deg);">u</div><div style="position: absolute; height: inherit; transform: rotate(128.571deg);">m</div><div style="position: absolute; height: inherit; transform: rotate(141.429deg);"> </div><div style="position: absolute; height: inherit; transform: rotate(154.286deg);">d</div><div style="position: absolute; height: inherit; transform: rotate(167.143deg);">o</div><div style="position: absolute; height: inherit; transform: rotate(180deg);">l</div><div style="position: absolute; height: inherit; transform: rotate(192.857deg);">o</div><div style="position: absolute; height: inherit; transform: rotate(205.714deg);">r</div><div style="position: absolute; height: inherit; transform: rotate(218.571deg);"> </div><div style="position: absolute; height: inherit; transform: rotate(231.429deg);">s</div><div style="position: absolute; height: inherit; transform: rotate(244.286deg);">i</div><div style="position: absolute; height: inherit; transform: rotate(257.143deg);">t</div><div style="position: absolute; height: inherit; transform: rotate(270deg);"> </div><div style="position: absolute; height: inherit; transform: rotate(282.857deg);">a</div><div style="position: absolute; height: inherit; transform: rotate(295.714deg);">m</div><div style="position: absolute; height: inherit; transform: rotate(308.571deg);">e</div><div style="position: absolute; height: inherit; transform: rotate(321.429deg);">t</div><div style="position: absolute; height: inherit; transform: rotate(334.286deg);">.</div><div style="position: absolute; height: inherit; transform: rotate(347.143deg);"> </div></div>
<br><div angle="180" style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;"><div style="position: absolute; height: inherit; transform: rotate(0deg);">L</div><div style="position: absolute; height: inherit; transform: rotate(9.47368deg);">o</div><div style="position: absolute; height: inherit; transform: rotate(18.9474deg);">r</div><div style="position: absolute; height: inherit; transform: rotate(28.4211deg);">e</div><div style="position: absolute; height: inherit; transform: rotate(37.8947deg);">m</div><div style="position: absolute; height: inherit; transform: rotate(47.3684deg);"> </div><div style="position: absolute; height: inherit; transform: rotate(56.8421deg);">i</div><div style="position: absolute; height: inherit; transform: rotate(66.3158deg);">p</div><div style="position: absolute; height: inherit; transform: rotate(75.7895deg);">s</div><div style="position: absolute; height: inherit; transform: rotate(85.2632deg);">u</div><div style="position: absolute; height: inherit; transform: rotate(94.7368deg);">m</div><div style="position: absolute; height: inherit; transform: rotate(104.211deg);"> </div><div style="position: absolute; height: inherit; transform: rotate(113.684deg);">1</div><div style="position: absolute; height: inherit; transform: rotate(123.158deg);">8</div><div style="position: absolute; height: inherit; transform: rotate(132.632deg);">0</div><div style="position: absolute; height: inherit; transform: rotate(142.105deg);">d</div><div style="position: absolute; height: inherit; transform: rotate(151.579deg);">e</div><div style="position: absolute; height: inherit; transform: rotate(161.053deg);">g</div><div style="position: absolute; height: inherit; transform: rotate(170.526deg);"> </div></div>
<div angle="180" adjust-rotation="90deg" style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;"><div style="position: absolute; height: inherit; transform: rotate(90deg);">L</div><div style="position: absolute; height: inherit; transform: rotate(99.4737deg);">o</div><div style="position: absolute; height: inherit; transform: rotate(108.947deg);">r</div><div style="position: absolute; height: inherit; transform: rotate(118.421deg);">e</div><div style="position: absolute; height: inherit; transform: rotate(127.895deg);">m</div><div style="position: absolute; height: inherit; transform: rotate(137.368deg);"> </div><div style="position: absolute; height: inherit; transform: rotate(146.842deg);">i</div><div style="position: absolute; height: inherit; transform: rotate(156.316deg);">p</div><div style="position: absolute; height: inherit; transform: rotate(165.789deg);">s</div><div style="position: absolute; height: inherit; transform: rotate(175.263deg);">u</div><div style="position: absolute; height: inherit; transform: rotate(184.737deg);">m</div><div style="position: absolute; height: inherit; transform: rotate(194.211deg);"> </div><div style="position: absolute; height: inherit; transform: rotate(203.684deg);">1</div><div style="position: absolute; height: inherit; transform: rotate(213.158deg);">8</div><div style="position: absolute; height: inherit; transform: rotate(222.632deg);">0</div><div style="position: absolute; height: inherit; transform: rotate(232.105deg);">d</div><div style="position: absolute; height: inherit; transform: rotate(241.579deg);">e</div><div style="position: absolute; height: inherit; transform: rotate(251.053deg);">g</div><div style="position: absolute; height: inherit; transform: rotate(260.526deg);"> </div></div>


### Draggable elements
```html
<drag target="" fn-hover="" fn-release="">
    <!-- content -->
</drag>
```

This function allows an element to be draggable and defines functions for scroll and drop events.

It receives the following (optional) attributes:

- `target`: Element that will act as the drop zone.
- `fn-hover`: Function that will execute while the draggable element is over the drop zone, but not released yet.
- `fn-release`: Function that will execute when the draggable element is finally released on the drop zone.

*Example:*

```html
<draggable target="myTarget" fn-hover="console.log('over the target')" fn-release="console.log('released in target')">
    Drag me!
</draggable>

<div id="myTarget"> Target </div>
```

### Run all tags

```js
htjs();
```

This function performs all parsing and processing functions on HTML elements with custom attributes, such as `if`, `for`, `connectorLine`, `editor`, `slider`, `radial-text`, `assistext`, and ` drag`.

> [!IMPORTANT]  
> You should call this function to render / execute the HTML tags.