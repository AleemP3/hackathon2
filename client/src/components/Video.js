import React, {useState, useEffect } from "react";
import Iframe from 'react-iframe';
import CommentForm from './CommentForm';
import VideoForm from './VideoForm';
import { Card, Icon, Button, Header, Grid} from "semantic-ui-react";
import axios from "axios";

const Video = (props) => {

  const [video, setVideo] = useState({})
  const [editForm, setEditForm] = useState(false)
  const [comments, setComment] = useState([])

  useEffect( () => {
    axios.get(`/api/videos/${props.match.params.video_id}`)
    .then(res => setVideo(res.data))

    axios.get(`/api/videos/${props.match.params.video_id}/comments`)
    .then(res => setComment(res.data))

  }, [])

  const renderComments = () => {
    return comments.map(c => (
      <Grid.Row>
        <Card>
          <Card.Header>{c.author}</Card.Header>
          <Card.Content>
            <Card.Description>{c.body}</Card.Description>
            <Card.Meta>{c.date}</Card.Meta>
            <Button onClick={ () => deleteComment(props.match.params.video_id, c.id)}>Delete</Button>
          </Card.Content>
        </Card>
      </Grid.Row>
    ))
  }

  const deleteComment = (video_id, comment_id) => {
    axios.delete(`/api/videos/${video_id}/comments/${comment_id}`)
    .then(res => {
      setComment(comments.filter(c => c.id !== comment_id))
    })
  }


  const deleteVideo = (id) => {
    axios.delete(`/api/videos/${id}`) 
       .then( res => {
        props.history.push("/")
     })
  }

  const toggleEdit = () => {
    setEditForm(!editForm)
  }

  return (
    <Grid>
      {
        editForm ? 
        <VideoForm {...video} toggleEdit={toggleEdit}/>
        :
        <>
          <Grid.Row>
            <Iframe 
              url={video.trailer}
              width="100%"
              height="450px"
              id={video.id}
              display="initial"
              position="relative"
            />
          </Grid.Row>
          <Button 
            icon
            size="tiny" 
            onClick={() => deleteVideo(props.match.params.video_id)} 
            style={{ marginLeft: "15px", }}
          >
            <Icon name="trash"/>
          </Button >
          <Button 
            icon
            size="tiny" 
            onClick={() => toggleEdit(props.match.params.video_id)} 
            style={{ marginLeft: "15px", }}
          >
            <Icon name="pencil"/>
          </Button >
          <CommentForm video={video} />
        </>
      }
      <Card>{ renderComments() }</Card>
    </Grid>
  )
}

export default Video; 