import {
  ListView
} from 'react-native';
import { observable, computed, action } from 'mobx'
import { filter, map } from 'lodash';
import TokenManager from '../helpers/tokenManager';
import { ListStore } from './listStore';
import AccountManager from '../helpers/accountManager';

export abstract class SearchListStore extends ListStore {
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