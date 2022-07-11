import { Component } from '@angular/core';
import { VaultService, VaultServiceState } from '../vault.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public state: VaultServiceState;

  constructor(private vaultService: VaultService) {
    this.state = vaultService.state;
  }

  // setSession(data: string) {
  //   return this.vaultService.setSession(data);
  // }

  setVaultToCustomPasscode() {
    return this.vaultService.setVaultToCustomPasscode();
  }

  // async toggleLock() {
  //   if (this.state.isLocked) {
  //     await this.vaultService.vault.unlock();
  //     return this.restoreSession();
  //   }
  //   return this.vaultService.vault.lock();
  // }

  // restoreSession() {
  //   return this.vaultService.restoreSession();
  // }
}
