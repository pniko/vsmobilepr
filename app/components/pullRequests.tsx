import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchList } from './searchList';
import { LoadingState } from '../stores/listStore';
import { PullRequestsStore } from '../stores/pullRequestsStore';
import { ListRow } from './listRow';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx'
import styles from '../styles/searchListStyles';

class PullRequestsProps {
    projectName: string;
    teamName?: string;
    repositoryName: string;
}

@observer
export class PullRequests extends Component<PullRequestsProps, {}> {

    private store: PullRequestsStore;
    @observable selectedPullRequest: string;

    constructor() {
        super();
        this.store = new PullRequestsStore();
    }

    componentDidMount() {
        this.store.fetchPullRequests(this.props.projectName, this.props.teamName, this.props.repositoryName);
    }

    render() {
        if (this.store.loadingState === LoadingState.Loaded && this.selectedPullRequest) {
            return (<View />)
        } else {
            return (<SearchList
                store={this.store}
                hasSearch={true}
                renderRow={(rowData) => <ListRow title={rowData.name} data={rowData} onRowPressed={(pullRequestName, rowData) => this.onPullRequestSelected(pullRequestName, rowData)} />}
            />);
        }
    }

    private onPullRequestSelected(pullRequestName: string, rowData) {
        this.selectedPullRequest = pullRequestName;
    }
}
