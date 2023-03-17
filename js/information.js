// InformationEvent 싱글톤
class InformationEvent {
  static #instance = null;
  static getInstance() {
    if (this.#instance == null) {
      this.#instance = new InformationEvent();
    }
    return this.#instance;
  }

  // 사진 바꾸는 클릭 이벤트 메소드
  addEventPhotoChangeClick() {
    const infoPhoto = document.querySelector(".info-photo");
    infoPhoto.onclick = () => {
      const photoFile = document.querySelector(".photo-file");
      photoFile.click();
    };
  }

  addEventPhotoChange() {
    const photoFile = document.querySelector(".photo-file");
    photoFile.onchange = () => {
      FileService.getInstance().changePhoto();
    };
  }

  addEventAboutMeModifyClick() {
    const aboutMeModifyButton = document.querySelector(".m-aboutme");
    aboutMeModifyButton.onclick = () => {
      const aboutMeSaveButton = document.querySelector(".s-aboutme");
      aboutMeSaveButton.classList.remove("button-hidden");
      aboutMeModifyButton.classList.add("button-hidden");

      const infoInputContainers = document.querySelectorAll(
        ".info-input-container"
      );
      infoInputContainers.forEach((infoInputContainer) => {
        infoInputContainer.querySelector(".info-input").disabled = false;
      });
    };
  }

  addEventAboutMeSaveClick() {
    const aboutMeSaveButton = document.querySelector(".s-aboutme");
    aboutMeSaveButton.onclick = () => {
      const aboutMeModifyButton = document.querySelector(".m-aboutme");
      aboutMeModifyButton.classList.remove("button-hidden");
      aboutMeSaveButton.classList.add("button-hidden");

      const infoInputContainers = document.querySelectorAll(".info-input-container");
      const userInfo = InformationService.getInstance().userInfo;

      infoInputContainers.forEach((infoInputContainer) => {
        const infoInput = infoInputContainer.querySelector(".info-input");
        userInfo[infoInput.id] = infoInput.value;
        infoInput.disabled = true;
      });

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    };
  }

  addEventIntroduceModifyClick() {
    const introduceModifyButton = document.querySelector(".m-introduce");
    introduceModifyButton.onclick = () => {
      const introduceSaveButton = document.querySelector(".s-introduce");
      introduceSaveButton.classList.remove("button-hidden");
      introduceModifyButton.classList.add("button-hidden");
      const introduceInput = document.querySelector(".introduce-input");
      introduceInput.disabled = false;
    };
  }

  addEventIntroduceSaveClick() {
    const introduceSaveButton = document.querySelector(".s-introduce");
    introduceSaveButton.onclick = () => {
      const introduceModifyButton = document.querySelector(".m-introduce");
      introduceModifyButton.classList.remove("button-hidden");
      introduceSaveButton.classList.add("button-hidden");
      const introduceInput = document.querySelector(".introduce-input");
      introduceInput.disabled = true;

      const userInfo = InformationService.getInstance().userInfo;
      userInfo["introduce"] = introduceInput.value;

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    };
  }
}

class InformationService {
  static #instance = null;
  static getInstance() {
    if (this.#instance == null) {
      this.#instance = new InformationService();
    }
    return this.#instance;
  }

  userInfo = {};

  loadInfo() {
    this.loadInfoPhoto();
    this.loadInfoUser();
  }

  loadInfoPhoto() {
    const infoPhotoImg = document.querySelector(".info-photo img");
    const infoPhoto = localStorage.getItem("infoPhoto");
    if (infoPhoto == null) {
      infoPhotoImg.src = "./images/noimage.jpg";
    } else {
      infoPhotoImg.src = infoPhoto;
    }
  }

  loadInfoUser() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(this.userInfo == null) {
      this.userInfo = {};
      return;
    }
    Object.keys(this.userInfo).forEach(key => {
      const infoInput = document.querySelectorAll(".info-input");
      infoInput.forEach(input => {
        if(input.id == key) {
          input.value = this.userInfo[key];
        }
      })
    });

    if(typeof this.userInfo.introduce == "undefined") {
      return;
    }
    const introduceInput = document.querySelector(".introduce-input");
    introduceInput.value = this.userInfo.introduce;
  }
}

class FileService {
  static #instance = null;
  static getInstance() {
    if (this.#instance == null) {
      this.#instance = new FileService();
    }
    return this.#instance;
  }

  // 새로운 photo-file을 가져온다
  changePhoto() {
    const photoForm = document.querySelector(".photo-form");
    const formData = new FormData(photoForm);
    // file이라는 name의 키값을 가져온다
    const fileValue = formData.get("file");

    // 이미지를 바꾸려고 파일을 열었다가 아무것도 선택하지 않고 취소를 하면 기존이미지가 사라진다. 이를 해결 하기 위한 코드
    if (fileValue.size == 0) {
      // changeFlag = false;
      return;
    }

    this.showPreview(fileValue);
  }

  // 불러온 파일 URL형식으로 바꾸어 info-photo의 img로 넣어주기 (화면에 보여줌)
  showPreview(fileValue) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(fileValue);

    fileReader.onload = (e) => {
      const photoImg = document.querySelector(".info-photo img");
      photoImg.src = e.target.result;
      localStorage.setItem("infoPhoto", photoImg.src);
    };
  }
}