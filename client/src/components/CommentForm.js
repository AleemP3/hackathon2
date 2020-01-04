import React from "react";
import { Form, } from "semantic-ui-react";
import axios from "axios";

class CommentForm extends React.Component {
  state = { author:"", body:"", date:"" }

  componentDidMount() {
    const { id, } = this.props
    // debugger
    if (id) {
          this.setState({ ...this.props })
    }
  }

  handleChange = (e) => {
    const { target: { name, value } } = e
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { id, } = this.props
    if (id) {
      axios.put(`/api/videos/:video_id/comments/:id`, { ...this.state })
        .then(res => {
          debugger
          // this.props.history.push(`/videos/${id}`)
          this.props.toggleEdit()
        })
    } else {
      axios.post(`/api/videos/${this.props.video.id}/comments`,  {...this.state} )
    }
    this.setState({ author:"", body:"", date:"" });
  }

  render() {
    const { author, body, date } = this.state
    return (
      <div >
        <Form style={this.props.edit ? { marginLeft: '-50px' } : { marginTop: '10px', }} onSubmit={this.handleSubmit}>
          <Form.Group width="equal">
            
          </Form.Group>
          <Form.Group style={this.props.edit ? { display: 'flex', flexDirection: 'column', flexShrink: 3 } : {}}>
            <Form.Input
              name="author"
              label="Username"
              placeholder="Username"
              required
              value={author}
              onChange={this.handleChange}
            />
            <Form.Input
              name="body"
              label="Comment"
              placeholder="Comment"
              required
              value={body}
              onChange={this.handleChange}
            />
            <Form.Input
              name="date"
              label="Date"
              placeholder="Date"
              required
              value={date}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button color='green'>Submit</Form.Button>
          {/* <div style={{ display: 'flex' }}>
            {this.props.edit ?
              <Form.Button color='red' onClick={this.props.toggleEdit}>Cancel</Form.Button>
              :
              <Form.Button color='red' onClick={this.props.toggle}>Cancel</Form.Button>
            }
          </div> */}
        </Form>
      </div >
    )
  }
}

export default CommentForm;