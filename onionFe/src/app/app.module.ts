import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportComponent } from './import/import.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { UploadService } from './upload.service';

const appRoutes: Routes = [
  { path: 'import', component: ImportComponent },
  { path: 'visualization',      component: VisualizationComponent },
  { path: 'dashboard',      component: DashboardComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    ImportComponent,
    DashboardComponent,
    VisualizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
