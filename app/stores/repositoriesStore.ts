import {
    ListView
} from 'react-native';
import { observable, computed, action } from 'mobx'
import { filter, startsWith, map } from 'lodash';
import { SearchListStore } from './searchListStore';

export class RepositoriesStore extends SearchListStore {
    _projectName: string; 
    _teamName: string; 

    @action 
    async fetchRepositories(projectName: string, teamName: string) {
        this._projectName = projectName;
        this._teamName = teamName;
        return super.fetchData(); 
    }

    filterItems(): any[] {
        return filter(this.items, (item) => { return startsWith(item.name, this.filterTerm); });
    }

    transformData(data: any): any[] {
        return data.value;
    }

    getPath(): string {
        let url = ""
        url += `https://msmobilecenter.visualstudio.com/DefaultCollection`;
        url += `/${this._projectName}`;
        url += this._teamName ? `/${this._teamName}` : "";
        url += `/_apis/git/repositories`
        url += "?api-version=1.0"
        return url;

    }
}