import React, {useState, useEffect } from "react";
import Iframe from 'react-iframe';
import VideoForm from './VideoForm';
import { Card, Icon, Button, Header, Grid} from "semantic-ui-react";
import axios from "axios";

const Video = (props) => {

  const [video, setVideo] = useState({})
  const [editForm, setEditForm] = useState(false)

  useEffect( () => {
    axios.get(`/api/videos/${props.match.params.video_id}`)
    .then(res => setVideo(res.data))
  }, [])

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
        </>
      }
    </Grid>
  )
}

export default Video; 