

const DOMready = (function_) => document.addEventListener("DOMContentLoaded", function_);
const element = (element_) => typeof element_ == "object" ? element_ : document.querySelector(element_);
const elements = (element_) => document.querySelectorAll(element_);
const stylize = (element_) => element(element_).style;
const clicked = (element_, function_) => element(element_).onclick = function_;
const getStyle = (element_) => getComputedStyle(element(element_));
const getInnerHTML = (element_) => element(element_).innerHTML;

function setStyles(element_, stylesObject_) {
    for (const property in stylesObject_) {
        if (stylesObject_.hasOwnProperty(property)) {
            element_.style[property] = stylesObject_[property];
        }
    }
}

const keyByIndex = (object_, index_) => Object.keys(object_)[index_];
const valueByIndex = (object_, index_) => object_[Object.keys(object_)[index_]];
const keyByValue = (object_, value_) => Object.keys(object_).find(key => object_[key] === value_);

const Second = () => new Date().getSeconds();
const Minute = () => new Date().getMinutes();
const Hour = () => new Date().getHours();
const Day = () => new Date().getDate();
const Month = () => new Date().getMonth();
const Year = () => new Date().getFullYear();
const Century = () => Year() < 100 ? 1 : parseInt(String(Year()).slice(0, -2)) + 1;
const Millennium = () => Math.floor(parseInt(Century()) / 10);

/**
 * Function that returns an array of a range between two numbers.
 * @param {number} start_ - the initial number of the range (included).
 * @param {number} end_ - the final number of the range (included).
 * @param {number} [steps_=1] - The steps / increment of numbers in the range.
 * @returns {array} - An array with all the numbers into the range.
 */
function range(start_, end_, steps_ = 1) {
    let rangeArray = [];
    for (x = start_; x <= end_; x += steps_)
        rangeArray.push(x);
    return rangeArray;
}

function rand(randomArray_) {
    let index = Math.floor((Math.random() * (0 - randomArray_.length)) + randomArray_.length);
    return randomArray_[index];
}

/**
 * Triggers click on button or another clickable element when pressed enter key in another element.
 * @param {string} element_ - '.Class' or '#id' of the element that receives the enter key.
 * @param {string} button_ - '.Class' or '#id' of the button to trigger.
 */
function withEnterTriggerClick(element_, button_) {
    let input = element(element_);

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            element(button_).click();
        }
    });
}

/**
 * Executes a function when a specific key is pressed in some element.
 * @param {string} element_ - Class or id of the element that receives the enter key.
 * @param {string} key_ - The key that triggers the function execution.
 * @param {function} function_ - Function to execute.
 */
function withKeyTriggerFunction(element_, key_, function_) {
    let input = element(element_);

    input.addEventListener("keypress", function (event) {
        if (event.key === key_)
            function_();
    });
}

/**
 * Detect mouse drag and executes a function when drag in specific direction.
 * @param {String} where_ - The element where the event will be detected.
 * @param {String} direction_ - The direction that will trigger the function. It can be 'right', 'left', 'up' or 'down'.
 * @param {function} function_ - The function we want to execute.
 * @param {number} sensitivity_ - The speed and responsiveness of the mouse of touch.
 */
function detectDrag(where_, direction_, function_, sensitivity_ = 0) {
    let drag = false;
    let mouseMove = false;
    let mouseDown = false;
    let horizontalPosition;
    let verticalPosition;

    where_.addEventListener('mousedown', () => {
        drag = false;
        mouseDown = true;
        horizontalPosition = event.clientX;
        verticalPosition = event.clientY;
    });

    where_.addEventListener('mousemove', () => {
        drag = true;
        mouseMove = true;
        if (mouseDown && drag && mouseMove) {

            if (direction_ == 'right')
                if (event.clientX > horizontalPosition + sensitivity_) {
                    function_();
                    horizontalPosition = event.clientX;
                }

            if (direction_ == 'left')
                if (event.clientX < horizontalPosition - sensitivity_) {
                    function_();
                    horizontalPosition = event.clientX;
                }

            if (direction_ == 'up')
                if (event.clientY > verticalPosition + sensitivity_) {
                    function_();
                    verticalPosition = event.clientY;
                }

            if (direction_ == 'down')
                if (event.clientY < verticalPosition - sensitivity_) {
                    function_();
                    verticalPosition = event.clientY;
                }

            //verticalPosition = event.clientY;
        }
    });

    where_.addEventListener('mouseup', () => {
        mouseDown = false;
    });
}

/**
 * Simulates a 3D/360 model using a sequence of images by dragging mouse over the displayed element/image.
 * @param {String} where_ - The element where the event will be detected.
 * @param {String} imgElement_ - The img tag element that will show the images.
 * @param {array} imagesPathArray_ - An array of the images that will be shown.
 * @param {string} direction_ - Drag direction. It can be 'horizontal' or 'vertical'.
 * @param {boolean} repeat_ - If the sequence will stop when reaches the end, or will be restarted an repeating.
 * @param {boolean} [reverseControls_=false] - Normal or reverse direction drag control.
 * @param {number} [initialIndex_=0] - The first image that will be shown.
 * @param {number} sensitivity_ - The speed and responsiveness of the mouse of touch.
 */
