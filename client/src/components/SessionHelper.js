import React, { Fragment } from 'react';
import { preloadScript, createSession } from 'opentok-react';
// import ConnectionStatus from './ConnectionStatus';
import Publisher1 from './Publisher1';
import Subscriber2 from './Subscriber2';
import Subscriber3 from './Subscriber3';
import Subscriber4 from './Subscriber4';
import Subscriber5 from './Subscriber5';
import Subscriber6 from './Subscriber6';
import Subscriber7 from './Subscriber7';
import Subscriber8 from './Subscriber8';
import Subscriber9 from './Subscriber9';

import '../App.css';



class SessionHelper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { streams: [], ids: [] };
    }

    UNSAFE_componentWillMount() {
        // console.log("SESSION_ID==>", this.props.sessionId)
        // console.log("TOKEN==>", this.props.token)
        this.sessionHelper = createSession({
            apiKey: this.props.apiKey,
            sessionId: this.props.sessionId,
            token: this.props.token,
            onStreamsUpdated: streams => { this.setState({ streams }); }
        });
    }

    componentWillUnmount() {
        this.sessionHelper.disconnect();
    }


    render() {
        console.log(this.props.audioSettings)
        console.log("first stream>", this.state.streams)
        console.log("streams length--->", this.state.streams ? this.state.streams.length : "no streams yet")

        let user1 = <div id="screen1"></div>
        let user2 = (<div id="screen2"></div>)
        let user3 = (<div id="screen3"></div>)
        let user4 = (<div id="screen4"></div>)
        let user5 = (<div id="screen5"></div>)
        let user6 = (<div id="screen6"></div>)
        let user7 = (<div id="screen7"></div>)
        let user8 = (<div id="screen8"></div>)
        let user9 = (<div id="screen9"></div>)

        if (this.props.sessionId && this.props.sessionId.length !== 0) {
            let username = "user1"
            user1 = (<div id="screen1"><Publisher1 session={this.sessionHelper.session} name={username} audioSettings={this.props.audioSettings} /></div>)
            if (this.state.streams && this.state.streams.length > 0) {
                user2 = (
                    <div id="screen2">

                        <Subscriber2
                            audioSettings={this.props.audioSettings}
                            name="user2"
                            id={this.state.streams[0].id}
                            key={this.state.streams[0].id}
                            session={this.sessionHelper.session}
                            stream={this.state.streams[0]}
                        />
                    </div>
                )
            }
            if (this.state.streams && this.state.streams.length > 1) {
                user3 = (
                    <div id="screen3">
                        <Subscriber3
                            name="user3"
                            id={this.state.streams[1].id}
                            key={this.state.streams[1].id}
                            session={this.sessionHelper.session}
                            stream={this.state.streams[1]}
                        />
                    </div>
                )
            }
            if (this.state.streams && this.state.streams.length > 2) {
                user4 = (
                    <div id="screen4">
                        <Subscriber4
                            name="user4"
                            id={this.state.streams[2].id}
                            key={this.state.streams[2].id}
                            session={this.sessionHelper.session}
                            stream={this.state.streams[2]}
                        />
                    </div>
                )
            }
            if (this.state.streams && this.state.streams.length > 3) {
                user5 = (
                    <div id="screen5">
                        <Subscriber5
                            name="user4"
                            id={this.state.streams[3].id}
                            key={this.state.streams[3].id}
                            session={this.sessionHelper.session}
                            stream={this.state.streams[3]}
                        />
                    </div>
                )
            }
            if (this.state.streams && this.state.streams.length > 4) {
                user6 = (
                    <div id="screen6">
                        <Subscriber6
                            name="user6"
                            id={this.state.streams[4].id}
                            key={this.state.streams[4].id}
                            session={this.sessionHelper.session}
                            stream={this.state.streams[4]}
                        />
                    </div>
                )
            }
            if (this.state.streams && this.state.streams.length > 5) {
                user7 = (
                    <div id="screen7">
                        <Subscriber7
                            name="user7"
                            id={this.state.streams[5].id}
                            key={this.state.streams[5].id}
                            session={this.sessionHelper.session}
                            stream={this.state.streams[5]}
                        />
                    </div>
                )
            }
            if (this.state.streams && this.state.streams.length > 6) {
                user8 = (
                    <div id="screen8">
                        <Subscriber8
                            name="user8"
                            id={this.state.streams[6].id}
                            key={this.state.streams[6].id}
                            session={this.sessionHelper.session} id="screen2"
                            stream={this.state.streams[6]}
                        />
                    </div>
                )
            }
            if (this.state.streams && this.state.streams.length > 7) {
                user9 = (
                    <div id="screen9">
                        <Subscriber9
                            name="user9"
                            id={this.state.streams[7].id}
                            key={this.state.streams[7].id}
                            session={this.sessionHelper.session}
                            stream={this.state.streams[7]}
                        />
                    </div>
                )
            }

        }
        return (
            <Fragment>
                {user1}
                {user2}
                {user3}
                {user4}
                {user5}
                {user6}
                {user7}
                {user8}
                {user9}
            </Fragment >
        );
    }
}
export default preloadScript(SessionHelper);

