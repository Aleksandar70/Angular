import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../service/login.service';
import {NgFlashMessageService} from 'ng-flash-messages';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {AuthService} from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  user: User;
  id: string;

  // public currentUser: Observable<User>;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private ngFlashMessageService: NgFlashMessageService,
              private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit() {
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
        this.loginService.setUserRole(result['user']['userGroup']['name']);
        this.userService.setLoggedInUser(result['user']['username']);
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
        this.router.navigate(['/appraisal-sheet']);
      });
  }

  logout(): void {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
