import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchList } from './searchList';
import { PullRequests } from './pullRequests';
import { LoadingState } from '../stores/listStore';
import { RepositoriesStore } from '../stores/repositoriesStore';
import { ListRow } from './listRow';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx'
import styles from '../styles/searchListStyles';

class RepositoriesProps {
    projectName: string;
    teamName?: string;
}

@observer
export class Repositories extends Component<RepositoriesProps, {}> {

    private store: RepositoriesStore;
    @observable selectedRepositoryName: string;

    constructor() {
        super();
        this.store = new RepositoriesStore();
    }

    componentDidMount() {
        this.store.fetchRepositories(this.props.projectName, this.props.teamName);
    }

    render() {
        if (this.store.loadingState === LoadingState.Loaded && this.selectedRepositoryName) {
            return (<View />)
        } else {
            return (<SearchList
                store={this.store}
                hasSearch={true}
                renderRow={(rowData) => <ListRow title={rowData.name} onRowPressed={(repositoryName) => this.onRepositorySelected(repositoryName)} />}
            />);
        }
    }

    private onRepositorySelected(repositoryName: string) {
        const nextRoute = {
            component: PullRequests,
            title: "Pull Requests",
            passProps: { projectName: this.props.projectName, teamName: this.props.teamName, repositoryName: repositoryName }
        };
        (this.props as any).navigator.push(nextRoute);
    }
}
