import React from "react";
import axios from "axios";
import Iframe from 'react-iframe';
import { Link, } from "react-router-dom";
import { Card, Icon, Button, Header, Grid} from "semantic-ui-react";


class Home extends React.Component {
  state = {videos: []}

  componentDidMount() {
    axios.get("/api/videos")
    .then(res => {
      this.setState({ videos: res.data })
    })
      .catch(err => {
        console.log(err.response)
    })
  }

  deletevideo = (id) => {
    axios.delete(`/api/${id}`)
      .then( res => {
        const { videos, } = this.state;
        this.setState({ videos: videos.filter(d => d.id !== id), })
      })
  }

  renderVideos = () => {
    const { videos, } = this.state;
    // if (videos.length <= 0)
    //   return <h3>No Videos</h3>
    return videos.map( video => (
      <Grid.Row>
        <Link to={`/${video.id}`}>
        {/* <Card key={video.id}> */}
          {/* <Card.Content>
            <Card.Header>{ video.name }</Card.Header>
          </Card.Content>
          <Card.Content extra> */}
            {/* <Button as={Link} to={`/videos/${video.id}`} color='black'>
              View
            </Button> */}
            <Iframe
              url={video.trailer}
              width="450px"
              height="450px"
              id={video.id}
              display="initial"
              position="relative"
            >
              <Button 
                icon
                size="tiny" 
                onClick={() => this.deleteVideo(video.id)} 
                style={{ marginLeft: "15px", }}
              >
                <Icon name="trash"/>
              </Button >
            </Iframe>
          {/* </Card.Content>
        </Card> */}
        </Link>
      </Grid.Row>
    )
  )}

  render() {

    return (
      <>
        <Header as="h1" textAlign="left">All Videos</Header>
        <Grid columns={4}>
          { this.renderVideos() }
          {/* <Iframe
              url="http://www.youtube.com/embed/xDMP3i36naA"
              width="450px"
              height="450px"
           
              display="initial"
              position="relative"
            >
              <Button 
                icon
                size="tiny" 
                onClick={() => this.deleteVideo(video.id)} 
                style={{ marginLeft: "15px", }}
              >
                <Icon name="trash"/>
              </Button >
            </Iframe> */}
        </Grid>
      </>
    )
  }
};

export default Home;
