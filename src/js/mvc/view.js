function View() {

}

View.prototype = {
    render: function (arr) {
        $('.header__list--item').remove();
        $('.nav-mobile__item').remove();
        for (var i=0; i<arr.length; i++) {
            $(".header__list").append("<li class='header__list--item' data-id='"+i+"'><a>"+arr[i]+"</a></li>");
            $(".nav-mobile__list").append("<li class='nav-mobile__item'><a>"+arr[i]+"</a></li>");
        }
        return 0;
    },
    errorLenght: function () {
        $('.add-menu__form').append("<div class='error'><h3 class='error--text'>Превышена допустимая длина меню</h3></div>");
        setTimeout( function () {
            $('.error').remove();
        }, 3000);
        console.log("Превышена допустимая длина меню");
    }
};

//Инициализация объектов
var viewCommon = new View();
var modelCommon = new Model(viewCommon);
modelCommon.getItems();
var controllerCommon = new Controller(modelCommon, viewCommon);
controllerCommon.init();
