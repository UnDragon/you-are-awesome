const createEnumerableProperty = function(property) {
    return property;
};

const createNotEnumerableProperty = function(property) {
    Object.defineProperty(Object.prototype, property, {
        get: function () {
            return Object.prototype.propertyValue;
        },
        set: function (value) {
            Object.prototype.propertyValue = value;
        },
    });
    return property;
};

const createProtoMagicObject = function() {
    var object = new Function();
    object.prototype = {};
    object.__proto__ = object.prototype;
    return object;
};

const incrementor = function() {
    if (!Function.prototype._value) {
        Function.prototype._value = 0;
    }
    incrementor.__proto__.valueOf = function () {
        return Function.prototype._value;
    };
    Function.prototype._value++;
    return incrementor;
};

var value = 0;
const asyncIncrementor = function() {
    return new Promise(function(resolved) {
        value++;
        return resolved(value);
    });
};

const createIncrementer = function() {
    var increnenter = {
        value: 0,
        next: function() {
            ++this.value;
            return this;
        },
        [Symbol.iterator]: function() {
            return this;
        }
    };
    return increnenter;
};

const returnBackInSecond = function (property) {
    return new Promise(function(resolve) {
        setTimeout(function () {
            resolve(property);
        }, 1100);
    }).then(function(property) {
        return property;
    });
};

const getDeepPropertiesCount = function(obj) {
    var properties = Object.getOwnPropertyNames(obj),
        propertiesCount = properties.length;
    for (var property of properties) {
        if (Object.getOwnPropertyNames(obj[property]).length > 0) {
            propertiesCount += getDeepPropertiesCount(obj[property]);
        }
    }
    return propertiesCount;
};

const createSerializedObject = function() {
    return {
        valueOf: function () {
            return '';
        },
        toJSON: function () {
            return '';
        }
    }
};

const sortByProto = function(arr) {
    return arr.map(function (item, index) {
        var count = 0;
        while (item = item.__proto__) {
            count++;
        }
        return [count, arr[index]];
    })
        .sort(function (a, b) {
            if (a[0] > b[0]) {
                return 1;
            } else if (a[0] < b[0]) {
                return -1;
            } else {
                return 0;
            }
        })
        .map(function ([item, index]) {
            return index;
        });
};

exports.createEnumerableProperty = createEnumerableProperty;
exports.createNotEnumerableProperty = createNotEnumerableProperty;
exports.createProtoMagicObject = createProtoMagicObject;
exports.incrementor = incrementor;
exports.asyncIncrementor = asyncIncrementor;
exports.createIncrementer = createIncrementer;
exports.returnBackInSecond = returnBackInSecond;
exports.getDeepPropertiesCount = getDeepPropertiesCount;
exports.createSerializedObject = createSerializedObject;
exports.sortByProto = sortByProto;
