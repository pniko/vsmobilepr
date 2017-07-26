import {
  ListView
} from 'react-native';
import { observable, computed } from 'mobx'
import { filter, startsWith, map } from 'lodash';
import { SearchListStore } from './searchListStore';

export class ProjectsStore extends SearchListStore {

  filterItems(): any[] {
    return filter(this.items, (item) => { return startsWith(item.name, this.filterTerm); });
  }

  transformData(data: any): any[] {
    const list = map(data.value, (item) => { return {id: item.id, name: item.name}});
    return list;
  }

  getPath(): string {
    // TODO: Make account configurable
    return 'https://msmobilecenter.visualstudio.com/DefaultCollection/_apis/projects?api-version=1.0';
  }
}