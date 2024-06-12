import Map from "./map.js";
import Food from "./food.js";
import Snake from "./snake.js";

export default class Game {
  constructor(el, rect) {
    // Map class
    this.map = new Map(el, rect);
    // Food class
    this.food = new Food(this.map.cols, this.map.rows);
    // Snake class
    this.snake = new Snake();

    this.keydown();
    this.move();
    this.render();
  }

  // Create food at a random position
  createFood() {
    this.food.create();

    if (this.map.hasNode(this.food.data)) {
      this.createFood();
    }
    this.map.addNode(this.food.data);
  }
  
  // Make it move
  move() {
    let timer = setInterval(() => {
      if (this.isOver()) {
        alert("Game Over");
        clearInterval(timer);
        return;
      }
      this.snake.move();
      if (this.isFood()) {
        this.snake.eat();
        this.food.create();
      }
      this.render();
    }, 200);
  }

  // Check if the game is over
  isOver() {
    // Hit the wall
    if (
      this.snake.data[0].x < 0 ||
      this.snake.data[0].x > this.map.rows - 1 ||
      this.snake.data[0].y < 0 ||
      this.snake.data[0].y > this.map.cols - 1
    ) {
      return true;
    }

    // Hit itself
    for (let i = 1; i < this.snake.data.length; i++) {
      if (
        this.snake.data[0].x === this.snake.data[i].x &&
        this.snake.data[0].y === this.snake.data[i].y
      ) {
        return true;
      }
    }
    return false;
  }

  // Render the data
  render() {
    this.map.clear();
    this.map.addNode(this.snake.data);
    this.map.addNode(this.food.data);
    this.map.render();
  }

  // Check if the snake has eaten the food
  isFood() {
    return (
      this.snake.data[0].x === this.food.data.x &&
      this.snake.data[0].y === this.food.data.y
    );
  }

  // Keydown event
  keydown() {
    // Note that this is an arrow function
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowUp":
          this.snake.dir("top");
          break;
        case "ArrowDown":
          this.snake.dir("bottom");
          break;
        case "ArrowLeft":
          this.snake.dir("left");
          break;
        case "ArrowRight":
          this.snake.dir("right");
          break;
      }
    });
  }
}