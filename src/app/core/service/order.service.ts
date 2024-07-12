import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PaymentMethod} from "../model/payment-method";
import {OrderWithRedirect} from "../model/order-with-redirect";
import {UUID} from "antlr4ts/misc/UUID";
import {Order} from "../model/order";
import {Page} from "../model/page";

/**
 * Service for working with cores.
 */
@Injectable({providedIn: 'root'})
export class OrderService {

  constructor(private http: HttpClient) {

  }

  public createOrder(params: {
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    address: string,
    city: string,
    zip_code: number,
    country: string,
    payment_method: string,
    order_as_organization: boolean
  }): Observable<OrderWithRedirect> {
    params.phone_number = params.phone_number.toString();
    params.phone_number = params.phone_number.replace(/\s+/g, '');
    if (params.phone_number[0] === '0') {
      params.phone_number = params.phone_number.replace(/^0/, '');
      params.phone_number = '421' + params.phone_number;
    }
    return this.http.post<OrderWithRedirect>(environment.baseUrl + '/orders', params, {
      headers:
        {
          // 'Content-Type': 'multipart/form-data',
          Accept: 'application/json'
        }
    });
  }

  public getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(environment.baseUrl + '/orders/payment-methods');
  }

  public getOrders(page?: number, size?: number): Observable<Page<Order>> {
    const url_params: string = `?page=${page || 0}&size=${size || 10}`;
    return this.http.get<Page<Order>>(environment.baseUrl + '/orders' + url_params);
  }

  public getOrder(uuid: UUID): Observable<Order> {
    return this.http.get<Order>(environment.baseUrl + '/orders/' + uuid);
  }

  public getPaymentOrderPayment(uuid: UUID): Observable<Order> {
    return this.http.get<Order>(environment.baseUrl + '/orders/payment/' + uuid);
  }

  public createPayment(uuid: UUID, paymentMethod: string): Observable<OrderWithRedirect> {
    return this.http.post<OrderWithRedirect>(
      environment.baseUrl + '/orders/' + uuid + '/payments', {
        payment_method: paymentMethod
      }, {
        headers:
          {
            // 'Content-Type': 'multipart/form-data',
            Accept: 'application/json'
          }
      });
  }

}
