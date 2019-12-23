function Snake(target) {
  this.leng = [];
  this.target = target;
  this.current_food = [];
  this.body = document.createElement('div');

  this.initial_snake = function(x, y) {
    const snake = document.createElement('span');
    snake.classList.add('snake-body');
    this.leng.push([x, y]);
    Object.assign(snake.style, {
      top: `${y * 5}px`,
      left: `${x * 5}px`,
    });
    this.body.append(snake);
    this.target.append(this.body);
  }

  this.set_food = function(x, y) {
    this.current_food = [x, y];
  }

  this.increase_snake_leng = function(x, y) {
    const snake = document.createElement('span');
    snake.classList.add('snake-body');
    this.leng.unshift([x, y]);
    Object.assign(snake.style, {
      top: `${y * 5}px`,
      left: `${x * 5}px`,
    });
    this.body.prepend(snake);
  }

  this.remove_snake = function() {
    this.leng = [];
    this.target.removeChild(this.body);
    this.body = document.createElement('div');
  }
  
  this.moveSnake = function(fix, callback) {
    const snakeBodys = this.body.childNodes;
    const lastIdx = snakeBodys.length - 1;
    const snakeTail = snakeBodys[lastIdx];

    const [x, y] = this.leng[0];
    this.leng.pop();

    const [next_x, next_y] = [x + fix[0], y + fix[1]];

    this.leng.unshift([next_x, next_y]);
    this.body.prepend(snakeTail);
    Object.assign(snakeTail.style, {
      top: `${next_y * 5}px`,
      left: `${next_x * 5}px`,
    });

    if (this.checkIfEatFood(next_x, next_y)) {
      callback();
    }
  }

  this.checkIfEatFood = function(x, y) {
    const [food_x, food_y] = this.current_food;
    if (x == food_x && y == food_y) {
      this.increase_snake_leng(x, y);
      return true;
    }
    return false;
  }
}
