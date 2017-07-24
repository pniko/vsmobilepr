import {
  ListView
} from 'react-native';
import {observable} from 'mobx'

const TOKEN_KEY: string = "AUTH_TOKEN";

enum LoadingState {
    Loading = 1,
    Failed,
    Loaded,
}

abstract class ListViewStore {

  @observable datasource: any;
  @observable loadingState: LoadingState;
  private path: string;

  constructor(path) {
    this.path = path;
    this.loadingState = LoadingState.Loaded;
  }

  async fetchData(): Promise<void> {
    try {
      this.loadingState = LoadingState.Loading;
      const response = await fetch(this.path);
      const items = this.transformData(response.json());
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.datasource = ds.cloneWithRows(items)
      this.loadingState = LoadingState.Loaded;
    } catch(err) {
      this.loadingState = LoadingState.Failed;
      console.log('Failed to fetch items');
    }
  }

  abstract transformData(data: any): any[];
}