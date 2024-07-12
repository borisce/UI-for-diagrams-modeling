import {Component} from '@angular/core';
import {CartService} from "./core/service/cart.service";
import {AuthenticationService} from "./core/service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public authenticationService: AuthenticationService,
    public cartService: CartService
  ) {
  }

}
