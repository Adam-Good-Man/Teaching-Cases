export default class Snake {
  constructor() {
    // The data contains a snake head and 3 snake body segments
    this.data = [
      {
        x: 10,
        y: 10,
      },
      {
        x: 9,
        y: 10,
        type: "snake",
      },
      {
        x: 8,
        y: 10,
        type: "snake",
      },
      {
        x: 7,
        y: 10,
        type: "snake",
      },
    ];
    this.lastNode = null;

    // Default movement direction is to the right
    this.direction = "right";
  }

  // Change movement direction
  dir(direction) {
    if (direction === "left" && this.direction === "right") return false;
    if (direction === "right" && this.direction === "left") return false;
    if (direction === "top" && this.direction === "bottom") return false;
    if (direction === "bottom" && this.direction === "top") return false;

    this.direction = direction;
    return true;
  }

  // Move
  move() {
    // Get the index of the last node
    let i = this.data.length - 1;

    this.lastNode = {
      x: this.data[i].x,
      y: this.data[i].y,
      type: "snake",
    };

    // Move (the following nodes replace the preceding nodes)
    for (let j = i; j > 0; j--) {
      this.data[j].x = this.data[j - 1].x;
      this.data[j].y = this.data[j - 1].y;
    }
    // Move the snake head based on the direction
    switch (this.direction) {
      case "left":
        this.data[0].x--;
        break;
      case "right":
        this.data[0].x++;
        break;
      case "top":
        this.data[0].y--;
        break;
      case "bottom":
        this.data[0].y++;
        break;
    }
  }

  // Eat food
  eat() {
    this.data.push(this.lastNode);
  }
}