import * as React from 'react';
import SessionHelper from './SessionHelper'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Logic = (props) => {
    console.log("LOGIC===>", this.props.logic)
    if (this.props.logic) {

        for (let row in this.props.logic) {
            this.props.logic.map((duration, prompt, feedback) => (
                < SessionHelper duration={duration} prompt={prompt} feedback={feedback} />
            ))

            sleep(row[0] * 1000)
        }
    }
}
