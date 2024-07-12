import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/service';
import { CartService } from '../../../core/service/cart.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pricing-packages',
  templateUrl: './pricing-packages.component.html',
  styleUrls: ['./pricing-packages.component.scss']
})
export class PricingPackagesComponent implements OnInit {
  public selectedPackageType: string = '1';
  public currentPackages: Array<any> = [];
  public numbersOfMembersMatrix: object = {};
  public priceForPackages: object = {};

  public packagesFeatures: any = [
    ['Simulations'],
    ['Synthesis'],
    ['Block diagram', 'State machine diagram', 'Activity diagram', 'Design hierarchy'],
    ['Syntax check', 'Auto-completion']
  ];

  public selectedPackages: number[] = [];
  public allPackages: any = [];

  public packageTimeRange: number = 30;

  constructor(
    private router: Router,
    public cartService: CartService,
    public authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
  }

  public ngOnInit(): void {
    this.getPackages();
  }

  private getCurrentPricePackagesType(): void {
    const filteredPackages: any = this.allPackages.filter((pkg: any) => pkg.type === this.selectedPackageType);

    this.numbersOfMembersMatrix = {};
    this.priceForPackages = {};

    this.currentPackages = filteredPackages;
    this.currentPackages.forEach((pkg: any) => {
      this.numbersOfMembersMatrix[pkg.id] = pkg.default_members;
      this.priceForPackages[pkg.id] = pkg.price;
    });
  }

  public redirect(pageName: string): void {
    this.router.navigate(['/' + pageName]);
  }

  public currentDate(): number {
    return (new Date()).getFullYear();
  }

  public currentSelectedPackages(packageId: number): boolean {
    if (packageId === 1 || packageId === 6) {
      return false;
    }

    if (this.selectedPackages.find(num => num === packageId)) {
      this.selectedPackages = this.selectedPackages.filter(num => num !== packageId);
    } else {
      this.selectedPackages.push(packageId);
    }

    return true;
  }

  public changePackageType(typeId: string): boolean {
    this.selectedPackageType = typeId;
    this.getCurrentPricePackagesType();
    return true;
  }

  public changeNumberOfMembers(numberOfMembers: number, keyOfPackage: number): boolean {
    this.numbersOfMembersMatrix[keyOfPackage] = numberOfMembers;

    return true;
  }

  public changePackageTimeRange(timeRange: number): boolean {
    this.packageTimeRange = timeRange;
    return true;
  }

  public getPackages(): void {
    this.http.get(environment.baseUrl + '/packages/all').subscribe((response: any) => {
      this.allPackages = response.sort((a, b) => a.id - b.id);
      this.getCurrentPricePackagesType();
    }, (error) => {
      console.error('There is error of getting packages:', error);
    });
  }

  public buyPackages(): any {
    console.log(this.numbersOfMembersMatrix);
    this.cartService.addPackagesToCart(
      this.selectedPackageType,
      this.selectedPackages,
      this.numbersOfMembersMatrix,
      this.packageTimeRange
    );
  }
}
