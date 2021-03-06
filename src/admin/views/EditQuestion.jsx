import React from 'react';
import { withRouter } from 'react-router-dom';

class EditQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      quizset: ''
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    fetch(`http://localhost:3001/api/v1/questions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizAdminToken
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            title: data.question.title,
            option1: data.question.option1,
            option2: data.question.option2,
            option3: data.question.option3,
            option4: data.question.option4,
            answer: data.question.answer,
            quizset: data.question.quizset
          });
        }
      });
  }

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let id = this.props.match.params.id;
    let quizname = this.props.match.params.quizname;

    fetch(`http://localhost:3001/api/v1/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizAdminToken
      },
      body: JSON.stringify({
        title: this.state.title,
        option1: this.state.option1,
        option2: this.state.option2,
        option3: this.state.option3,
        option4: this.state.option4,
        answer: this.state.answer
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('successfully updated');
        }
      });
  };

  render() {
    return (
      <div className="sign-wrapper rsign-wrapper">
        <div className="sign-section">
          <form className="sign-form">
            <label className="sign-label" htmlFor="">
              Question title
            </label>
            <input
              className="sign-input"
              type="text"
              name="title"
              placeholder="e.g: who is the founder of oyo rooms?"
              value={this.state.title}
              onChange={this.handleChange}
            />
            {/* // options // */}
            <div className="create-options">
              <label className="sign-label" htmlFor="">
                Options
              </label>
              <input
                className="sign-input"
                type="text"
                name="option1"
                placeholder="Jef Bezos"
                value={this.state.option1}
                onChange={this.handleChange}
              />
              <input
                className="sign-input"
                type="text"
                name="option2"
                placeholder="Ritesh Agarwal"
                value={this.state.option2}
                onChange={this.handleChange}
              />
              <input
                className="sign-input"
                type="text"
                name="option3"
                placeholder="Varun Agarwal"
                value={this.state.option3}
                onChange={this.handleChange}
              />
              <input
                className="sign-input"
                type="text"
                name="option4"
                placeholder="Rakesh Chahar"
                value={this.state.option4}
                onChange={this.handleChange}
              />
            </div>
            {/* // options // */}

            <label className="sign-label" htmlFor="">
              Correct answer
            </label>
            <select
              name="answer"
              className="sign-select"
              value={this.state.answer}
              onChange={this.handleChange}
            >
              <option value={this.state.option1}>{this.state.option1}</option>
              <option value={this.state.option2}>{this.state.option2}</option>
              <option value={this.state.option3}>{this.state.option3}</option>
              <option value={this.state.option4}>{this.state.option4}</option>
            </select>
            <label className="sign-label" htmlFor="">
              Quizset Name
            </label>
            <p className="sign-quizsetname">
              {this.props.match.params.quizname}
            </p>
            <input
              className="sign-btn nav-item-btn"
              type="submit"
              value="PUBLISH"
              onClick={this.handleSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(EditQuestion);
