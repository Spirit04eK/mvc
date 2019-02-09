var InstanceStorage = (function () {
    var ObjInstanceStorage = {};
    var instance;
    //Положить объект
    var set = function (property, data) {
        if (property in ObjInstanceStorage) {
            return console.error('Такое свойство уже существует');
        } else {
            ObjInstanceStorage[property] = data;
            return ObjInstanceStorage;
        }
    };

    //Получить объект
    var get = function (property) {
        if (property in ObjInstanceStorage) {
            return ObjInstanceStorage[property];
        } else {
            return console.error('Свойство ' + property + ' у объекта не существует');
        }
    };

    //Проверка на существование объекта
    var has = function (property) {
        if (property in ObjInstanceStorage) {
            return console.info('Свойство ' + property + ' присутствует у объекта');
        } else {
            return console.info('Свойство ' + property + ' у объекта не существует');
        }
    };

    var createInstance = function () {
        return {
            set: set,
            get: get,
            has: has
        }
    };

    return {
        getInstance: function() {
            return instance || (instance = createInstance());
        }
    }

})();




