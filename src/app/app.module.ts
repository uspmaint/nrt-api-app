import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MatIconModule ,
  MatListModule, 
  MatSidenavModule, 
  MatToolbarModule, 
  MatButtonModule ,
  MatCheckboxModule,
  MatCardModule
  
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketService } from './shared/services/socket.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatCardModule
    
    
  ],
  providers: [
    SocketService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
