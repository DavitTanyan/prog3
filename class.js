class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

   
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        
        if (newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}


class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
    }
   
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {

        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
    eat() {


        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);

                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;

        }
    }
    mul() {
        var newCell = random(this.chooseCell(0))
        if (newCell && this.energy > 8) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 2
            var newGrassEater = new GrassEater(newX, newY, 2)
            grassEaterArr.push(newGrassEater)
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1)
                }
            }
        }
    }
}


class Gishatich {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.sov = 15;
        this.index = index
        this.directions = [];

    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x + 3, this.y - 1],
            [this.x - 1, this.y + 3],
            [this.x + 2, this.y - 1]
        ]
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }

        }
        return found;

    }

    mul() {
        var newCell = random(this.chooseCell(0))
        if (newCell && this.sov > 20) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 3
            var gt = new Gishatich(newX, newY, 3)
            gishatichArr.push(gt)
            this.sov = 15
        }
    }

    move() {
        var newCell = random(this.chooseCell(0))
        this.sov -= 2;
        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY

        }
    }

    eat() {
        var food = random(this.chooseCell(2))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)

                }

            }

            this.x = newX
            this.y = newY
            this.sov += 2
        }
    }

    die() {
        if (this.sov <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1)
                }
            }
        }
    }
}
class Txa {
    constructor(x, y, index) {
        this.x = x
        this.y = y
        this.stamoqs = 25
        this.index = index
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x + 3, this.y - 1],
            [this.x - 1, this.y + 3],
            [this.x + 2, this.y - 1],
            [this.x, this.y + 6],
            [this.x + 4, this.y - 2]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        var newCell = random(this.chooseCell(0))
        if (newCell && this.stamoqs > 35) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 4
            var bt = new Txa(newX, newY, 4)
            txaarr.push(bt)
            this.stamoqs = 25
        }

    }

    move() {
        var newCell = random(this.chooseCell(0))
        
        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            this.stamoqs -= 2;

        }
    }
    eat() {
        this.stamoqs--;
        var food = random(this.chooseCell(2))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                }

            }
            this.x = newX
            this.y = newY
            this.stamoqs += 1
        }
        
    }
    die() {
        if (this.stamoqs <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in txaarr) {
                if (txaarr[i].x == this.x && txaarr[i].y == this.y) {
                    txaarr.splice(i, 1)
                }
            }
        }

    }
}
class Boss {
    constructor(x, y, index) {
        this.x = x
        this.y = y
        this.qaxc = 10
        this.index = index
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x + 3, this.y - 1],
            [this.x - 1, this.y + 3],
            [this.x + 2, this.y - 1],
            [this.x, this.y + 6],
            [this.x + 4, this.y - 2]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        var newCell = random(this.chooseCell(0))
        if (newCell && this.qaxc > 50) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 5
            var at = new Boss(newX, newY, 5)
            Bossarr.push(at)
            this.qaxc = 10

        }

    }

    move() {

        this.qaxc--;
        var newCell = random(this.chooseCell(0))
        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0;

            this.x = newX
            this.y = newY
            
        }
        
    }
    eat() {
        var food3 = this.chooseCell(3)
        var food2 = this.chooseCell(4)
        var foods = food2.concat(food3)

        var food4 = random(foods)
        if (food4) {
            var newX = food4[0]
            var newY = food4[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0;
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == newX && gishatichArr[i].y == newY) {
                    gishatichArr.splice(i, 1)
                }

            }
            for (var i in txaarr) {
                if (txaarr[i].x == newX && txaarr[i].y == newY) {
                    txaarr.splice(i, 1)
                }

            }

            this.x = newX
            this.y = newY
        }

    }

    die() {
        if (this.qaxc <= 0) {
            matrix[this.y][this.x] = 0
            
            for (var i in Bossarr) {
                if (Bossarr[i].x == this.x && Bossarr[i].y == this.y) {
                    Bossarr.splice(i, 1)
                }
            }
        }

    }
}
