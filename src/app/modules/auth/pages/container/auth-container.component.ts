import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss'],
})

/**
 * Wrapper component for login and registration components
 */
export class AuthContainerComponent implements OnInit {
  public isLogin: boolean;
  public resetPwd: boolean;
  breakpoint: number;

  constructor(
    private route: ActivatedRoute,
  ) {
    if(this.route.snapshot.routeConfig.path === 'login') {
      this.resetPwd = false;
      this.isLogin = true;
    }
    else if(this.route.snapshot.routeConfig.path === 'reset-password') {
      this.resetPwd = true;
      this.isLogin = false;
    }
    else {
      this.resetPwd = false;
      this.isLogin = false;
    }
  }

  public ngOnInit(): any {
    this.breakpoint = (window.innerWidth <= 1200) ? 1 : 2;
    const options: object = {
      strings: ['Develop', 'Collaborate', 'Share', '> ASICDE'],
      typeSpeed: 50,
      backSpeed: 50,
      showCursor: false,
      loop: false
    };
    const typed: Typed = new Typed('.typed-element', options);
  }

  public onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1200) ? 1 : 2;
  }

}
