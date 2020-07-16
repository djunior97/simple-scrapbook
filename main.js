class TaskList {
  constructor() {
    this.titleInput = document.getElementById("messageTitle");
    this.messageInput = document.getElementById("messageBody");
    this.addBtn = document.getElementById("addButton");
    this.scrapsField = document.getElementById("scrapsField");

    this.scraps = [];
  }
}

new TaskList();
