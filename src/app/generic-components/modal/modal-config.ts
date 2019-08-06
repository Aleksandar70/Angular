import {ModalButton} from './modal-button';

export class ModalConfig {

  modalButtons: ModalButton[];
  hideModalCallback: (data: any) => void;
  
  constructor(modalButtons: ModalButton[], hideModalCallback?: (data: any) => void) {
    this.modalButtons = modalButtons;
    this.hideModalCallback = hideModalCallback;
  }

}
