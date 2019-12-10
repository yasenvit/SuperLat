import React, { Fragment } from 'react';
import { OTPublisher } from 'opentok-react';
import CheckBox from './CheckBox';

// OT_8d35aca7-021a-43d8-8090-9daa904303b0
//OT_6e08b874-461b-4c09-9bd6-4de7b78699ad


class Publisher1 extends React.Component {
    constructor(props) {
        super(props);
        console.log("PROPS PUBLISHER", this.props.audioSettings)
        this.state = {
            error: null,
            audio: true,
            video: true,
            videoSource: 'camera'
        };
    }

    setAudioRemotely = (usernames, name) => {
        if (usernames) {
            for (const key in usernames) {
                if (key === name) {

                    this.setState({ audio: usernames[key] })
                }
            }
        }
    }

    componentDidUpdate(prevProps) {
        console.log("+++++componentDIDupdate++++++++")
        if (this.props.audioSettings !== prevProps.audioSettings) {
            this.setAudioRemotely(this.props.audioSettings, this.props.name)
        }

    }

    componentDidMount() {
        console.log("+++++++++componentDIDmount++++++++++")
        this.setAudioRemotely(this.props.audioSettings, this.props.name)
    }

    setAudio = (audio) => {
        this.setState({ audio });
    }

    setVideo = (video) => {
        this.setState({ video });
    }
    changeVideoSource = (videoSource) => {
        (this.state.videoSource !== 'camera') ? this.setState({ videoSource: 'camera' }) : this.setState({ videoSource: 'screen' })
    }

    onError = (err) => {
        this.setState({ error: `Failed to publish: ${err.message}` });
    }

    render() {

        // console.log("publisher NAME", this.props.name)
        console.log("audio==========", this.state.audio)
        // console.log("audioSettings+++", this.props.audioSettings)
        // console.log("publisher components--session->", this.props.session.connections)
        return (
            <Fragment>
                <div> publisher-- {this.props.name}</div>
                {this.state.error ? <div id="error">{this.state.error}</div> : null}
                <OTPublisher
                    session={this.props.session}

                    properties={{
                        publishAudio: this.state.audio,
                        publishVideo: this.state.video,
                        videoSource: this.state.videoSource === 'screen' ? 'screen' : undefined
                    }}
                    onError={this.onError}
                />

                <CheckBox
                    label="Share Screen"
                    onChange={this.changeVideoSource}
                />
                <CheckBox
                    label="Publish Audio"
                    initialChecked={this.state.audio}
                    onChange={this.setAudio}
                />
                <CheckBox
                    label="Publish Video"
                    initialChecked={this.state.video}
                    onChange={this.setVideo}
                />

            </Fragment>)
    };
}
export default Publisher1;
