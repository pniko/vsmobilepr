import {
  ListView
} from 'react-native';
import { observable, computed, action } from 'mobx'
import { filter, map } from 'lodash';
import { ListStore } from './listStore';
import AccountManager from '../helpers/accountManager';

var base64 = require('base-64');

export enum LoadingState {
  Loading = 1,
  Failed,
  Loaded,
}

export abstract class SearchListStore {

  @observable datasource: any;
  @observable items: any[];
  @observable loadingState: LoadingState;
  @observable filterTerm: string;

  constructor() {
    super()
  }

  @action
  setFilterTerm(filterTerm: string): void {
    this.filterTerm = filterTerm;
    const filteredItems = this.filterItems()
    super.datasource = super.datasource.cloneWithRows(filteredItems);
  }

  abstract filterItems(): any[];
}