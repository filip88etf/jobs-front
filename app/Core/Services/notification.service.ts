import { Injectable } from '@angular/core';

class Config {
  isLoading: boolean;
  constructor() {
    this.isLoading = false;
  }
}

@Injectable()
export class NotificationService {
  private config: Config;

  constructor() {
    this.config = new Config();
  }

  public startLoading(): void {
    this.config.isLoading = true;
  }

  public stopLoading(): void {
    this.config.isLoading = false;
  }

  public getConfig(): Object {
    return this.config;
  }
}
