import { Component } from '@angular/core';
import { UploadService } from '../upload.service';
import { Data, Client } from './import.model'
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {
  constructor(private _uploadService: UploadService) {}
  public importedData:Array<any> = [];
  public importedClient: Array<any>  = [];
  public importedProduct: Array<any>  = [];
  public importedProductDays: Array<any>  = [];
  public importedCEP: Array<any>  = [];
  public centroSul: Array<any> = ['GO','MT','MS','DF','PR','SC','RS'];
  public sudeste: Array<any> = ['ES','MG','RJ','SP'];
  public norteNordeste: Array<any> = ['AL','BA','CE','MA','PI','PE','PB', 'RN', 'SE', 'AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'];
  
  public async importDataFromCSVByType(event: any) {
    let fileContent = await this.getTextFromFile(event);
    this.importedData = this._uploadService.importDataFromCSVByType(
      fileContent,
      new Data()
    );
    for(var i=0;i<this.importedData.length-1;i++){
      this.importedData[i].price = await this.calculatePrice(this.importedData[i].product, this.importedData[i].orderDate);
      this.importedData[i].deliveryDate = await this.calculateDeliveryDate(this.importedData[i].product, this.importedData[i].orderDate, this.importedData[i].CEP);
      this.importedData[i].deliveryFee = await this.calculateDeliveryfee(this.importedData[i].price, this.importedData[i].CEP, this.importedData[i].orderDate);
      this.importedData[i].pricewithoutdiscount = await this.calculatePricewithoutdiscount(this.importedData[i].product);
      this.importedData[i].finalPrice = await this.importedData[i].price + await this.importedData[i].deliveryFee;
    }
    for(var i=0;i<this.importedData.length-1;i++){
      this._uploadService.sendRequest("orders", this.importedData[i]);
    }
    for(var i=0;i<this.importedData.length-1;i++){
      this.importedClient[i] = JSON.parse(JSON.stringify(this.importedData[i]));
    }
    for(var i=0;i<this.importedClient.length;i++){
      this._uploadService.sendRequest("clients", this.importedClient[i]);
    }
  }

  private async getTextFromFile(event:any){
    const file: File = event.target.files[0];
    let fileContent = await file.text();

    return fileContent;
  }
  public async calculateDeliveryfee(price: number, cep: string, date: string): Promise<number>{
    cep = cep.replace(/\D/g, '');
    let UF: string;
    let fee: number = 0;
    await firstValueFrom(this._uploadService.consultaCEP(cep)).then(res => {
      this.importedCEP = res;
    });
    UF = Object(this.importedCEP)["uf"]
    if(this.sudeste.includes(UF)){
      fee = price * 0.1;
    }
    else if(this.centroSul.includes(UF)){
      fee = price * 0.2;
    }
    else if(this.norteNordeste.includes(UF)){
      fee = price * 0.3;
    }
    return fee;
  }
  public async calculatePricewithoutdiscount(product: string): Promise<number>{
    await firstValueFrom(this._uploadService.getProductRequest("products/name/", product)).then(res => {
      this.importedProduct = res;
    });
    let price: number;
    price = Object(this.importedProduct[0])["price"]
    return price
  }
  public async calculatePrice(product: string, date: string): Promise<number>{
    await firstValueFrom(this._uploadService.getProductRequest("products/name/", product)).then(res => {
      this.importedProduct = res;
    });
    let price: number;
    price = Object(this.importedProduct[0])["price"]
    var orderdate = new Date(date)
    let day: number = orderdate.getUTCDate();
    let month: number = orderdate.getMonth()+1;
    if(month == 5 || month == 8){
      if(day >= 1 && day <= 15){
        price = price * 0.95;
      }
    }
    else if(month == 11){
      if(day >= 25 && day <= 30){
        price = price * 0.70;
      }
    }
    else if(month == 12){
      if(day >= 1 && day <= 31){
        price = price * 0.90;
      }
    }
    return price
  }
  public async calculateDeliveryDate(product: string, date: string, cep: string): Promise<string>{
    await firstValueFrom(this._uploadService.getProductRequest("products/name/", product)).then(res => {
      this.importedProductDays = res;
    });
    let days: number;
    days = Object(this.importedProductDays[0])["deliveryTime"]
    var orderdate = new Date(date)
    let day: number = orderdate.getUTCDate();
    let month: number = orderdate.getMonth()+1;
    if(month == 5 || month == 8){
      if(day >= 1 && day <= 15){
        days = days + 3;
      }
    }
    else if(month == 11){
      if(day >= 25 && day <= 30){
        days = days + 15;
      }
    }
    else if(month == 12){
      if(day >= 1 && day <= 31){
        days = days + 10;
      }
    }
    cep = cep.replace(/\D/g, '');
    let UF: string;
    let fee: number = 0;
    await firstValueFrom(this._uploadService.consultaCEP(cep)).then(res => {
      this.importedCEP = res;
    });
    UF = Object(this.importedCEP)["uf"]
    if(this.sudeste.includes(UF)){
      days = days + 2;
    }
    else if(this.centroSul.includes(UF)){
      days = days + 3;
    }
    else if(this.norteNordeste.includes(UF)){
      days = days + 4;
    }
    orderdate.setDate(day + days)
    return orderdate.toLocaleDateString();
  }
}