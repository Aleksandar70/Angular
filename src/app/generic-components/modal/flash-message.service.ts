import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class FlashMessageService {

  public static COLOR_SUCCESS = 'success';
  public static COLOR_ERROR = 'danger';
  public static COLOR_INFO = 'primary';
  public setFlashMessage = new Subject<{flashMessage: string, color: string}>();
  public resetFlashMessage = new Subject<boolean>();

  public showFlashMessage(flashMessage: string, color: string): void {
    this.setFlashMessage.next({flashMessage, color: color ? color : FlashMessageService.COLOR_INFO});
  }

  public reset(showFlashMessage: boolean) {
    this.resetFlashMessage.next(showFlashMessage);
  }

}
