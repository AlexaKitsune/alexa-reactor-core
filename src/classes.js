/**
 * Draws a line that connects two elements, no matter where in the DOM they are.
 */
class ConnectorLine {

    /**
     * Constructor description.
     * @param {string} element1 - '.Class' or '#id' of the first element to connect.
     * @param {string} element2 - '.Class' or '#id' of the second element to connect.
     * @param {string} lineStyle_ - A string with the CSS style of the line.
     */
    constructor(element1, element2, id_, class_) {
        this.element1 = element("#" + element1);
        this.element2 = element("#" + element2);
        this.lineId_ = id_;
        this.lineClass_ = class_;
    }

    elementsPosition(element_) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        let e1Left = this.element1.getBoundingClientRect().left;
        let e1Right = this.element1.getBoundingClientRect().right;
        let e1Top = scrollTop + this.element1.getBoundingClientRect().top;
        let e1Bottom = scrollTop + this.element1.getBoundingClientRect().bottom;
        let e2Left = this.element2.getBoundingClientRect().left;
        let e2Right = this.element2.getBoundingClientRect().right;
        let e2Top = scrollTop + this.element2.getBoundingClientRect().top;
        let e2Bottom = scrollTop + this.element2.getBoundingClientRect().bottom;

        let element1_x = e1Left + ((e1Right - e1Left) / 2);
        let element1_y = e1Top + ((e1Bottom - e1Top) / 2);

        let element2_x = e2Left + ((e2Right - e2Left) / 2);
        let element2_y = e2Top + ((e2Bottom - e2Top) / 2);

        if (element_ == 1)
            return [element1_x, element1_y];
        if (element_ == 2)
            return [element2_x, element2_y];
    }

    lineLength() {
        return Math.sqrt(
            Math.pow((this.elementsPosition(2)[0] - this.elementsPosition(1)[0]), 2)
            +
            Math.pow((this.elementsPosition(2)[1] - this.elementsPosition(1)[1]), 2)
        )
    }

    lineAngle() {
        let lineTiltM = (this.elementsPosition(2)[1] - this.elementsPosition(1)[1]) / (this.elementsPosition(2)[0] - this.elementsPosition(1)[0]);
        let lineTiltAngle = Math.atan(lineTiltM);
        return lineTiltAngle;
    }

    polygonCut(polygonPercentA_, polygonPercentB_) {
        let result = `polygon(${polygonPercentA_}% 0%, ${polygonPercentB_}% 0%, ${polygonPercentB_}% 100%, ${polygonPercentA_}% 100%)`;
        return result;
    }

    /**
     * Draws the line in the DOM.
     * @param {number} polygonPercentA_ - Percentage of the line that will remain invisible near of the first element's side.
     * @param {number} polygonPercentB_ - Percentage of the line that will remain invisible near of the second element's side.
     * @param {string} [appendInto_=false] - '.Class' or '#id' of the element where the line will be inserted.
     */
    drawLine(polygonPercentA_, polygonPercentB_, appendInto_ = false) {
        DOMready(() => {
            let line = document.createElement('hr');
            line.id = this.lineId_;
            line.className = this.lineClass_;
            line.style.position = "absolute";
            line.style.margin = "0";
            line.style.padding = "0";
            line.style.transformOrigin = "top left";

            setTimeout(() => {
                line.style.top = `${this.elementsPosition(1)[1]}px`;
                line.style.left = `${this.elementsPosition(1)[0]}px`;
                line.style.width = `${this.lineLength()}px`;
                line.style.clipPath = this.polygonCut(polygonPercentA_, polygonPercentB_);
                line.style.transform = `rotate(${this.lineAngle()}rad)`;
            }, 10);

            if (appendInto_)
                element(appendInto_).appendChild(line);
            else
                document.body.appendChild(line);

            //if(document.readyState === true){}

            setTimeout(() => {
                line.style.top = `${this.elementsPosition(1)[1]}px`;
                line.style.left = `${this.elementsPosition(1)[0]}px`;
                line.style.width = `${this.lineLength()}px`;
                line.style.clipPath = this.polygonCut(polygonPercentA_, polygonPercentB_);
                line.style.transform = `rotate(${this.lineAngle()}rad)`;
                if (appendInto_)
                    element(appendInto_).appendChild(line);
                else
                    document.body.appendChild(line);
            }, 1000);

            addEventListener("resize", (event) => {
                line.style.top = `${this.elementsPosition(1)[1]}px`;
                line.style.left = `${this.elementsPosition(1)[0]}px`;
                line.style.width = `${this.lineLength()}px`;
                line.style.clipPath = this.polygonCut(polygonPercentA_, polygonPercentB_);
                line.style.transform = `rotate(${this.lineAngle()}rad)`;
                if (appendInto_)
                    element(appendInto_).appendChild(line);
                else
                    document.body.appendChild(line);
            });
        })
    }
}

