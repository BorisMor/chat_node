/**
 * Лог с цветом
 * colorMaska - маска с цветом,
 * argumentsArr - выводимые параметры
 * https://github.com/shiena/ansicolor/blob/master/README.md
 */
exports.showMessageColor = function(colorMaska, argumentsArr) {
    if (typeof colorMaska !== "string") {
        colorMaska = '\x1b[36m %s \x1b[0m'
    }

    var arr = [
        colorMaska,
    ];

    var len = argumentsArr.length
    var main = '' + argumentsArr[0] + ((len > 1) ? ':' : '');
    arr.push(main);

    for (var i = 1, len = argumentsArr.length; i < len; i++) {
        arr.push(argumentsArr[i])
    }

    console.log.apply(null, arr);
}

/**
 * Опредление IP в строке
 */
exports.getIP = (s) => {
    var sIP = s || "";

    if (sIP == "") {
        return undefined;
    }

    var regLst = [
        /:?(\d+\.\d+\.\d+\.\d+)$/,
        /[0-9a-f]+:[0-9a-f]+:[0-9a-f]+:[0-9a-f]+:[0-9a-f]+:[0-9a-f]+:[0-9a-f]+:[0-9a-f]+/i
    ];

    for (var i = 0, len = regLst.length; i < len; i++) {
        var res = regLst[i].exec(sIP);
        if (res != null) {
            return res[0];
        }
    }

    return undefined;
}

/**
 * Проверка на пустой IP
 */
exports.emptyIP = function(value) {
    return exports.empty(value) || value == ':127.0.0.1' || value == '127.0.0.1'
}

/**
 * Проверка на пустое значение
 */
exports.empty = function(value) {
    return typeof value === "undefined" || value == null || Number.isNaN(value)
}