class TaskList {
  constructor() {
    this.titleInput = document.getElementById("messageTitle");
    this.messageInput = document.getElementById("messageBody");
    this.addButton = document.getElementById("addButton");
    this.scrapsField = document.getElementById("scrapsField");

    this.scraps = [];

    this.setAddButtonEvent();
  }

  generateScrapId() {
    return this.scraps.length + 1;
  }

  setAddButtonEvent() {
    this.addButton.onclick = () => this.addNewScrap();
  }

  setButtonEvents() {
    document.querySelectorAll(".delete-button").forEach((item) => {
      item.onclick = (event) => this.deleteScraps(event);
    });
  }

  renderScraps() {
    this.scrapsField.innerHTML = "";

    for (const scrap of this.scraps) {
      const cardHtml = this.createScrapCard(scrap.title, scrap.message);

      this.insertHtml(cardHtml);
    }

    this.setButtonEvents();
  }

  addNewScrap() {
    let title = this.titleInput.value;
    let message = this.messageInput.value;

    this.titleInput.value = "";
    this.messageInput.value = "";

    const id = this.generateScrapId();

    this.scraps.push({ id, title, message });

    this.renderScraps();
  }

  deleteScraps(event) {
    event.path[2].remove();

    console.log(event);
  }

  insertHtml(html) {
    this.scrapsField += html;
  }

  createScrapCard(title, message) {
    return `
      <div class="message-cards card text-white bg-dark m-2 col-3">
        <div class="card-header font-weight-bold">${title}</div>
        <div class="card-body">
          <p class="card-text">
            ${message}
          </p>
        </div>
        <div class="w-100 d-flex justify-content-end pr-2 pb-2">
          <button class="btn btn-danger mr-1 delete-button">Deletar</button>
          <button class="btn btn-info">Editar</button>
        </div>
      </div>
    `;
  }
}

new TaskList();