/**
 * Creates a simple circle chart graphic.
 */
class CircleChart {

    /**
     * Constructor description.
     * @param {string} id_ - The id of the chart, without the '#' character.
     * @param {*} inputType_ - it can be the '%' character to specify that the chart will work with percentages, or any other input to work with absolute values.
     */
    constructor(id_, inputType_) {
        this.id_ = id_;
        this.inputType_ = inputType_;
    }

    createPercentages(gap_, percentages_) {
        let totalPercent = 0;
        let originalPercent = [];
        for (let x in percentages_) {
            totalPercent += parseFloat(Object.keys(percentages_[x])[0]);
            originalPercent.push(parseFloat(Object.keys(percentages_[x])[0]));
        }

        let percentToDeg = [];
        for (let x in originalPercent)
            if (this.inputType_ == '%')
                percentToDeg.push((360 / 100) * originalPercent[x]);
            else
                percentToDeg.push((360 / 100) * ((originalPercent[x] * 100) / totalPercent));

        if (totalPercent > 100 && this.inputType_ == '%')
            console.error(`${totalPercent}%\nPercentages sum should be <= 100%`);

        let currentDeg = 0;
        let result = "";
        for (let x = 0; x < percentToDeg.length; x++) {
            result += `${percentages_[x][Object.keys(percentages_[x])]} ${currentDeg}deg ${percentToDeg[x] + currentDeg}deg,`
                + `\ntransparent ${percentToDeg[x] + currentDeg}deg ${(percentToDeg[x] + currentDeg) + gap_}deg,\n`;
            currentDeg = percentToDeg[x] + currentDeg;
        }

        result = `conic-gradient(\ntransparent 0deg ${gap_}deg,\n${result}gray ${currentDeg}deg)`;
        return result;
    }

    holeChart(internalCircleSize_) {
        let precision = 64;
        let radius = internalCircleSize_ / 2;
        let c = [...Array(precision)].map((_, i) => {
            let a = -i / (precision - 1) * Math.PI * 2;
            let x = Math.cos(a) * radius + 50;
            let y = Math.sin(a) * radius + 50;
            return `${x}% ${y}%`
        });

        return `polygon(100% 50%, 100% 100%, 0 100%, 0 0, 100% 0, 100% 50%, ${c.join(',')})`;
    }

    createChart(size_, internalCircleSize_, gap_, percentages_) {
        let graphic = newElement(`<div id="${this.id_}"></div>`);
        graphic.setAttribute('style', `
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0ch !important; 
            width: ${size_};
            height: ${size_};
            border-radius: 1000vw;
            background-color: red;
            background: ${this.createPercentages(gap_, percentages_)};
            clip-path: ${this.holeChart(internalCircleSize_)};
        `);

        return graphic;
    }

    /**
     * Draws the chart in the DOM.
     * @param {string} size_ 
     * @param {number} internalCircleSize_ - A number that defines the percentage of the internal hole size of the chart.
     * @param {array} percentages_ - An array of objects. In each object can have only one key-value pair. The key is a number and the value is a string with a color in hexadecimal or HTML standard color name.
     * @param {number} [gap_=0] - The separation size between colors in the chart.
     * @param {string} [appendInto_=false] - '.Class' or '#id' of the element where the chart will be inserted.
     */
    drawChart(size_, internalCircleSize_, percentages_, gap_ = 0, appendInto_ = false) {
        try {
            element(`#${this.id_}`).remove();
        } catch (error) { error }
        if (appendInto_)
            element(appendInto_).appendChild(
                this.createChart(size_, internalCircleSize_, gap_, percentages_)
            );
        else
            document.body.appendChild(
                this.createChart(size_, internalCircleSize_, gap_, percentages_)
            );
    }
}

/**
 * Transforms specified elements to 3D objects by taking advantage of optical tricks.
 */
class Tridimension {

    /**
     * Constructor description.
     * @param {string} mode_ - The type of 3D effect. It can be: 'anaglyph' or 'parallax'.
     * @param {array} [glasses_=['cyan','magenta']] - The colors of the 3D glasses filter for the anaglyph.
     * @param {number} [framerate_=33] - Framerate in milliseconds for the update of the parallax.
     */
    constructor(mode_, glasses_ = ['cyan', 'red'], framerate_ = 33) {
        this.mode_ = mode_;
        this.framerate_ = framerate_;
        this.glasses_ = glasses_
    }

