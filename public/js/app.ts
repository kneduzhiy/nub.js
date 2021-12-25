import Nub from "../../src/nub.core";

var app = new Nub({
  root: "app",
  data: {
    welcome: "Welcome to nub.js!",
    name: "Bitte Namen angeben.",
  },
  functions: {
    multiply: function (one: number, two: number) {
      return one * two;
    },
    hasLength: function (test: string, length: number) {
      return test.length == length;
    },
  },
});