function simulation360(where_, imgElement_, imagesPathArray_, direction_, repeat_, reverseControls_ = false, initialIndex_ = 0, sensitivity_ = 0) {
    let index = initialIndex_;
    let arrayMax = imagesPathArray_.length;
    let horizontal = reverseControls_ == true ? ['right', 'left'] : ['left', 'right'];
    let vertical = reverseControls_ == true ? ['up', 'down'] : ['down', 'up'];
    let movement;
    if (direction_ == 'horizontal')
        movement = horizontal;
    if (direction_ == 'vertical')
        movement = vertical;
    imgElement_.src = imagesPathArray_[index];

    detectDrag(where_, movement[0], () => {
        console.log(movement[0] + imagesPathArray_[index]);
        imgElement_.src = imagesPathArray_[index];
        if (repeat_ == false) {
            if (index > 0)
                index--;
        } else {
            if (index == 0)
                index = arrayMax - 1;
            index--;
        }
    }, sensitivity_);

    detectDrag(where_, movement[1], () => {
        console.log(movement[1] + imagesPathArray_[index]);
        imgElement_.src = imagesPathArray_[index];
        if (repeat_ == false) {
            if (index < arrayMax - 1)
                index++;
        } else {
            if (index == arrayMax - 1)
                index = 0;
            index++;
        }
    }, sensitivity_);

}

function detectCollisionCoordinates(element_, type_) {
    const rect = element_.getBoundingClientRect();
    const result = {
        "topLeft": { x: parseInt(rect.left), y: parseInt(rect.top) },
        "topRight": { x: parseInt(rect.right), y: parseInt(rect.top) },
        "bottomLeft": { x: parseInt(rect.left), y: parseInt(rect.bottom) },
        "bottomRight": { x: parseInt(rect.right), y: parseInt(rect.bottom) }
    };

    const rangeX = [result.topLeft.x, result.bottomRight.x];
    const rangeY = [result.topLeft.y, result.bottomRight.y];

    return type_ === "collided" ? { rangeX, rangeY } : result;
}

/**
 * Detect collision between two elements.
 * @param {*} element1_ - Element you want to detect collision.
 * @param {*} element2_ - Element where collision will be detected.
 * @returns {boolean} - true if collision detected, false if not.
 */
function detectCollision(element1_, element2_) {
    const element1 = detectCollisionCoordinates(element1_);
    const element2 = detectCollisionCoordinates(element2_, "collided");

    const corners = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
    let collision = false;

    corners.forEach(corner => {
        const xOverlap = element1[corner].x >= element2.rangeX[0] && element1[corner].x <= element2.rangeX[1];
        const yOverlap = element1[corner].y >= element2.rangeY[0] && element1[corner].y <= element2.rangeY[1];
        if (xOverlap && yOverlap) {
            collision = true;
        }
    });

    return collision;
}

/**
 * Drag and drop functionality.
 * @param {*} element_ - Draggable element.
 * @param {*} dropZone_ - Element that will act as the drop zone.
 * @param {function} functionDropHover_ - Function that will execute while the draggable element is over the drop zone, but not released yet.
 * @param {function} functionDropReleased_ - Function that will execute when the draggable element is finally released on the drop zone.
 */
function draggableElement(element_, dropZone_=undefined, functionDropHover_=undefined, functionDropReleased_=undefined){
    let offsetX, offsetY;
    let isDragging = false;
    
    element_.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - element_.getBoundingClientRect().left;
        offsetY = e.clientY - element_.getBoundingClientRect().top;
        element_.style.zIndex = "1";
        e.preventDefault();
    });
    
    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

            if(dropZone_ != undefined && functionDropHover_ != undefined)
            if(detectCollision(element_, dropZone_))
                if(typeof functionDropHover_ == "string")
                    eval(functionDropHover_);
                else
                    functionDropHover_();
                    
            element_.style.left = x + "px";
            element_.style.top = y + "px";
        }
    });
    
    document.addEventListener("mouseup", () => {
        isDragging = false;
        element_.style.zIndex = "0";
    });

    element_.addEventListener("mouseup", ()=>{
        if(dropZone_ != undefined && functionDropReleased_ != undefined)
        if(detectCollision(element_, dropZone_))
            if(typeof functionDropReleased_ == "string")
                eval(functionDropReleased_);
            else
                functionDropReleased_();
    });
    
    element_.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });
}

module.exports = {
    DOMready, element, elements, stylize, clicked, getStyle, getInnerHTML, setStyles, keyByIndex, valueByIndex, keyByValue, Second, Minute, Hour, Day, Month, Year, Century, Millennium, range, rand, withEnterTriggerClick, withKeyTriggerFunction, detectDrag, simulation360, detectCollision, draggableElement 
}