    elementPosition(element_) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let element_x = element_.getBoundingClientRect().left;
        let element_y = scrollTop + element_.getBoundingClientRect().top;
        return [element_x, element_y];
    }

    anaglyph(element_, depth_ = 0) {
        DOMready(() => {
            let element3D = element(element_);

            let difference = depth_;

            let cloneLeft = element3D.cloneNode(true);
            let cloneRight = element3D.cloneNode(true);
            cloneLeft.id += "-3DLeft";
            cloneRight.id += "-3DRight";
            document.body.appendChild(cloneLeft);
            document.body.appendChild(cloneRight);

            cloneLeft.style.pointerEvents = 'none';
            cloneRight.style.pointerEvents = 'none';
            cloneLeft.style.position = 'absolute';
            cloneRight.style.position = 'absolute';
            cloneLeft.style.opacity = 0.25;
            cloneRight.style.opacity = 0.25;
            cloneLeft.style.borderColor = this.glasses_[0];
            cloneRight.style.borderColor = this.glasses_[1];

            let tintL = document.createElement('div');
            tintL.style.position = 'absolute';
            tintL.style.top = 0;
            tintL.style.left = 0;
            tintL.style.width = '100%';
            tintL.style.height = '100%';
            tintL.style.zIndex = 1;
            tintL.style.mixBlendMode = "color";
            tintL.style.opacity = 1;
            tintL.style.backgroundColor = this.glasses_[0];
            cloneLeft.appendChild(tintL);

            let tintR = document.createElement('div');
            tintR.style.position = 'absolute';
            tintR.style.top = 0;
            tintR.style.left = 0;
            tintR.style.width = '100%';
            tintR.style.height = '100%';
            tintR.style.zIndex = 1;
            tintR.style.mixBlendMode = "color";
            tintR.style.opacity = 1;
            tintR.style.backgroundColor = this.glasses_[1];
            cloneRight.appendChild(tintR);

            //Positioning:
            let x_axis = this.elementPosition(element(element_))[0];
            let y_axis = this.elementPosition(element(element_))[1];
            cloneLeft.style.top = `${y_axis}px`;
            cloneLeft.style.left = `${x_axis - difference}px`;
            cloneLeft.style.margin = 0;
            cloneRight.style.top = `${y_axis}px`;
            cloneRight.style.left = `${x_axis + difference}px`;
            cloneRight.style.margin = 0;
            addEventListener("resize", (event) => {
                y_axis = this.elementPosition(element(element_))[1];
                x_axis = this.elementPosition(element(element_))[0];
                cloneLeft.style.top = `${y_axis}px`;
                cloneLeft.style.left = `${x_axis - difference}px`;
                cloneRight.style.top = `${y_axis}px`;
                cloneRight.style.left = `${x_axis + difference}px`;
            });

        });
    }

    /**
     * Creates a parallax effect by switching between 2 images. The framerate is defined when instantiates the class.
     * @param {string} image_ - The ID of the img element.
     * @param {string} img1src_ - The URL of the first image.
     * @param {string} img2src_ - The URL of the second image.
     */
    parallaxImage(image_, img1src_, img2src_) {
        let imageElement = element(image_);
        setInterval(() => {
            imageElement.src = img1src_;
            setTimeout(() => {
                imageElement.src = img2src_;
            }, this.framerate_ / 2);
        }, this.framerate_);
    }

    parallax(element_, depth_ = 0) {
        let element3D = element(element_);

        let marginL = getStyle(element_).marginLeft;
        let marginR = getStyle(element_).marginRight;
        console.log(marginL);

        setInterval(() => {
            element3D.style.marginLeft = `calc(${marginL} - ${depth_}px)`;
            element3D.style.marginRight = marginR;
            setTimeout(() => {
                element3D.style.marginRight = marginR;
                element3D.style.marginLeft = `calc(${marginL} + ${depth_}px)`;
            }, this.framerate_ / 2);
        }, this.framerate_);
    }

    /**
     * Applies 3D optical tricks to specified element.
     * @param {string} element_ - The id of the element to convert. We recommend that the element have its styles applied trough a .class, and not by its #id.
     * @param {number} depth_ - The 'depth' of the element (defined by its offset in pixels).
     */
    convert3D(element_, depth_) {
        if (this.mode_ == 'anaglyph')
            this.anaglyph(element_, depth_);
        if (this.mode_ == 'parallax')
            this.parallax(element_, depth_);
    }

}

module.exports = {
    ConnectorLine, CircleChart, Tridimension
};