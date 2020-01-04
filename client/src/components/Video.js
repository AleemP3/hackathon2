import React, {useState, useEffect } from "react";
import Iframe from 'react-iframe';
import { Card, Icon, Button, Header, Grid} from "semantic-ui-react";
import axios from "axios";

const Video = () => {

  const [video, setVideo] = useState([])

  useEffect( (data) => {
    axios.get(`/api/videos/${props.match.params.id}`, data)
    .then(res => setVideo(...data))
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