function Model(view) {
    this.arr = [];
    this._view = view;

}

Model.prototype = {
    getItems: function () {
        var saveArr = localStorage.getItem("data");
        if (saveArr !== null) {
            if (saveArr.length !== 0) {
                saveArr = saveArr.split(',');
                this.arr = this.arr.concat(saveArr);
                return this._view.render(saveArr);
            }
        } else return 0;
    },

    addItem: function (item) {
        if (this.arr.length < 5) {
            this.arr.push(item);
            localStorage.setItem("data", this.arr.join());
            return this._view.render(this.arr);
        } else {
            return this._view.errorLenght();
        }
    },

    removeItem: function (idElement) {
        this.arr.splice(idElement, 1);
        localStorage.setItem("data", this.arr.join());
        return this._view.render(this.arr);
    }
};
