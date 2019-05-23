import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../service/login.service';
import {NgFlashMessageService} from 'ng-flash-messages';
import {User} from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  user: User;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private ngFlashMessageService: NgFlashMessageService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
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
}
