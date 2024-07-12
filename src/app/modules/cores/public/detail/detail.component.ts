import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../../core/service';
import {UUID} from 'antlr4ts/misc/UUID';
import {CoreDetailPublic} from '../../../../core/model/core-detail-public';
import {CoreService} from '../../../../core/service/core.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CartService} from "../../../../core/service/cart.service";
import {StatusMessageService} from "../../../../core/service/status-message.service";

@Component({
  selector: 'app-core-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})

export class CoreDetailComponent implements OnInit {
  public loadingState: boolean = true;
  public uuid: UUID = null;
  public core: CoreDetailPublic;
  public params_before: string = '';
  public params_after: string = '';

  public addToCartForm: FormGroup = new FormGroup({
    variation: new FormControl(null),
  });

  constructor(
    public authenticationService: AuthenticationService,
    public coreService: CoreService,
    public cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private statusMessageService: StatusMessageService,
  ) {
    this.route.params.subscribe((params) => {
      if (this.uuid === null) {
        this.uuid = params.uuid;
      } else {
        if (params.uuid !== this.uuid) {
          this.uuid = params.uuid;
          this.getCoreDetail();
        }
      }
    });
  }

  public ngOnInit(): void {
    this.getCoreDetail();
  }

  public getCoreDetail(): void {
    this.loadingState = true;
    this.coreService.getCore(this.uuid).subscribe((core: CoreDetailPublic) => {
      this.core = core;
      if (this.core.top_module_parameters !== '') {
        if (this.core.top_module_parameters[0] === '#') {
          this.params_after = ' ' + this.core.top_module_parameters;
        } else {
          this.params_before = this.core.top_module_parameters + ' ';
        }
      }
      if (this.core.price_with_updates === 0 || this.core.price_without_updates === 0) {
        if (this.core.price_with_updates > this.core.price_without_updates) {
          this.addToCartForm.get('variation').setValue('WITH_UPDATES');
        } else {
          this.addToCartForm.get('variation').setValue('WITHOUT_UPDATES');
        }
      }
      this.loadingState = false;
    }, (error) => {
      this.statusMessageService.addError(error);
      this.loadingState = false;
      this.router.navigate(['/cores']).finally();
    });

  }

  public addToCart(): void {
    this.cartService.addToCart(this.uuid, this.addToCartForm.get('variation').value);
  }
}
