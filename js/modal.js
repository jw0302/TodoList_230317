// ModalEvent 싱클톤
class ModalEvent {
  static #instance = null;
  static getInstance() {
    if (this.#instance == null) {
      this.#instance = new ModalEvent();
    }
    return this.#instance;
  }

  addEventCancelClick() {
    const modalCancelButton = document.querySelector(".modal-cancel-button");
    modalCancelButton.onclick = () => {
      ModalService.getInstance().closeModel();
    };
  }

  addEventRemoveOkClick(removeIndex) {
    const modalOkButton = document.querySelector(".modal-ok-button");
    modalOkButton.onclick = () => {
      TodoService.getInstance().todoList.splice(removeIndex, 1);
      TodoService.getInstance().updateLocalStorage();
      ModalService.getInstance().closeModel();
    };
  }

  addEventModifyOkClick(modifyIndex) {
    const modifyOkButton = document.querySelector(".modal-ok-button");
    modifyOkButton.onclick = () => {
      const todoModifyInput = document.querySelector(".todo-modify-input"); // 내가 쓰지 못한 코드
      TodoService.getInstance().todoList[modifyIndex].todoContent =
        todoModifyInput.value; // 내가 쓰지 못한 코드
      TodoService.getInstance().updateLocalStorage();
      ModalService.getInstance().closeModel();
    };
  }
}

class ModalService {
  static #instance = null;
  static getInstance() {
    if (this.#instance == null) {
      this.#instance = new ModalService();
    }
    return this.#instance;
  }

  showModel() {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.remove("modal-hidden");
  }

  closeModel() {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.add("modal-hidden");
  }

  showRemoveModal(removeIndex) {
    const modalSection = document.querySelector(".modal-section");
    modalSection.innerHTML = `
      <div class="modal-header">
        <h1 class="modal-title">ToDo 삭제</h1>
      </div>
      <div class="modal-main">
        <p class="modal-message">ToDo를 삭제하시겠습니까?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="modal-ok-button">확인</button>
        <button type="button" class="modal-cancel-button">취소</button>
      </div>
    `;

    ModalEvent.getInstance().addEventRemoveOkClick(removeIndex);
    ModalEvent.getInstance().addEventCancelClick();
    this.showModel();
  }

  showModifyModal(modifyIndex) {
    const todoObj = TodoService.getInstance().todoList[modifyIndex]; // 내가 쓰지 못한 코드

    const modalSection = document.querySelector(".modal-section");
    modalSection.innerHTML = `
      <div class="modal-header">
        <h1 class="modal-title">ToDo 수정</h1>
      </div>
      <div class="modal-main">
        <p class="modal-message">${todoObj.todoDate} ${todoObj.todoDateTime}</p>  
        <input type="text" class="todo-modify-input" value="${todoObj.todoContent}">  
      </div>
      <div class="modal-footer">
        <button type="button" class="modal-ok-button">확인</button>
        <button type="button" class="modal-cancel-button">취소</button>
      </div>
    `;

    ModalEvent.getInstance().addEventModifyOkClick(modifyIndex);
    ModalEvent.getInstance().addEventCancelClick();
    this.showModel();
  }
}
