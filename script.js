// Конструктор  типо КЛАСС

var Hamburger = function (size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.allTopping = []

    // Делаем свойства "size"  "stuffing"  Приватными и защещаем их от перезаписи
    Object.defineProperty(this, "size", {
        writable: false
    });
    Object.defineProperty(this, "stuffing", {
        writable: false
    });
};
/* Размеры, виды начинок и добавок  */

Hamburger.SIZE_SMALL = {
    small: {
        "price": 50,
        "cal": 20
    }
};
Hamburger.SIZE_LARGE = {
    "big": {
        "price": 100,
        "cal": 40
    }
}
Hamburger.STUFFING_CHEESE = {
    "Cheese": {
        "price": 10,
        "cal": 20
    }
}
Hamburger.STUFFING_SALAD = {
    "Salad": {
        "price": 20,
        "cal": 5
    }
}
Hamburger.STUFFING_POTATO = {
    "Potato": {
        "price": 15,
        "cal": 10
    }
}
Hamburger.TOPPING_MAYO = {
    "mayo": {
        "price": 20,
        "cal": 5
    }
}
Hamburger.TOPPING_SPICE = {
    "spice": {
        "price": 15,
        "cal": 0
    }
}


// переменные управления значений в интерфейсе

small = Hamburger.SIZE_SMALL
big = Hamburger.SIZE_LARGE
Cheese = Hamburger.STUFFING_CHEESE
Salad = Hamburger.STUFFING_SALAD
Potato = Hamburger.STUFFING_POTATO
mayo = Hamburger.TOPPING_MAYO
spice = Hamburger.TOPPING_SPICE


// Блок управления интерфейсом

start_order.onclick = function () {
    start_order.style.display = "none";
    burg_size.style.display = "flex";
};

var sizeBurg = document.getElementsByClassName("enter_size")[0];


// Создаем новый заказ

var newHamburger = null;
sizeBurg.onclick = function () {

    try { //проверка выбраного размера
        var w = form_size.getElementsByTagName("input")
        for (var i = 0; i < w.length; i++) {
            if (w[i].checked) {
                valSize.value = w[i].value
                valSize.style.backgroundColor = "#FFFF00"
            };
        }
        // проверка выбраной добавки
        var t = form_stuffing.getElementsByTagName("input")
        for (var j = 0; j < t.length; j++) {
            if (t[j].checked) {
                valStuffing.value = t[j].value
                valStuffing.style.backgroundColor = "#FFFF00"
            };
        }
        if (valStuffing.value == false || valSize.value == false) {
            throw new HamburgerException("You have not chosen the size and / or stuffing of the hamburger. Please make your choice.");
        }
    } catch (e) {
        return
    }

    // Запуск Конструктор Гамбургера


    newHamburger = new Hamburger(window[valSize.value], window[valStuffing.value]);

    burg_size.style.display = "none";
    burg_toping.style.display = "flex";
}

var adMay = document.getElementsByClassName("add_mayo")[0];
var delMay = document.getElementsByClassName("delete_mayo")[0];
var adSpi = document.getElementsByClassName("add_spice")[0];
var delSpi = document.getElementsByClassName("delete_spice")[0];



// Добавить добавку к гамбургеру. Можно добавить несколько
//
adMay.onclick = function () {
    newHamburger.addTopping(mayo)
    valMayo.value = "Yes";
    valMayo.style.backgroundColor = "#00FF7F";
};

delMay.onclick = function () {
    valMayo.value = "No";
    newHamburger.removeTopping(mayo);
    valMayo.style.backgroundColor = "#FFA07A";
};
adSpi.onclick = function () {
    valSpice.value = "Yes";
    newHamburger.addTopping(spice);
    valSpice.style.backgroundColor = "#00FF7F";
};
delSpi.onclick = function () {
    valSpice.value = "No";
    newHamburger.removeTopping(spice);
    valSpice.style.backgroundColor = "#FFA07A";
};


// Добавить добавку, при условии, что ее нету

Hamburger.prototype.addTopping = function (topping) {
    try {
        for (let key = 0; key < this.allTopping.length; key++) {
            if (this.allTopping.includes(topping)) {
                throw new HamburgerException("Add Error.topping already exists");
            }
        }
    } catch (e) {}
    if (this.allTopping.length == 0) {
        this.allTopping.push(topping);
    } else {
        for (let key = 0; key < this.allTopping.length; key++) {
            if (!this.allTopping.includes(topping)) {
                this.allTopping.push(topping);
            }
        }
    }
}


// Убрать добавку, при условии, что она ранее была

Hamburger.prototype.removeTopping = function (topping) {
    try {
        if (!this.allTopping.includes(topping)) {
            throw new HamburgerException("Delete Error.no topping");
        }
    } catch (e) {}

    for (let key = 0; key < this.allTopping.length; key++) {
        if (this.allTopping[key] == topping) {
            this.allTopping.splice(key, 1)
        };
    }
}
save_order.onclick = function () {
    burg_toping.style.display = "none";
    finaly.style.display = "flex";
}

/* Получить список добавок. */

Hamburger.prototype.getToppings = function () {
    this.allTopping.forEach(function (value) {
        console.log(value);
    });
}

/* Узнать размер гамбургера */
Hamburger.prototype.getSize = function () {
    return this.size;
}
/* Узнать начинку гамбургера */

Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
}


// Узнать цену гамбургера  Цена в тугриках

prise.onclick = function () {
    valPrice.value = newHamburger.calculatePrice() +" " +"грн."
}

Hamburger.prototype.calculatePrice = function () {
    var priceAll = [];
    for (let key in this.stuffing) {
        priceAll.push(this.stuffing[key]['price'])
    }
    for (let key in this.size) {
        priceAll.push(this.size[key]['price'])
    }

    for (let key = 0; key < this.allTopping.length; key++) {
        var priceTop = this.allTopping[key]
        for (let mey in this.allTopping[key]) {
            priceAll.push(this.allTopping[key][mey]['price'])
        }
    }
    return result = priceAll.reduce(function (sum, current) {
        return sum + current
    })
};


calories.onclick = function () {
    valCalories.value = newHamburger.calculateCalories() +" " +"Ккал."
}
Hamburger.prototype.calculateCalories = function () {
    var calAll = [];
    for (let key in this.stuffing) {
        calAll.push(this.stuffing[key]['cal'])
    }
    for (let key in this.size) {
        calAll.push(this.size[key]['cal'])
    }

    for (let key = 0; key < this.allTopping.length; key++) {
        var priceTop = this.allTopping[key]
        for (let mey in this.allTopping[key]) {
            calAll.push(this.allTopping[key][mey]['cal'])
        }
    };
    return result = calAll.reduce(function (sum, current) {
        return sum + current
    });
};



// Представляет информацию об ошибке в ходе работы с гамбургером.


function HamburgerException(message) {
    report.value = message;
    report.style.backgroundColor = "#FFB6C1"
    setTimeout(function () {
        report.value = "";
        report.style.backgroundColor = "#ffffff"
    }, 1500);
}
