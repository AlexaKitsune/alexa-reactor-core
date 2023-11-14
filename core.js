/**
 * @author Alexa N <alexa.nc.kitsune@gmail.com>
 */

const { ConnectorLine, CircleChart, Tridimension } = require('./src/classes');
const { DOMready, element, elements, stylize, rewriteCSS, stackCSS, clicked, getStyle, getInnerHTML, keyByIndex, valueByIndex, keyByValue, Second, Minute, Hour, Day, Month, Year, Century, Millennium, range, rand, withEnterTriggerClick, withKeyTriggerFunction, detectDrag, simulation360 } = require('./src/functions');
const { htjs } = require('./src/html-parser');

if (typeof window !== 'undefined')
    Window.prototype.SummonCoven = () => true;

try {
    module.exports = {
        ConnectorLine, CircleChart, Tridimension,
        DOMready, element, elements, stylize, rewriteCSS, stackCSS, clicked, getStyle, getInnerHTML, keyByIndex, valueByIndex, keyByValue, Second, Minute, Hour, Day, Month, Year, Century, Millennium, range, rand, withEnterTriggerClick, withKeyTriggerFunction, detectDrag, simulation360,
        htjs
    };
} catch (error) { error }