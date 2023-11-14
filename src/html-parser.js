function fixEvalUndef(str_) {
    try {
        return eval(str_);
    } catch (error) {
        return str_;
    }
}

function matchEval(from_, to_, str_) {
    const regex = new RegExp(`(?<![a-zA-Z0-9])${from_}(?![a-zA-Z0-9])`, "g");
    let replacedStr = str_.replace(regex, to_);
    const regex2 = /{{(.*?)}}/g;
    replacedStr = replacedStr.replace(regex2, (match, p1) => fixEvalUndef(p1));
    return replacedStr;
}

function parseIf(element_) {
    let condition = element_.getAttribute('cond');
    let preProcess = element_.innerHTML.replaceAll('</else>', '').split('<else>');
    if (eval(condition))
        element_.innerHTML = preProcess[0];
    else
        element_.innerHTML = preProcess[1];
}

function parseFor(element_) {
    let forType;
    let initialize = element_.getAttribute("init");
    let forOf = element_.getAttribute("of");
    let forIn = element_.getAttribute("in");
    let condition = element_.getAttribute("cond");
    let increment = element_.getAttribute("incr");
    let content = element_.innerHTML;
    element_.innerHTML = "";

    if (forOf != null)
        forType = "for-of";
    if (forIn != null)
        forType = "for-in";
    if (increment != null)
        forType = "for-x";

    if (forType == "for-of") {
        let key = initialize.replaceAll(" ", "");
        for (key_ of eval(forOf))
            element_.innerHTML += matchEval(key, key_, content);
    }

    if (forType == "for-in") {
        let key = initialize.replaceAll(" ", "");
        for (key_ in eval(forIn))
            element_.innerHTML += matchEval(key, key_, content);
    }

    if (forType == "for-x") {
        let originalNameVar = initialize.split("=")[0].replaceAll(" ", "");
        let initialValue = eval(initialize.split("=")[1].replaceAll(" ", ""));

        for (i = initialValue; eval(`${condition}`); eval(`${increment}`))
            element_.innerHTML += matchEval(originalNameVar, i, content);
    }
}

function parseConnectorLines(element_){
    element_.style.display = "none";
    let cl = new ConnectorLine(element_.getAttribute("from"), element_.getAttribute("to"), element_.id, element_.className);
    element_.id = "";
    element_.className = "";
    cl.drawLine();
}

function parseEditor(element_){
    let editorName = element_.getAttribute("name");
    let editorIn = document.querySelector(`editor[name="${editorName}"][input]`);
    let editorOut = document.querySelector(`editor[name="${editorName}"][output]`);

    editorIn.setAttribute('contenteditable', 'true');
    let COVEN_DISPLAYS = [];
    function display(x) { return x; }
    function addToCovenDisplays(x) { COVEN_DISPLAYS.push(x); }
    setInterval(() => {
        COVEN_DISPLAYS = [];
        var getCode = editorIn.textContent;
        let processedCode = display(`\n ${getCode} \n`);
        try {
            editorOut.innerHTML = "🦊>> " + eval(`${processedCode.replaceAll('console.log', 'addToCovenDisplays')}`
                + `
                display( COVEN_DISPLAYS.join("<br>🦊>> ") );
                `
            );
        } catch (error) {
            try {
                editorOut.innerHTML = "🦊>> " + error;
            } catch (error) {
                console.log(`There is no output editor; try adding an: <editor output name="${editorIn.getAttribute("name")}"></editor> to your HTML.`);
            }
        }
    }, 2000);
}

