class TaskList {
  constructor() {
    this.titleInput = document.getElementById("messageTitle");
    this.messageInput = document.getElementById("messageBody");
    this.addBtn = document.getElementById("addButton");
    this.scrapsField = document.getElementById("scrapsField");

    this.scraps = [];

    this.registerAddScrapBtnEvent();
  }

  generateScrapId() {
    return this.scraps.length + 1;
  }

  registerAddScrapBtnEvent() {
    this.addBtn.onclick = () => this.addNewScrap();
  }

  setButtonEvents() {
    document.querySelectorAll(".delete-button").forEach((item) => {
      item.onclick = (event) => this.deleteScrap(event);
    });
  }

  renderScraps() {
    this.scrapsField.innerHTML = "";

    for (const scrap of this.scraps) {
      const cardHtml = this.createScrapCard(
        scrap.id,
        scrap.title,
        scrap.message
      );

      this.insertHtml(cardHtml);
    }

    this.setButtonEvents();
  }

  addNewScrap() {
    const id = this.generateScrapId();
    const title = this.titleInput.value;
    const message = this.messageInput.value;

    this.titleInput.value = "";
    this.messageInput.value = "";

    this.scraps.push({ id, title, message });

    this.renderScraps();
  }

  deleteScrap(event) {
    event.path[2].remove();

    const scrapId = event.path[2].getAttribute("id-scrap");

    const scrapIndex = this.scraps.findIndex((item) => {
      return item.id == scrapId;
    });

    this.scraps.splice(scrapIndex, 1);
  }

  insertHtml(html) {
    this.scrapsField.innerHTML += html;
  }

  createScrapCard(id, title, message) {
    return `
    <div class="message-cards card text-white bg-dark m-2 col-3" id-scrap="${id}">
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
