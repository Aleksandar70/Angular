export class ModalButton {

  text: string;
  class: string;
  closesModal: boolean;
  callback: Function;

  constructor(text: string, color: string, closesModal: boolean, callback?: Function) {
    this.text = text;
    this.class = 'btn btn-' + color;
    this.closesModal = closesModal;
    this.callback = callback;
  }

}
