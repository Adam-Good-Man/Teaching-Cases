export default class Map {
  // el is the element where the map is mounted
  // rect is the size of each small square
  constructor(el, rect) {
    this.el = el;
    this.rect = rect;
    // This array stores the existing data nodes on the map
    this.data = [];
    // Number of rows on the map
    this.cols = parseInt(this.el.css("height")) / rect;
    // Number of columns on the map
    this.rows = parseInt(this.el.css("width")) / rect;

    this.render();
  }

  // Check if there is already a node at this position on the map (mainly snake body and food, position destructuring)
  hasNode({ x, y }) {
    return this.data.some((node) => {
      return node.x == x && node.y == y;
    });
  }

  // Render function
  render() {
    let res = this.data
      .map((item) => {
        return `<div class="rect" biao-type="${item.type}" style="left:${
          item.x * this.rect
        }px;top:${item.y * this.rect}px;width:${this.rect}px;height:${
          this.rect
        }px"></div>`;
      })
      .join("");

    this.el.html(res);
  }

  // Add nodes (there may be more than one node here, for example, when initializing, the snake body has more than just the head)
  addNode(nodes) {
    this.data = this.data.concat(nodes);
  }

  // Clear data
  clear() {
    this.data.length = 0;
  }
}