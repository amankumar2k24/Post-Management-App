const { body } = require("express-validator");

const taskValidator = [
  body("title").notEmpty().withMessage("Please enter the title"),
  body("description").notEmpty().withMessage("Please enter the description"),
];

module.exports = { taskValidator };
