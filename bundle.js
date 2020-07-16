"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TaskList = /*#__PURE__*/function () {
  function TaskList() {
    _classCallCheck(this, TaskList);

    this.titleInput = document.getElementById("messageTitle");
    this.editTitleInput = document.getElementById("editMessageTitle");
    this.messageInput = document.getElementById("messageBody");
    this.editMessageInput = document.getElementById("editMessageBody");
    this.addButton = document.getElementById("addButton");
    this.scrapsField = document.getElementById("scrapsField");
    this.btnSaveEdit = document.getElementById("saveEdit");
    this.scraps = [];
    this.setAddButtonEvent();
  }

  _createClass(TaskList, [{
    key: "generateScrapId",
    value: function generateScrapId() {
      return this.scraps.length + 1;
    }
  }, {
    key: "setAddButtonEvent",
    value: function setAddButtonEvent() {
      var _this = this;

      this.addButton.onclick = function () {
        return _this.addNewScrap();
      };
    }
  }, {
    key: "setButtonEvents",
    value: function setButtonEvents() {
      var _this2 = this;

      document.querySelectorAll(".delete-button").forEach(function (item) {
        item.onclick = function (event) {
          return _this2.deleteScraps(event);
        };
      });
      document.querySelectorAll(".edit-button").forEach(function (item) {
        item.onclick = function (event) {
          return _this2.openEditModal(event);
        };
      });
    }
  }, {
    key: "renderScraps",
    value: function renderScraps() {
      this.scrapsField.innerHTML = "";

      var _iterator = _createForOfIteratorHelper(this.scraps),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var scrap = _step.value;
          this.generateScrap(scrap.id, scrap.title, scrap.message);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.setButtonEvents();
    }
  }, {
    key: "generateScrap",
    value: function generateScrap(id, title, message) {
      var cardHtml = this.createScrapCard(id, title, message);
      this.insertHtml(cardHtml);
      this.setButtonEvents();
    }
  }, {
    key: "addNewScrap",
    value: function addNewScrap() {
      var title = this.titleInput.value;
      var message = this.messageInput.value;
      this.titleInput.value = "";
      this.messageInput.value = "";
      var id = this.generateScrapId();
      this.scraps.push({
        id: id,
        title: title,
        message: message
      });
      this.generateScrap(id, title, message);
    }
  }, {
    key: "insertHtml",
    value: function insertHtml(html) {
      this.scrapsField.innerHTML += html;
    }
  }, {
    key: "deleteScraps",
    value: function deleteScraps(event) {
      event.path[2].remove();
      var scrapId = event.path[2].getAttribute("id-scrap");
      var scrapIndex = this.scraps.findIndex(function (scrap) {
        return scrap.id == scrapId;
      });
      this.scraps.splice(scrapIndex, 1);
    }
  }, {
    key: "openEditModal",
    value: function openEditModal(event) {
      var _this3 = this;

      $("#editModal").modal("toggle");
      var scrapId = event.path[2].getAttribute("id-scrap");
      var scrapIndex = this.scraps.findIndex(function (scrap) {
        return scrap.id == scrapId;
      });
      this.editTitleInput.value = this.scraps[scrapIndex].title;
      this.editMessageInput.value = this.scraps[scrapIndex].message;

      this.btnSaveEdit.onclick = function () {
        return _this3.saveChanges(scrapIndex);
      };
    }
  }, {
    key: "saveChanges",
    value: function saveChanges(scrapIndex) {
      var title = this.editTitleInput.value;
      var message = this.editMessageInput.value;
      this.scraps[scrapIndex] = {
        title: title,
        message: message
      };
      this.renderScraps();
      $("#editModal").modal("hide");
    }
  }, {
    key: "createScrapCard",
    value: function createScrapCard(id, title, message) {
      return "\n      <div class=\"message-cards card text-white bg-dark m-2 col-3\" id-scrap=\"".concat(id, "\">\n        <div class=\"card-header font-weight-bold\">").concat(title, "</div>\n        <div class=\"card-body\">\n          <p class=\"card-text\">\n            ").concat(message, "\n          </p>\n        </div>\n        <div class=\"w-100 d-flex justify-content-end pr-2 pb-2\">\n          <button class=\"btn btn-danger mr-1 delete-button\">Deletar</button>\n          <button class=\"btn btn-info edit-button\">Editar</button>\n        </div>\n      </div>\n    ");
    }
  }]);

  return TaskList;
}();

new TaskList();
