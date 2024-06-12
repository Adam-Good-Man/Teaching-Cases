export default class Food {
  constructor(cols, rows) {
    this.cols = cols; // columns
    this.rows = rows; // rows
    this.data = null; // Food data is always a single item
    this.create();
  }

  // Create food at a random position
  create() {
    let [x, y] = [null, null];
    // Using our custom jQ framework
    if ($.randomInt) {
      y = $.randomInt(0, this.cols);
      x = $.randomInt(0, this.rows);
    } else {
      // Using the original jQuery framework
      y = Math.round(Math.random() * (this.cols - 0)) + 0;
      x = Math.round(Math.random() * (this.rows - 0)) + 0;
    }
    this.data = { x, y, type: "food" };
  }
}
