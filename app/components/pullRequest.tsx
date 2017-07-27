import React, { Component } from 'react';
import { View, SectionList, Text } from 'react-native';
import { LoadingState } from '../stores/commitChangesStore';
import { PullRequestStore } from '../stores/pullRequestStore';
import { ListRow } from './listRow';
import SourceView from './sourceView';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { IPullRequest } from '../models/IPullRequest';
import { IPullRequestChange } from '../models/IPullRequestChange';
import { CommitChangesStore } from '../stores/commitChangesStore'
import { map } from 'lodash';
import styles from '../styles/pullRequestStyles';

class PullRequestProps {
    projectName: string;
    repositoryName: string;
    latestCommitId: string;
}

@observer
export class PullRequest extends Component<PullRequestProps, {}> {
    private store: CommitChangesStore;

    constructor() {
        super();
        this.store = new CommitChangesStore();
    }

    componentDidMount() {
        const { projectName, repositoryName, latestCommitId } = this.props;
        this.store.fetchPullRequestChanges(projectName, repositoryName, latestCommitId);
    }

    render() {
        if (this.store.loadingState === LoadingState.Loaded) {
            const data = this.store.items;
            const sections = map(data, (item) => { return { data: [item], title: item.path } });
            return (<View style={styles.container}>
                <SectionList style={styles.list}
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderSectionHeader}
                    sections={sections}
                    keyExtractor={item => item.objectId + item.originalObjectId}
                />
            </View >);
        } else {
            return (<View />)
        };
    }

    renderItem(item: any): JSX.Element {
        if (item.item.changeType === "delete") {
            return (<View />);
        } else {
            return (
                <SourceView baseText={item.item.baseFile} newText={item.item.sourceFile} />
            );
        }
    }

    renderSectionHeader(section: any): JSX.Element {
        return (
            <Text style={styles.sectionHeader}>{section.section.title} ({section.section.data[0].changeType})</Text>
        );
    }
}
