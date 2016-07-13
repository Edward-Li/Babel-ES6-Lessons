var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;


function multiply(x, y) {
    return x * y;
};

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static classMethod() {
        return 'hello';
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

export {firstName, lastName, year, multiply, Point};