import {
  ListView
} from 'react-native';
import { observable, computed, action } from 'mobx'
import { filter, map } from 'lodash';
import AccountManager from '../helpers/accountManager';

var base64 = require('base-64');

export enum LoadingState {
  Loading = 1,
  Failed,
  Loaded,
}

export abstract class ListStore {
  items: any[];
  @observable datasource: any;
  @observable loadingState: LoadingState;

  constructor() {
    this.loadingState = LoadingState.Loaded;
    this.datasource = new ListView.DataSource({ 
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.datasource = this.datasource.cloneWithRows([]);
  }

  @action
  async fetchData(): Promise<void> {
    try {
      this.loadingState = LoadingState.Loading;
      const response = await fetch(this.getPath(), {
        headers: this.getHeaders(),
        method: 'GET'
      });
      const json = await response.json();
      this.items = this.transformData(json);
      this.datasource = this.datasource.cloneWithRows(this.items);
      this.loadingState = LoadingState.Loaded;
    } catch (err) {
      this.loadingState = LoadingState.Failed;
      console.log(`Failed to fetch items: ${err}`);
    }
  }

  private getHeaders(): any {
    var accountToken = AccountManager.getCurrentAccount().token;
    var base64Token = base64.encode(`:${accountToken}`);

    return {
      Authorization: `Basic ${base64Token}`,
      Accept: 'application/json'
    }
  }

  abstract getPath(): string;
  abstract transformData(data: any): any[];
}