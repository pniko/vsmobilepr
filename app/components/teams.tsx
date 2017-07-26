import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { SearchList } from './searchList';
import { LoadingState } from '../stores/listStore';
import { TeamsStore } from '../stores/teamsStore';
import { Repositories } from './repositories';
import { ListRow } from './listRow';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx'
import styles from '../styles/searchListStyles';

class TeamsProps {
    projectName: string;
}

@observer
export class Teams extends Component<TeamsProps, {}> {

    private store: TeamsStore;
    @observable selectedTeamName: string;
    @observable skipped: boolean;

    constructor() {
        super();
        this.store = new TeamsStore();
    }

    componentDidMount() {
        this.store.fetchTeams(this.props.projectName);
    }

    render() {
        const { projectName } = this.props;
        if (this.skipped) {
            return (<Repositories projectName={projectName} />)
        }
        if (this.store.loadingState === LoadingState.Loaded && this.selectedTeamName) {
            return (<Repositories projectName={projectName} teamName={this.selectedTeamName} />)
        } else {
            return (<View style={styles.container}>
                <SearchList
                    store={this.store}
                    hasSearch={false}
                    renderRow={(rowData) => <ListRow title={rowData.item.name} onRowPressed={(teamName) => this.onTeamSelected(teamName)} />}
                /><Button title="Don't Select Team" onPress={() => this.onTeamSelected()} /></View>);
        }
    }

    private onTeamSelected(teamName?: string) {
        const { projectName } = this.props;
        const nextRoute = {
            component: Repositories,
            title: "Repositories",
            passProps: { projectName: projectName, teamName: this.selectedTeamName }
        };
        (this.props as any).navigator.push(nextRoute);
    }
}
