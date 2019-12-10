import React, { Fragment } from 'react';
import { OTSubscriber } from 'opentok-react';
import CheckBox from './CheckBox';


class Subscriber2 extends React.Component {
    constructor(props) {
        super(props);
        console.log("PROPS SUBS", this.props.audioSettings)
        this.state = {
            error: null,
            audio: false,
            video: true,

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
        // console.log("+++++componentDIDupdate++++++++")
        if (this.props.audioSettings !== prevProps.audioSettings) {
            this.setAudioRemotely(this.props.audioSettings, this.props.name)
        }

    }

    componentDidMount() {
        // console.log("+++++++++componentDIDmount++++++++++")
        this.setAudioRemotely(this.props.audioSettings, this.props.name)
    }

    setAudio = (audio) => {
        this.setState({ audio });
    }

    setVideo = (video) => {
        this.setState({ video });
    }

    onError = (err) => {
        this.setState({ error: `Failed to subscribe: ${err.message}` });
    }

    render() {

        console.log("audio2==========", this.state.audio)

        return (
            <Fragment>
                <div> subscriber2-- {this.props.name}</div>
                {this.state.error ? <div id="error">{this.state.error}</div> : null}
                <OTSubscriber
                    key={this.props.key}
                    session={this.props.session}
                    stream={this.props.stream}
                    properties={{
                        resolution: '170x270',
                        subscribeToAudio: this.state.audio,
                        subscribeToVideo: this.state.video
                    }}
                    onError={this.onError}
                />

                <CheckBox
                    label="Subscribe to Audio"
                    initialChecked={this.state.audio}
                    onChange={this.setAudio}
                />
                <CheckBox
                    label="Subscribe to Video"
                    initialChecked={this.state.video}
                    onChange={this.setVideo}
                />

            </Fragment>
        );
    }
}
export default Subscriber2;
