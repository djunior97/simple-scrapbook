let titleInput = document.getElementById("messageTitle");
let editTitleInput = document.getElementById("editMessageTitle");
let messageInput = document.getElementById("messageBody");
let editMessageInput = document.getElementById("editMessageBody");
let addScrapBtn = document.getElementById("addButton");
let scrapsField = document.getElementById("scrapsField");
let btnSaveEdit = document.getElementById("saveEdit");

let scraps = JSON.parse(localStorage.getItem("scraps")) || [];

function renderScraps() {
  scrapsField.innerHTML = "";

  for (const scrap of scraps) {
    let position = scraps.indexOf(scrap);
    scrapsField.innerHTML += createScrapCard(
      scrap.title,
      scrap.message,
      position
    );
  }
}

function addNewScrap() {
  let title = titleInput.value;
  let message = messageInput.value;

  titleInput.value = "";
  messageInput.value = "";

  scraps.push({ title, message });

  renderScraps();
  saveToLocalStorage();
}

function deleteScrap(position) {
  scraps.splice(position, 1);

  renderScraps();
  saveToLocalStorage();
}

function createScrapCard(title, message, position) {
  return `
  <div class="message-cards card text-white bg-dark m-2 col-3">
    <div class="card-header font-weight-bold">${title}</div>
    <div class="card-body">
      <p class="card-text">
        ${message}
      </p>
    </div>
    <div class="w-100 d-flex justify-content-end pr-2 pb-2">
      <button class="btn btn-danger mr-1" onclick="deleteScrap(${position})">Deletar</button>
      <button class="btn btn-info" onclick="openEditModal(${position})">Editar</button>
    </div>
  </div>
  `;
}

function openEditModal(position) {
  $("#editModal").modal("toggle");

  editTitleInput.value = scraps[position].title;
  editMessageInput.value = scraps[position].message;

  btnSaveEdit.setAttribute("onclick", `saveChanges(${position})`);
}

function saveChanges(position) {
  let title = editTitleInput.value;
  let message = editMessageInput.value;

  scraps[position] = { title, message };
  renderScraps();
  $("#editModal").modal("hide");
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("scraps", JSON.stringify(scraps));
}

renderScraps();
addScrapBtn.onclick = addNewScrap;
