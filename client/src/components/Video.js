import React, {useState, useEffect } from "react";
import Iframe from 'react-iframe';
import { Card, Icon, Button, Header, Grid} from "semantic-ui-react";
import axios from "axios";

const Video = (props) => {

  const [video, setVideo] = useState({})

  useEffect( () => {
    axios.get(`/api/videos/${props.match.params.video_id}`)
    .then(res => setVideo(res.data))
  }, [])

  

  return (
    <Grid>
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
    </Grid>
  )
}

export default Video; 