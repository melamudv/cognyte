import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TableVirtualScrollModule} from 'ng-table-virtual-scroll';
import {FormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSortModule} from '@angular/material/sort';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {LeafletMarkerClusterModule} from '@asymmetrik/ngx-leaflet-markercluster';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    FormsModule,
    CdkTableModule,
    CommonModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    FlexLayoutModule,
    TableVirtualScrollModule,
    ScrollingModule,
    MatSortModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    CoreModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
