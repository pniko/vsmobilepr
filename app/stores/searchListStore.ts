import {
  ListView
} from 'react-native';
import { observable, computed, action } from 'mobx'
import { filter, map } from 'lodash';
import { ListStore } from './listStore';

export abstract class SearchListStore extends ListStore {
  @observable filterTerm: string;

  @action
  setFilterTerm(filterTerm: string): void {
    this.filterTerm = filterTerm;
    const filteredItems = this.filterItems()
    super.datasource = super.datasource.cloneWithRows(filteredItems);
  }

  abstract filterItems(): any[];
}