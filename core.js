/**
 * @author Alexa N <alexa.nc.kitsune@gmail.com>
 */

const { DOMready, element, elements, stylize, rewriteCSS, stackCSS, clicked, getStyle, getInnerHTML, keyByIndex, valueByIndex, keyByValue, Second, Minute, Hour, Day, Month, Year, Century, Millennium, range, rand, withEnterTriggerClick, withKeyTriggerFunction, detectDrag, simulation360, connectorLine } = require('./src/functions');

try {
    module.exports = {
        DOMready, element, elements, stylize, rewriteCSS, stackCSS, clicked, getStyle, getInnerHTML, keyByIndex, valueByIndex, keyByValue, Second, Minute, Hour, Day, Month, Year, Century, Millennium, range, rand, withEnterTriggerClick, withKeyTriggerFunction, detectDrag, simulation360, connectorLine,
    };
} catch (error) { error }