function parseSlider(element_){
    if (!element_.hasAttribute("id"))
        return console.error("<slider> element should have an 'id' attribute.")

    let sliderChildren = document.querySelectorAll(`#${element_.id} > *`);
    console.log(sliderChildren)
    let container = document.createElement('div');
    element_.appendChild(container);
    const numElements = sliderChildren.length;

    const intervalTime = parseInt(element_.getAttribute("interval")) || 1000;

    element_.style.display = "flex";
    element_.style.overflow = "hidden";

    let duplicate;
    for(let i = 0; i < sliderChildren.length; i++){
        container.appendChild(sliderChildren[i]);
        if (i == sliderChildren.length - 1) {
            duplicate = sliderChildren[0].cloneNode(true);
            container.appendChild(duplicate);
        }
        setTimeout(() => {
            sliderChildren[i].style.width = element_.offsetWidth + "px";
            sliderChildren[i].style.overflow = "hidden";
            sliderChildren[i].style.display = "flex";
            duplicate.style.width = element_.offsetWidth + "px";
            duplicate.style.overflow = "hidden";
            duplicate.style.display = "flex";
        }, 1);
    }

    container.style.display = "flex";
    container.style.width = element_.offsetWidth * (sliderChildren.length + 1) + "px";
    
    let counter = 0;
    setInterval(() => {   
        if(counter == numElements){
            element_.style.scrollBehavior = "unset";
            element_.scrollLeft = 0;
            counter = 1;
            element_.style.scrollBehavior = "smooth";
            element_.scrollLeft += element_.offsetWidth;
            return;
        }
        element_.style.scrollBehavior = "smooth";
        element_.scrollLeft += element_.offsetWidth;
        counter++;
    }, intervalTime);
}

function parseRadialText(element_){
    let text = [...element_.textContent.trim().split(""), " "];
    let adjustRotation = parseInt(element_.getAttribute("adjust-rotation")) || 0;
    let angle = parseInt(element_.getAttribute("angle")) || 360;
    element_.innerHTML = "";
    element_.style.display = "flex";
    element_.style.alignItems = "center";
    element_.style.justifyContent = "center";
    
    for(i in text){
        let letter = document.createElement('div');
        letter.textContent = text[i];
        letter.style.position = "absolute";
        letter.style.height = "inherit";
        letter.style.transform = `rotate(${(angle/text.length * i) + adjustRotation}deg)`;
        element_.appendChild(letter);
    }
}

function parseDrag(element_){
    element_.style.position = "absolute";
    let target = element_.getAttribute("target");
    let fnHover = element_.getAttribute("fn-hover");
    let fnRelease = element_.getAttribute("fn-release");
    draggableElement(
        element_,
        target == null ? undefined : document.getElementById(target),
        fnHover == null ? undefined : fnHover,
        fnRelease == null ? undefined : fnRelease
    );
}

/**
 * Returns text in assistive text reading style, using <b> tag.
 * @param {string} input_ - Text to convert.
 * @returns {string} - Converted text.
 */
function assistext(input_){
    const words = input_.split(' ');
    const boldedWords = words.map( word => {
        if (word.length === 1) {
            return `<b>${word}</b>`;
        }
        const firstHalf = word.slice(0, Math.floor(word.length / 2));
        const secondHalf = word.slice(Math.floor(word.length / 2));
        return `<b>${firstHalf}</b>${secondHalf}`;
    });
    return boldedWords.join(' ');
}

function parseAssistext(element_){  
    element_.innerHTML = assistext(element_.innerHTML);
}

function htjs() {
    let IFs = document.getElementsByTagName("if");
    let FORs = document.getElementsByTagName("for");
    let CONNECTORLINEs = document.getElementsByTagName("connector-line");
    let EDITORs = document.querySelectorAll('editor[input]');
    let SLIDERs = document.getElementsByTagName("slider");
    let RADIALTEXTs = document.getElementsByTagName("radial-text");
    let ASSISTEXTs = document.getElementsByTagName("assistext");
    let DRAGGABLEs = document.getElementsByTagName("draggable");
    for (x of IFs) parseIf(x);
    for (x of FORs) parseFor(x);
    for (x of CONNECTORLINEs) parseConnectorLines(x);
    for (x of EDITORs) parseEditor(x);
    for (x of SLIDERs) parseSlider(x);
    for (x of RADIALTEXTs) parseRadialText(x);
    for (x of ASSISTEXTs) parseAssistext(x);
    for (x of DRAGGABLEs) parseDrag(x);
}

try {
    module.exports = {
        htjs
    }
} catch (error) {
    
}
