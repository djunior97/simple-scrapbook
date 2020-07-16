"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskList = function TaskList() {
  _classCallCheck(this, TaskList);

  this.titleInput = document.getElementById("messageTitle");
  this.messageInput = document.getElementById("messageBody");
  this.addBtn = document.getElementById("addButton");
  this.scrapsField = document.getElementById("scrapsField");
  this.scraps = [];
};

new TaskList();
