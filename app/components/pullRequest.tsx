import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchList } from './searchList';
import { LoadingState } from '../stores/listStore';
import { PullRequestStore } from '../stores/pullRequestStore';
import { ListRow } from './listRow';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { IPullRequest } from '../models/IPullRequest';
import styles from '../styles/searchListStyles';

class PullRequestProps {
    projectName: string;
    teamName: string;
    repositoryName: string;
    pullRequest: IPullRequest;
}

@observer
export class PullRequest extends Component<PullRequestProps, {}> {

    private store: PullRequestStore;

    constructor() {
        super();
        this.store = new PullRequestStore();
    }

    componentDidMount() {
        const { projectName, teamName, repositoryName, pullRequest } = this.props;
        this.store.fetchPullRequest(projectName, teamName, repositoryName, pullRequest.id);
    }

    render() {
      const data = this.store.data;
        return (
          <Text style={{flex:1}}>{data}</Text>
        );
    }
}
