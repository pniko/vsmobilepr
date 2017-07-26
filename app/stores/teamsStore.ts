import {
    ListView
} from 'react-native';
import { observable, computed, action } from 'mobx'
import { filter, startsWith, map } from 'lodash';
import { SearchListStore } from './searchListStore';

export class TeamsStore extends SearchListStore {
    _projectName: string; 

    @action 
    async fetchTeams(projectName: string) {
        this._projectName = projectName;
        return super.fetchData(); 
    }

    filterItems(): any[] {
        const filterString = this.filterTerm ? this.filterTerm.toLowerCase() : "";
        return filter(this.items, (item) => { return startsWith(item.name.toLowerCase(), filterString); });
    }

    transformData(data: any): any[] {
    return map(data.value, (item) => { return {id: item.id, name: item.name}});
  }

    getPath(): string {
        const base = `https://msmobilecenter.visualstudio.com/DefaultCollection/_apis/projects`;
        return `${base}/${this._projectName}/teams?api-version=1.0`   
    }
}