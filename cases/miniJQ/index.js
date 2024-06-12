// jQ Usage Method One (Passing in Node Selector)
/* $(".box") */

// jQ Usage Method Two (Waiting for DOM to Load)
/* $(function(){}) */

// jQ Usage Method Three (Converting DOM Node to jQ Object)
/* $(document.querySelector(".box")) */

class JQ {
    constructor(arg, root) {
        if (typeof root === "undefined") {
            // When jQ is first obtained, it has no previous operation nodes,
            // so we assume that its previous operation node is defined as document
            this["prevObject"] = [document];
        } else {
            this["prevObject"] = root;
        }
        if (typeof arg === "string") {
            // Corresponds to jQ Usage Method One
            // If compatibility is not considered, you can use it directly, otherwise, distinguish between class, id, and dom
            let elem = document.querySelectorAll(arg);
            this.addElem(elem);
        }

        // Corresponds to jQ Usage Method Two
        if (typeof arg === "function") {
            // Execute after the DOM node is loaded
            this.ready(arg);
        }

        // Corresponds to jQ Usage Method Three
        if (typeof arg === "object") {
            // Case of selecting only one node

            if (!arg.length) {
                this[0] = arg;
                this.length = 1;
            } else if (arg.length === 1) {
            } else {
                // Multiple nodes selected
                this.addElem(arg);
            }
        }
    }

    // html
    html(shtml) {
        // If there is a value, set it
        if (shtml) {
            this[0].innerHTML = shtml;
        } else {
            return this[0].innerHTML;
        }
    }

    // Get the node object from the last operation
    end() {
        return this.prevObject;
    }

    // Imitate eq function
    eq(idx) {
        // If passed through eq operation, then pass in the last operation node
        return new JQ(this[idx], this);
    }

    // Return the native node, no need for chain operation
    get(idx) {
        return this[idx];
    }

    // Add node to the current instance
    addElem(elem) {
        // According to jQ's idea, all nodes are actually attached to the current selected instance.
        // Here, you still need to pay attention to the this of arrow function
        elem.forEach((el, idx) => {
            // Attach to the current instance
            this[idx] = el;
        });
        this.length = elem.length;
    }

    // $(...).ready function
    ready(arg) {
        // Directly listen for DOM to be loaded
        window.addEventListener("DOMContentLoaded", arg, false);
    }

    // Of course, not just click events
    click(fn) {
        for (let i = 0; i < this.length; i++) {
            // false prevents bubbling
            this[i].addEventListener("click", fn, false);
        }
        // fn();
    }

    /** Extend attributes */
    cssHooks(attr) {
        $.cssHooks[attr] = {
            get() {
                return;
            },
            set(value) { },
        };
    }

    // Imitate $(...).on("click dbclick")....
    on(eve, fn) {
        let reg = /\s+/g;
        // Match multiple spaces into one space
        eve = eve.replace(reg, " ");
        let arr = eve.split(" ");

        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                this[i].addEventListener(arr[j], fn, false);
                console.log("..", this[i]);
            }
        }
    }

    // Imitate css
    css(...args) {
        if (args.length === 1) {
            if (typeof args[0] === "string") {
                // Similar to $(...).("width")
                if (args[0] in $.cssHooks) {
                    return $.cssHooks[args[0]].get(this[0]);
                }

                let res = this.getStyle(this[0], args[0]);

                return res;
            } else {
                // Similar to $(...).({"width":"200px"})
                for (let i = 0; i < this.length; i++) {
                    // Because only one object is passed in, and it is in array form (...args)
                    // Next, traverse the attributes of this object
                    for (let key in args[0]) {
                        this.setStyle(this[i], key, args[0][key]);
                    }
                }
            }
        } else {
            // Similar to $(...).("width","100px")
            for (let i = 0; i < this.length; i++) {
                this.setStyle(this[i], args[0], args[1]);
            }
        }
        return this;
    }

    setStyle(elem, style, value) {
        // Error handling You can check $.cssNumer to see which attributes jquery needs to add units to

        if (typeof value === "number" && !(style in $.cssNumer)) {
            value += "px";
        }

        if (style in $.cssHooks) {
            /**If extended here, then call the method in style extension */
            $.cssHooks[style].set(elem, value);
        } else {
            /** If the style extension does not define this attribute, handle it generally */
            elem.style[style] = value;
        }
    }
    extend(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }
    // Set styles
    getStyle(elem, style) {
        // No pseudo-class, so it is null
        // Still did not consider compatibility
        let res = window.getComputedStyle(elem, null)[style]; // This is the style set in the style
        return res;
    }
}

function $(arg) {
    return arg instanceof JQ ? arg : new JQ(arg);
}

$.extend = {
    /* Extend attributes, you can rewrite styles, or define new styles */
    cssHooks: {
        /**For example, rewrite the opacity style here */
        opacity: {
            get: function (elem) {
                console.log("Extract opacity in extended attributes");
                $.getStyle(elem, "opacity");
            },
            set: function (elem, value) {
                console.log("Set opacity in extended attributes");
                $.setStyle(elem, "opacity", value);
            },
        },
    },

    /** jquery has already defined which attributes do not need px */
    cssNumer: {
        columnCount: true,
        fillOpacity: true,
        flexGrow: true,
        flexShrink: true,
        fontWeight: true,
        gridArea: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnStart: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowStart: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        widows: true,
        zIndex: true,
        zoom: true,
    },

    // Create a random integer value in a range
    randomInt: (min = 0, max = 1) => {
        // Take the principle of rounding
        return Math.round(Math.random() * (max - min)) + min;
    },
};

function initJQ() {
    for (let key in $.extend) {
        $[key] = $.extend[key];
    }
}

initJQ();
