import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { SearchList } from './searchList';
import { LoadingState } from '../stores/searchListStore';
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
    private _projectName: string;
    @observable selectedTeamName: string;
    @observable skipped: boolean;

    constructor() {
        super();
        this.store = new TeamsStore();
    }

    componentDidMount() {
        this._projectName = this.props.projectName;
        this.store.fetchTeams(this._projectName);
    }

    render() {
        if (this.skipped) {
            return (<Repositories projectName={this._projectName} />)
        }
        if (this.store.loadingState === LoadingState.Loaded && this.selectedTeamName) {
            return (<Repositories projectName={this._projectName} teamName={this.selectedTeamName} />)
        } else {
            return (<View style={styles.container}>
                <Button title="skip" onPress={() => { this.skipped = true }} />
                <SearchList
                    store={this.store}
                    hasSearch={true}
                    renderRow={(rowData) => <ListRow title={rowData} onRowPressed={(teamName) => this.onTeamSelected(teamName)} />}
                /></View>);
        }
    }

    private onTeamSelected(teamName: string) {
        const nextRoute = {
            component: Repositories,
            title: this._projectName,
            passProps: { projectName: this._projectName, teamName: this.selectedTeamName }
        };
        (this.props as any).navigator.push(nextRoute);
    }
}
