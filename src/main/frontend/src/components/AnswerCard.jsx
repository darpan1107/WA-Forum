import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import votingService from "../services/VotingService";

class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: "NOTHING",
      upvoteCount: 0,
    };
    this.upvoteClicked = this.upvoteClicked.bind(this);
    this.downvoteClicked = this.downvoteClicked.bind(this);
  }

  upvoteClicked() {
    console.log("upvote clicked");
    if (this.state.vote === "UPVOTE") {
      votingService.removeVote(this.props.id).then(
        this.setState({
          vote: "NOTHING",
          upvoteCount: this.state.upvoteCount - 1,
        })
      );
    } else if (this.state.vote === "NOTHING") {
      votingService.addVote(1, this.props.id).then(
        this.setState({
          vote: "UPVOTE",
          upvoteCount: this.state.upvoteCount + 1,
        })
      );
    } else {
      votingService.addVote(1, this.props.id).then(
        this.setState({
          vote: "UPVOTE",
          upvoteCount: this.state.upvoteCount + 2,
        })
      );
    }
  }

  downvoteClicked() {
    console.log("downvote clicked");
    if (this.state.vote === "DOWNVOTE") {
      votingService.removeVote(this.props.id).then(
        this.setState({
          vote: "NOTHING",
          upvoteCount: this.state.upvoteCount + 1,
        })
      );
    } else if (this.state.vote === "NOTHING") {
      votingService.addVote(-1, this.props.id).then(
        this.setState({
          vote: "DOWNVOTE",
          upvoteCount: this.state.upvoteCount - 1,
        })
      );
    } else {
      votingService.addVote(-1, this.props.id).then(
        this.setState({
          vote: "DOWNVOTE",
          upvoteCount: this.state.upvoteCount - 2,
        })
      );
    }
  }

  componentDidMount() {
    this.setState({
      upvoteCount: this.props.upvoteCount,
      vote: this.props.currentHasVoted,
    });
  }

  render() {
    return (
      <div id="questioncard">
        <Card className="customCard" text={"white"} style={{ height: "10rem" }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <div className="shadow-box-example z-depth-1-half">
            <Card.Body id="cardbody">
              <Row>
                <Col className="votingColumn" xs={1}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill={
                      this.state.vote === "UPVOTE" ? "green" : "currentColor"
                    }
                    className="bi bi-arrow-up-circle-fill upvote"
                    viewBox="0 0 16 16"
                    onClick={this.upvoteClicked}
                  >
                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                  </svg>
                  <br />
                  <strong>{this.state.upvoteCount}</strong>
                  <br />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill={
                      this.state.vote === "DOWNVOTE" ? "red" : "currentColor"
                    }
                    className="bi bi-arrow-down-circle-fill downvote"
                    viewBox="0 0 16 16"
                    onClick={this.downvoteClicked}
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                  </svg>
                </Col>
                <Col>
                  <Row
                    style={{
                      textAlign: "left",
                      marginTop: "-1px",
                      marginBottom: "10px",
                      marginLeft: "-20px",
                    }}
                  >
                    <Col>
                      {" "}
                      <Card.Subtitle>
                        <p
                          onClick={this.questionClickedShowAnswers}
                          color="white"
                        >
                          {this.props.body}
                        </p>
                      </Card.Subtitle>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col md="auto">
                      <div>
                        <img
                          className="asker"
                          src="https://upload.wikimedia.org/wikipedia/en/a/a1/NafSadh_Profile.jpg"
                          alt="user pic"
                          width="25"
                          height="25"
                        />
                        <text> Posted by {this.props.ownerDisplayName}</text>
                      </div>
                    </Col>

                    <Col>5 Days ago</Col>
                    <Col>
                      <ChatBubbleOutlineOutlinedIcon />
                      50+
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </div>
        </Card>
      </div>
    );
  }
}

export default AnswerCard;