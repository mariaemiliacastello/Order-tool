import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { firstValueFrom } from 'rxjs';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit{
  constructor(private _uploadService: UploadService) {}
  public importedData:Array<any> = [];
  public importedOrder:Array<any> = [];
  public importedProduct:Array<any> = [];
  public importedOrderProduct:Array<any> = [];
  public async ngAfterViewInit(){
    await firstValueFrom(this._uploadService.getRequest("clients")).then(res => {
      this.importedData = res;
    });
    await firstValueFrom(this._uploadService.getRequest("products")).then(res => {
      this.importedProduct = res;
    });

  }
  
  public async getordersbycpf(cpforcnpj: number){
    await firstValueFrom(this._uploadService.getClientRequest("orders/cpforcnpj/", cpforcnpj)).then(res => {
      this.importedOrder = res;
    });
  }
  public async getordersbyproduct(product: string){
    await firstValueFrom(this._uploadService.getProductRequest("orders/products/", product)).then(res => {
      this.importedOrderProduct = res;
    });
  }
}
