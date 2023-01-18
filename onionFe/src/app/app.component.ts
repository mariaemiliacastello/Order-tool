import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { Product } from './app.model';
import { AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  constructor(private _uploadService: UploadService) {}
  public importedData:Array<any> = [];
  ngAfterViewInit(){
    this.importedData = this._uploadService.createProducts(new Product());
    for(var i=0;i<this.importedData.length;i++)
      this._uploadService.sendRequest("products", this.importedData[i]);
  }
}