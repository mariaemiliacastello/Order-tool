import { Component } from '@angular/core';
import { UploadService } from '../upload.service';
import { firstValueFrom } from 'rxjs';
import { AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common'

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements AfterViewInit{
  constructor(private _uploadService: UploadService) {}
  public importedData:Array<any> = [];
  public async ngAfterViewInit(){
    await firstValueFrom(this._uploadService.getRequest("orders")).then(res => {
      this.importedData = res;
    });
  }
}
