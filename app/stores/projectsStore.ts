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
    return data.value;
  }

  getPath(): string {
    // TODO: Make account configurable
    return 'https://msmobilecenter.visualstudio.com/DefaultCollection/_apis/projects?api-version=1.0';
  }
}