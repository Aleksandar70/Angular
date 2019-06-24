import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  router: string;
  title = 'appraisal-sheet-gui';
  constructor(private _router: Router) {

    this._router.events.subscribe(() => this.router = this._router.url);
  }
}
