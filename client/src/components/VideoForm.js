import React from "react";
import { Form, } from "semantic-ui-react";
import axios from "axios";

class VideoForm extends React.Component {
  state = { title:"", duration:"", genre:"", description:"", trailer:"" }

  componentDidMount() {
    const { id, } = this.props
    if (this.props.edit) {
      axios.get(`/api/${id}`)
        .then(res => {
          this.setState({ ...res.data })
        })
    }
  }

  handleChange = (e) => {
    const { target: { name, value } } = e
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { id, } = this.props
    if (this.props.edit) {
      axios.put(`/api/videos/${id}`, { ...this.state })
        .then(res => {
          this.props.updateVideosArray(res.data)
          this.props.toggleEdit()
        })
    } else {
      axios.post(`/api/videos`, { ...this.state })
        .then(res => this.props.addVideo(res.data))
        debugger
      this.props.toggle()
    }
  }

  render() {
    const { title, duration, genre, description, trailer } = this.state
    return (
      <div >
        <Form style={this.props.edit ? { marginLeft: '-50px' } : { marginTop: '10px', }} onSubmit={this.handleSubmit}>
          <Form.Group width="equal">
            
          </Form.Group>
          <Form.Group style={this.props.edit ? { display: 'flex', flexDirection: 'column', flexShrink: 3 } : {}}>
            <Form.Input
              name="title"
              label="Title"
              placeholder="Title"
              required
              value={title}
              onChange={this.handleChange}
            />
            <Form.Input
              name="duration"
              label="Duration"
              placeholder="Duration"
              required
              value={duration}
              onChange={this.handleChange}
            />
            <Form.Input
              name="genre"
              label="Genre"
              placeholder="Genre"
              required
              value={genre}
              onChange={this.handleChange}
            />
             <Form.Input
              name="description"
              label="Description"
              placeholder="Description"
              required
              value={description}
              onChange={this.handleChange}
            />
             <Form.Input
              name="trailer"
              label="Trailer"
              placeholder="Trailer"
              required
              value={trailer}
              onChange={this.handleChange}
            />
          </Form.Group>
          <div style={{ display: 'flex' }}>
            <Form.Button color='green'>Submit</Form.Button>
            {this.props.edit ?
              <Form.Button color='red' onClick={this.props.toggleEdit}>Cancel</Form.Button>
              :
              <Form.Button color='red' onClick={this.props.toggle}>Cancel</Form.Button>
            }
          </div>
        </Form>
      </div >
    )
  }
}

export default VideoForm;