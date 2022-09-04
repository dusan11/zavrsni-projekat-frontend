import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  login(data: any){
    return this.http.post('http://127.0.0.1:8000/api/login', data)
  }

  userInfo(userId:any){
    return this.http.get('http://127.0.0.1:8000/api/korisnik/'+userId);
  }

  changeUserName(data: any, userId:any){
    return this.http.put('http://127.0.0.1:8000/api/korisnik/'+userId+'/promijeni-ime', data);
  }

  changeUserEmail(data: any, userId:any){
    return this.http.put('http://127.0.0.1:8000/api/korisnik/'+userId+'/promijeni-email', data);
  }

  getProducts(){
    return this.http.get('http://127.0.0.1:8000/api/proizvodi');
  }

  getProductsById(id:any){
    return this.http.get('http://127.0.0.1:8000/api/proizvodi/'+id);
  }

  newProduct(data:any){
    return this.http.post('http://127.0.0.1:8000/api/proizvodi', data);
  }

  deleteProduct(id:any){
    return this.http.delete('http://127.0.0.1:8000/api/proizvodi/'+id);
  }

  editProduct(data:any, id:any){
    return this.http.put('http://127.0.0.1:8000/api/proizvodi/'+id, data);
  }

  getCompanies(){
    return this.http.get('http://127.0.0.1:8000/api/kompanija');
  }

/*   
  } */

  getCompanyById(id:any){
    return this.http.get('http://127.0.0.1:8000/api/kompanija/'+id);
  }

  newCompany(data:any){
    return this.http.post('http://127.0.0.1:8000/api/kompanija', data);
  }

  deleteCompany(id:any){
    return this.http.delete('http://127.0.0.1:8000/api/kompanija/'+id);
  }

  editCompany(data:any, id:any){
    return this.http.put('http://127.0.0.1:8000/api/kompanija/'+id, data);
  }

  getOrderTypes(){
    return this.http.get('http://127.0.0.1:8000/api/vrsta-narudzbe');
  }

  getOrderTypeById(id:any){
    return this.http.get('http://127.0.0.1:8000/api/vrsta-narudzbe/'+id);
  }

  newOrderType(data:any){
    return this.http.post('http://127.0.0.1:8000/api/vrsta-narudzbe', data);
  }

  editOrderType(data:any, id:any){
    return this.http.put('http://127.0.0.1:8000/api/vrsta-narudzbe/'+id, data);
  }

  getOrderStatuses(){
    return this.http.get('http://127.0.0.1:8000/api/status-narudzbe');
  }

  getOrderStatusById(id:any){
    return this.http.get('http://127.0.0.1:8000/api/status-narudzbe/'+id);
  }

  newOrderStatus(data:any){
    return this.http.post('http://127.0.0.1:8000/api/status-narudzbe', data);
  }

  editOrderStatus(data:any, id:any){
    return this.http.put('http://127.0.0.1:8000/api/status-narudzbe/'+id, data);
  }

  getOrder(){
    return this.http.get('http://127.0.0.1:8000/api/narudzbe');
  }

  getOrderById(id:any){
    return this.http.get('http://127.0.0.1:8000/api/narudzbe/'+id);
  }

  newOrder(data:any){
    return this.http.post('http://127.0.0.1:8000/api/narudzbe', data);
  }

  editOrderPrice(data:any, id:any){
    return this.http.put('http://127.0.0.1:8000/api/narudzbe/'+id+'/cijena', data);
  }

  editOrder(data:any, id:any){
    return this.http.put('http://127.0.0.1:8000/api/narudzbe/'+id, data);
  }

  addProductToOrder(data:any, orderId:any, productId:any){
    return this.http.post('http://127.0.0.1:8000/api/narudzbe/'+orderId+'/proizvodi/'+productId, data);
  }

  removeProductFromOrder(orderId:any, productId:any){
    return this.http.delete('http://127.0.0.1:8000/api/narudzbe/'+orderId+'/proizvodi/'+productId);

  }

}
