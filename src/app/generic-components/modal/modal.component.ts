import {Component, Input} from '@angular/core';
import {ModalConfig} from './modal-config';
import {ModalButton} from './modal-button';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  @Input() modalConfig: ModalConfig;

  modalVisible = false;
  data: any;

  public showModal(data: any) {
    this.data = data;
    this.modalVisible = true;
  }

  public hideModal() {
    this.modalVisible = false;
  }

  private closeModal() {
    this.modalConfig.hideModalCallback && this.modalConfig.hideModalCallback(this.data);
    this.hideModal();
  }

  private modalButtonClicked(modalButton: ModalButton) {
    modalButton.callback && modalButton.callback(this.data);
    if (modalButton.closesModal) {
      this.hideModal();
    }
  }

}
