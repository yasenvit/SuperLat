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
    idsList: "",
    currentAudio: { "user1": true, "user2": false, "user3": false }
  }



  get_credentials() {
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

    let audioData = [{ "user1": true, "user2": false, "user3": false },
    { "user1": false, "user2": true, "user3": false },
    { "user1": false, "user2": false, "user3": true },
    { "user1": true, "user2": false, "user3": false }]

    //   changeSpeaker() {

    // // If the count down is finished, write some text
    //   if (distance < 0) {
    //   clearInterval(x);
    //   document.getElementById("countdown").innerHTML = "EXPIRED";
    // }
    //   }

    const countDown = () => {

      var countDownDate = new Date("Dec 10, 2019 15:35:00").getTime()

      var x = setInterval(function () {
        var now = new Date().getTime();
        // time between now and timer expiration time
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
          clearInterval(x);
          document.getElementById("countdown").innerHTML = "EXPIRED";
        }

      }, 1000)

    }

    let audioSettings = { "user1": true, "user2": false, "user3": true }

    if (this.state.api_key && this.state.api_key.length !== 0) {
      output = (<div className="videobox">
        <SessionHelper apiKey={this.state.api_key} sessionId={this.state.session_id} token={this.state.token} audioSettings={audioSettings} />
      </div>)
    }

    return (<div>
      <div id='countdown'>

      </div>
      {output}
    </div>

    );
  }
  componentDidMount() {
    this.get_credentials()
  }
}
export default App;
