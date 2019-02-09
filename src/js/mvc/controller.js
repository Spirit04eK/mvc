function Controller(model, view) {
    this._model = model;
    this._view = view;
}

Controller.prototype = {
    init: function () {
        this.watchAddItem();
        this.removeItem();
        return 0;
    },
    addItem: function (item) {
        return this._model.addItem(item);
    },
    watchAddItem: function () {
        var _this = this;
        $('#button').on("click", function () {
            var item = $('#add-menu').val();
            if (item === '') {
                $('#add-menu').css('border','2px solid red');
            } else {
                $('#add-menu').val('');
                return _this.addItem(item);
            }
        });
        return 0;
    },

    removeItem: function () {
        var _this = this;
        $('.header__list').on("click",'.header__list--item', function () {
            var idElement = $( this ).attr('data-id');
            return _this._model.removeItem(idElement);
        });
    }
};



