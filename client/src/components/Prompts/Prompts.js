import React, { Component } from 'react'
import './Prompts.css'
export default class Prompts extends Component {
    render() {
        return (
            <div className="prompt">
                <div className="prompt_content">
                    <h3>
                        Prompts
                </h3>
                    {this.props.prompt ? this.props.prompt : "nothing to display"}
                </div>
                {/* <Countdown /> */}

            </div>
        )
    }
}
