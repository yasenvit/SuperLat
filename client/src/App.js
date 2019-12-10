import React from 'react';
import './App.css';
import SessionHelper from './components/SessionHelper';
import apiCall from './util/apiCall';

class App extends React.Component {

  state = {
    streams: [],
    api_key: "",
    session_id: "",
    token: "",
    idsList: ""
  }


  get_audioSettings() {
    // api call to flask server to get session credentials from db
    const endpoint = `/db/sessions/current`
    const promise = apiCall(endpoint, 'get')
    promise.then(blob => blob.json()).then(json => {
      console.log(json.creds)
      this.setState({
        api_key: json.creds.api_key,
        session_id: json.creds.session_id,
        token: json.creds.token
      })
    })
  }

  // componentDidMount() {
  //     this.interval = setInterval(() => this.get_audio_settings(this.props.session, this.props.key), 1000);
  // }
  // componentWillUnmount() {
  //     clearInterval(this.interval);
  // }
  render() {
    let output = (<div className="videobox"></div>)
    let audioSettings = { "user1": false, "user2": true, "user3": false }

    if (this.state.api_key && this.state.api_key.length !== 0) {
      output = (<div className="videobox">
        <SessionHelper apiKey={this.state.api_key} sessionId={this.state.session_id} token={this.state.token} audioSettings={audioSettings} />
      </div>)
    }

    return (<div>
      {output}
    </div>

    );
  }
  componentDidMount() {
    this.get_audioSettings()
  }
}
export default App;
