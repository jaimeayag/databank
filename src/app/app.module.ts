import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { MarkerService } from './services/marker.service';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { PopUpService  } from './services/pop-up.service';

// lta
import { LtaapiService  } from './services/ltaapi.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LtaapiInterceptorService } from './services/ltaapi-interceptor.service';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

// chatbot
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    FooterComponent,
    PagenotfoundComponent,
    ChatDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MarkerService,
    PopUpService,
    // { provide:HTTP_INTERCEPTORS, useClass:LtaapiInterceptorService, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
