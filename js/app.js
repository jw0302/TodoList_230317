// *js에서 onload는 딱 하나만 존재해야 한다*
window.onload = () => {
  AsideEvent.getInstance().addEventShowMenuButton();
  AsideEvent.getInstance().addEventMainChange();
  InformationService.getInstance().loadInfo();
  InformationEvent.getInstance().addEventPhotoChangeClick();
  InformationEvent.getInstance().addEventPhotoChange();
  InformationEvent.getInstance().addEventAboutMeModifyClick();
  InformationEvent.getInstance().addEventAboutMeSaveClick();
  InformationEvent.getInstance().addEventIntroduceModifyClick();
  InformationEvent.getInstance().addEventIntroduceSaveClick();
  TodoEvent.getInstance().addEventAddTodoClick();
  TodoEvent.getInstance().addEventAddTodoKeyUp();
  TodoService.getInstance();
};
