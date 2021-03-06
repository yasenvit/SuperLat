from opentok import OpenTok
from opentok import MediaModes
from flask import Flask, jsonify, render_template
import util
from datetime import datetime
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)
api_key = "46473922"
api_secret = "b74c8b1535e3bfe35d1d2af0d9e8b47602657a7e"
openTok = OpenTok(api_key, api_secret)
URL = ""


def create_session():
    print("creat session function")
    session = openTok.create_session(media_mode=MediaModes.routed)
    return session


def create_tokens(number):
    tokens = []
    print("creating tokens function")
    session = create_session()
    session_id = session.session_id
    print("session ID:", session_id)
    now = datetime.now()
    timestamp = datetime.timestamp(now)
    for _ in range(number):
        token = openTok.generate_token(session_id)
        tokens.append(token)
    print("token1:", tokens[0])
    print("token2:", tokens[1])
    print("token3:", tokens[2])
    util.record_session(api_key, session_id, tokens[0], timestamp)
    return (tokens, session_id)


def get_links(number):
    print("get links function")
    tokens, session_id = create_tokens(number)  # list of tokens for one session
    links = []
    for token in tokens:
        link = URL + "/" + session_id + "/" + token
        links.append(link)
    util.send_emails(links)


get_links(4)


@app.route("/<session_id>/<token>")
def rooms(session_id, token):
    key = api_key
    return render_template(
        "index.html", api_key=key, session_id=session_id, token=token
    )


@app.route("/db/sessions/current")
def get_current_session():
    logic = [
        {
            "session_id": "1_MX40NTgyODA2Mn5-MTU3NTkyODkxODk3MH4wQ2tPT3pCWng0ZFVhZnplTzBLL0s3cFR-UH4",
            "start_time": "12:00:00",
            "duration": "00:00:10",
            "speaker": "1",
            "prompt": "introduce yourself",
            "feedback": '{ "question":"how many times did the speaker say "umm"?", "a":"0 times", "b":"once or twice", "c":"2 - 5 times", "d":"more than 5 times" }',
        },
        {
            "session_id": "1_MX40NTgyODA2Mn5-MTU3NTkyODkxODk3MH4wQ2tPT3pCWng0ZFVhZnplTzBLL0s3cFR-UH4",
            "start_time": "12:00:05",
            "duration": "00:00:10",
            "speaker": "1",
            "prompt": "global warming",
            "feedback": '{ "question":"how many times did the speaker say "umm"?", "a":"0 times", "b":"once or twice", "c":"2 - 5 times", "d":"more than 5 times" }',
        },
        {
            "session_id": "1_MX40NTgyODA2Mn5-MTU3NTkyODkxODk3MH4wQ2tPT3pCWng0ZFVhZnplTzBLL0s3cFR-UH4",
            "start_time": "12:00:10",
            "duration": "00:00:10",
            "speaker": "1",
            "prompt": "fake news",
            "feedback": '{ "question":"how many times did the speaker say "umm"?", "a":"0 times", "b":"once or twice", "c":"2 - 5 times", "d":"more than 5 times" }',
        },
        {
            "session_id": "1_MX40NTgyODA2Mn5-MTU3NTkyODkxODk3MH4wQ2tPT3pCWng0ZFVhZnplTzBLL0s3cFR-UH4",
            "start_time": "12:00:10",
            "duration": "00:00:10",
            "speaker": "1",
            "prompt": "fake news",
            "feedback": '{ "question":"how many times did the speaker say "umm"?", "a":"0 times", "b":"once or twice", "c":"2 - 5 times", "d":"more than 5 times" }',
        },
        {
            "session_id": "1_MX40NTgyODA2Mn5-MTU3NTkyODkxODk3MH4wQ2tPT3pCWng0ZFVhZnplTzBLL0s3cFR-UH4",
            "start_time": "12:00:10",
            "duration": "00:00:10",
            "speaker": "1",
            "prompt": "latest news",
            "feedback": '{ "question":"how many times did the speaker say "umm"?", "a":"0 times", "b":"once or twice", "c":"2 - 5 times", "d":"more than 5 times" }',
        }
    ]
    result = util.get_session_creds()
    # result["logic"] = logic
    # print("\n\n", result, "\n\n")
    return jsonify({"creds": result, "logic": logic})


if __name__ == "__main__":
    app.debug = True
    app.run("0.0.0.0")
