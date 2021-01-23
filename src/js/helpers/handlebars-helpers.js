// import handlebars/runtime
const Handlebars1 = require('../../../node_modules/handlebars/runtime');

// import handlebars-helpers
const handlebarsHelpers = require('handlebars-helpers');

// console.log(handlebarsHelpers()); // check how many helpers we have

// register handlebars-helpers
Handlebars1.registerHelper(handlebarsHelpers());

// handlebars/runtime with custom helpers.
// used by handlebars-loader.
module.exports = Handlebars1;