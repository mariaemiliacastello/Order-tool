import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";
import { Data } from "./import/import.model";
@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private API_URL = 'http://localhost:5249/';
    constructor(private http: HttpClient) { }

    public sendRequest(table: string, obj: any){
        const headers = { 'content-type': 'application/json'};
        return this.http.post(this.API_URL + table, JSON.stringify(obj), {'headers':headers}).subscribe();
    }
    public getRequest(table: string): Observable<Data[]>{
        return this.http.get<Data[]>(this.API_URL + table);
    }
    public getClientRequest(table: string, cpforcnpj: number): Observable<Data[]>{
      return this.http.get<Data[]>(this.API_URL + table + cpforcnpj);
    }
    public getProductRequest(table: string, product: string): Observable<Data[]>{
      return this.http.get<Data[]>(this.API_URL + table + product);
    }
    public importDataFromCSVByType(csvText: string, obj: any): Array<any> {
        const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
        const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');
    
        let dataArray: any[] = [];
        dataRows.forEach((row) => {
          let values = row.split(',');
    
          let dataObj: any = new Object();
          for (let index = 0; index < propertyNames.length; index++) {
            const propertyName: string = propertyNames[index];
            let value: any = values[index];
            if (value === '') {
              value = null;
            }
            if (typeof obj[propertyName] === 'number') {
              dataObj[propertyName] = Number(value);
            } 
            else if (typeof obj[propertyName] === 'string') {
              dataObj[propertyName] = value;
            }
            else {
              console.error("do no have algorithm to convert this type");
            }
          }
          dataArray.push(dataObj);
        });
    
        return dataArray;
      }
      public createProducts(obj: any): Array<any> {
        let dataArray: any[] = [];
        let data1: any = new Object();
        data1["name"]="Celular";
        data1["price"]=1000;
        data1["deliveryTime"]=1;
        dataArray.push(data1);
        let data2: any = new Object();
        data2["name"]="Notebook";
        data2["price"]=3000;
        data2["deliveryTime"]=2;
        dataArray.push(data2);
        let data3: any = new Object();
        data3["name"]="Televisao";
        data3["price"]=5000;
        data3["deliveryTime"]=3;
        dataArray.push(data3);
        return dataArray;
      }
      consultaCEP(cep: string): Observable<Data[]>{
        cep = cep.replace(/\D/g, '');
        return this.http.get<Data[]>(`//viacep.com.br/ws/${cep}/json`);
      }
}