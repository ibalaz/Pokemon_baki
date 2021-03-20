import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(public router: Router, public activeRoute: ActivatedRoute) {
  }

  onClickBtn1(): void {
    this.router.navigate(['/version1'], {relativeTo: this.activeRoute});
  }

  onClickBtn2(): void {
    this.router.navigate(['/version2'], {relativeTo: this.activeRoute});
  }

}
