// 싱글톤
class AsideEvent {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new AsideEvent();
    }
    return this.#instance;
  }

  // menuaside를 숨겨놓은 hidden-menu를 꺼내고 다시 숨길수 있도록 하는 메소드
  addEventShowMenuButton() {
    const menuButton = document.querySelector(".menu-button");
    menuButton.onclick = () => {
      const menuAside = document.querySelector(".menu-aside");
      if(menuAside.classList.contains("hidden-menu")) {
        menuAside.classList.remove("hidden-menu");
        menuButton.textContent = "◀";
      }else {
        menuAside.classList.add("hidden-menu");
        menuButton.textContent = "▶"; 
      }
    }
  }

  // menu-nav안의 menu-items 클릭하여 main화면 바꾸는 메소드
  addEventMainChange() {
    const menuItems = document.querySelectorAll(".menu-items");
    menuItems.forEach((menuItem, index) => {
      menuItem.onclick = () => {
        const mainContainers = document.querySelectorAll(".main-container");
        const menuAside = document.querySelector(".menu-aside");
        mainContainers.forEach(mainContainer => {
          mainContainer.classList.add("main-hidden");
        });
        mainContainers[index].classList.remove("main-hidden");
        menuAside.classList.add("hidden-menu");
      }
    });
  }
}