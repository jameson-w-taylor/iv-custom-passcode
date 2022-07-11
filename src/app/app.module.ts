import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { VaultService } from './vault.service';

const appInitFactory = (vaultService: VaultService): (() => Promise<void>) => {
  return async () => {
    vaultService.init();
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: appInitFactory, deps: [VaultService], multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
