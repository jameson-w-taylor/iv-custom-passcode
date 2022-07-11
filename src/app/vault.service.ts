import { Injectable, NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  Vault,
  DeviceSecurityType,
  VaultType,
  BrowserVault,
  IdentityVaultConfig,
} from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';

const config: IdentityVaultConfig = {
  key: 'io.ionic.custompasscode',
  type: VaultType.SecureStorage,
  deviceSecurityType: DeviceSecurityType.None,
  lockAfterBackgrounded: 2000,
  shouldClearVaultAfterTooManyFailedAttempts: true,
  customPasscodeInvalidUnlockAttempts: 2,
  unlockVaultOnLoad: false,
};
const key = 'testData';

export interface VaultServiceState {
  data: string;
  isLocked: boolean;
  isEmpty: boolean;
}

@Injectable({ providedIn: 'root' })
export class VaultService {
  public state: VaultServiceState = {
    data: '',
    isLocked: false,
    isEmpty: true
  };

  vault: Vault | BrowserVault;

  constructor(private ngZone: NgZone, private platform: Platform) {
    this.vault = Capacitor.getPlatform() === 'web' ? new BrowserVault(config) : new Vault(config);
  }

  async init() {
    await this.platform.ready(); // This is required only for Cordova
    console.log('INIT');
    console.log(`TYPE: ${this.vault.config.type}`);
    // this.state.isLocked = await this.vault.isLocked();
    // this.state.isEmpty = await this.vault.isEmpty();
    
    // this.vault.onLock(() => {
    //   console.log('ON_LOCK');
    //   this.ngZone.run(() => {
    //     this.state.isLocked = true;
    //     this.state.data = undefined;
    //   });
    // });
    // this.vault.onUnlock(() => {
    //   console.log('ON_UNLOCK');
    //   this.ngZone.run(() => {
    //     this.state.isLocked = false;
    //   });
    // });
    this.vault.onPasscodeRequested((createPasscode, onComplete) => {
      console.log('ON_REQUEST');
      const passcode = window.prompt(`Please ${createPasscode ? 'create' : 'enter'} your Vault passcode`);
      onComplete(passcode);
    });
    this.vault.onError((e) => {
      console.log('ON_ERROR');
      window.alert(`Error Code: ${e.code}, ${e.message}`);
    });
  }

  // async setSession(value: string): Promise<void> {
  //   console.log('SET_DATA');
  //   this.state.data = value;
  //   await this.vault.setValue(key, value);
  // }

  // async restoreSession() {
  //   console.log('GET_DATA');
  //   const value = await this.vault.getValue(key);
  //   this.state.data = value;
  // }

  async setVaultToCustomPasscode() {
    console.log(`TYPE: ${this.vault.config.type}`);
    console.log('SET_TYPE');
    if (this.vault.config.type === VaultType.CustomPasscode) {
      window.alert('Vault is already set to CustomPasscode');
    } else {
      await this.vault.updateConfig({
        ...this.vault.config,
        type: VaultType.CustomPasscode
      });
      console.log(`TYPE: ${this.vault.config.type}`);
    }
  }
}