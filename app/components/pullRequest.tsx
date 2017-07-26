import React, { Component } from 'react';
import { View, SectionList, Text } from 'react-native';
import { LoadingState } from '../stores/listStore';
import { PullRequestStore } from '../stores/pullRequestStore';
import { ListRow } from './listRow';
import SourceView from './sourceView';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { IPullRequest } from '../models/IPullRequest';
import { IPullRequestChange } from '../models/IPullRequestChange';
import { map } from 'lodash';
import styles from '../styles/pullRequestStyles';

class PullRequestProps {
    projectName: string;
    teamName: string;
    repositoryName: string;
    pullRequest: IPullRequest;
}

@observer
export class PullRequest extends Component<PullRequestProps, {}> {

    MOCK: IPullRequestChange[] =
    [{
        path: "src/activities/MainActivity.java",
        sourceFile: "jdhasjhdjashdhjsakdjsa",
        baseFile: "jdhajshjdsa"
    },
    {
        path: "src/activities/FragmentA.java",
        sourceFile: "jdhasjhdjashdhjsakdjsa",
        baseFile: "jdhajshjdsa"
    },
    {
        path: "src/activities/SubActivity.java",
        sourceFile: "jdhasjhdjashdhjsakdjsa",
        baseFile: "jdhajshjdsa"
    }];


    private store: PullRequestStore;

    constructor() {
        super();
        // this.store = new PullRequestStore();
    }

    componentDidMount() {
        const { projectName, teamName, repositoryName, pullRequest } = this.props;
        // this.store.fetchPullRequest(projectName, teamName, repositoryName, pullRequest.id);
    }

    render() {
        // TODO: Get data from store
        const data = this.MOCK;
        const sections = map(data, (item) => { return { data: [item], title: item.path } });

        return (
            <View style={styles.container}>
                <SectionList style={styles.list}
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderSectionHeader}
                    sections={sections}
                />
            </View >
        );
    }

    renderItem(item: any): JSX.Element {
        return (
            <SourceView />
        );
    }

    renderSectionHeader(section: any): JSX.Element {
        return (
            <Text style={styles.sectionHeader}>{section.section.title}</Text>
        );
    }
}
