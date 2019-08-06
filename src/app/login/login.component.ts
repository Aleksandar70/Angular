import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../service/login.service';
import {NgFlashMessageService} from 'ng-flash-messages';
import {UserDto} from '../model/userDto';
import {UserService} from '../service/user.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {ModalConfig} from '../generic-components/modal/modal-config';
import {ModalComponent} from '../generic-components/modal/modal.component';
import {ModalButton} from '../generic-components/modal/modal-button';
import {ResponseMessage} from '../generic-components/modal/response-message';
import {FlashMessageService} from '../generic-components/modal/flash-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitted = false;
  user: UserDto;
  id: string;
  @ViewChild(ModalComponent) modal;
  @ViewChild('forgotPasswordUsername') forgotPasswordUsername: ElementRef;
  forgotPasswordSubscription: Subscription;
  forgotPasswordSubmitted = false;
  modalConfig: ModalConfig;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private ngFlashMessageService: NgFlashMessageService,
              private userService: UserService,
              private authService: AuthService,
              private flashMessageService: FlashMessageService) {
  }

  ngOnInit() {
    this.initModalConfig();
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.id = localStorage.getItem('token');
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.loginUser(this.formControls.username.value, this.formControls.password.value).subscribe(result => {
        this.userService.setLoggedInUser(result['user']['username']);
        this.userService.setNameOfUser(result['user']['firstName'] + ' ' + result['user']['lastName']);
        this.userService.setUserManager(result['user']['userManagerDto']['name']);
        this.userService.setUserRole(result['user']['userGroupDto']['name']);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', result['token']);
      }, error => {
        this.ngFlashMessageService.showFlashMessage({
          messages: ['Wrong username or password!'],
          dismissible: true,
          timeout: false,
          type: 'danger'
        });
      },
      () => {
        this.userService.setIsLoggedIn('true');
        this.authService.setLoggedIn(true);
        this.router.navigate(['/home']);
      });
  }

  logout(): void {
    this.userService.setIsLoggedIn('false');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private initModalConfig() {
    const modalButtons = [
      new ModalButton('Ok', 'primary', false, this.sendResetPasswordEmail.bind(this)),
      new ModalButton('Cancel', 'secondary', true)
    ];
    this.modalConfig = new ModalConfig(modalButtons);
  }

  private sendResetPasswordEmail() {
    this.forgotPasswordSubmitted = true;
    if (this.forgotPasswordUsernameValid()) {
      const username = this.forgotPasswordUsername.nativeElement.value;
      this.forgotPasswordSubscription = this.userService.sendResetPasswordEmail(username).subscribe(
        (message: ResponseMessage) => {
          this.forgotPasswordSubmitted = false;
          this.formControls.username.setValue(this.forgotPasswordUsername.nativeElement.value);
          this.modal.hideModal();
          this.flashMessageService.showFlashMessage(message.message, 'success');
        },
        (error) => this.flashMessageService.showFlashMessage(error.error.message, 'danger')
      );
    }
  }

  private onForgotPassword() {
    this.forgotPasswordUsername.nativeElement.value = this.formControls.username.value;
    this.modal.showModal();
  }

  ngOnDestroy(): void {
    if (this.forgotPasswordSubscription) {
      this.forgotPasswordSubscription.unsubscribe();
    }
  }

  private forgotPasswordUsernameValid() {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const username = this.forgotPasswordUsername.nativeElement.value;
    return username && emailRegex.test(username);
  }
}
