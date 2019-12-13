import React from 'react';
import './App.css';
import SessionHelper from './components/SessionHelper';
import apiCall from './util/apiCall';
import Prompts from './components/Prompts/Prompts';
import Feedbacks from './components/Feedbacks/Feedbacks'
import Messages from './components/Messages/Messages'
class App extends React.Component {

  state = {
    streams: [],
    api_key: "",
    session_id: "",
    token: "",
    logic: [],
    prompt: "",
    feedback: ""
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
        token: json.creds.token,
        logic: json.logic
      })
    })
  }

  sendToState = (dur, prompt, feedback) => {
    this.setState({
      duration: dur,
      prompt: prompt,
      feedback: feedback
    })
  }

  getMessages = (array) => {
    // this function  parse list of rows from meeting data and for each row sets state
    if (array && array.length > 0) {

      let duration = Date.parse('1970-01-01T' + array[0]["duration"] + 'Z');
      this.setState({
        duration: duration / 1000, //in seconds
        prompt: array[0]['prompt'],
        feedback: array[0]['feedback']
      });
      for (let i = 0; i < array.length; i++) {

        ((index) => {
          setTimeout(() => {
            console.log("timeout index--", index);
            let duration = Date.parse('1970-01-01T' + array[0]["duration"] + 'Z');

            this.sendToState(duration, array[index]['prompt'], array[index]['feedback'])

          }, i * 3000);
        })(i);
      }
    }
  }

  componentDidUpdate() {
    if (!this.state.prompt) {
      this.getMessages(this.state.logic)
    }
  }
  render() {
    console.log("PROMPTS-->>", this.state.prompt)
    let audioSettings = { "user1": true, "user2": false, "user3": true }
    let output = (<div></div>)
    if (this.state.api_key) {
      output = (<div>
        <SessionHelper
          apiKey={this.state.api_key}
          sessionId={this.state.session_id}
          token={this.state.token}
          audioSettings={audioSettings}

        />
      </div>)
    }

    // let duration
    // let prompt
    // let feedback
    // // this function  parse list of rows from meeting data and for each row sets state
    // if (this.state.logic && this.state.logic.length > 0) {

    //   duration = Date.parse('1970-01-01T' + this.state.logic[0]["duration"] + 'Z');
    //   prompt = <Prompts prompt={this.state.logic[0]['prompt']} />;
    //   feedback = <Feedbacks feedback={this.state.logic[0]['feedback']} />

    //   for (let i = 0; i < this.state.logic.length; i++) {

    //     (function (index, array) {
    //       setTimeout(function () {
    //         console.log("timeout index--", index);
    //         prompt = <Prompts prompt={array[index]['prompt']} />;
    //         feedback = <Feedbacks feedback={array[index]['feedback']} />

    //       }, i * 3000);
    //     })(i, this.state.logic);
    //   }
    // }
    console.log(prompt)

    return (<div className="main" >
      <section className="Left_section">
        <div className="meeting_videos">
          {output}
        </div>
        <Prompts prompt={this.state.prompt} />
      </section>
      <section className="right_section">

        <Feedbacks feedback={this.state.feedback} />
        <Messages />
      </section>
    </div>

    );
  }
  componentDidMount() {
    this.get_credentials()


  }
}
export default App;
