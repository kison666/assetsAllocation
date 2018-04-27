/**
 * 处理FOF symbol格式
 */

var getFofSymbol = function(symbol) {
    if (!symbol) {
        return sympbol;
    }
    
    if(symbol.indexOf('.PO') >= 0){
        return symbol.substring(0,symbol.indexOf('.PO'));
    }

    return symbol;
};

export { getFofSymbol }
