import React from "react";
import axios from "axios";
import Iframe from 'react-iframe';
import { Link, } from "react-router-dom";
import { Card, Icon, Button, Header, Grid, Item } from "semantic-ui-react";


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


  deleteVideo = (id) => {
    debugger
    axios.delete(`/api/videos/${id}`)
    // .then(res => {
    //   this.props.history.push("/")
    // })
       .then( res => {
         const { videos, } = this.state;
       this.setState({ videos: videos.filter(v => v.id !== id), })
     })
  }

  renderVideos = () => {
    const { videos, } = this.state;
    // if (videos.length <= 0)
    //   return <h3>No Videos</h3>
    return videos.map( video => ( 
      <>
      {
        video.id === 1 ? 
      <Grid.Row>
        <Item key={video.id}>
        <Link to={`/videos/${video.id}`} {...video}>
          {/* <Card.Content>
            <Card.Header>{ video.title }</Card.Header>
          </Card.Content>
          <Card.Content> */}
            {/* <Button as={Link} to={`/videos/${video.id}`} color='black'>
              View
            </Button> */}
            <Iframe
              url={video.trailer}
              width="450px"
              height="350px"
              id={video.id}
              display="initial"
              position="relative"
            >
            </Iframe>
            <Header>{ video.title }</Header>
          
          </Link>
          {/* <Button 
                icon
                size="tiny" 
                onClick={() => this.deleteVideo(video.id)} 
                style={{ marginLeft: "15px", }}
              >
                <Icon name="trash"/>
              </Button > */}
        </Item>
      </Grid.Row> 
        :
      <Grid.Row>
        <Item key={video.id}>
        <Link to={`/videos/${video.id}`}>
          {/* <Card.Content>
            <Card.Header>{ video.title }</Card.Header>
          </Card.Content>
          <Card.Content> */}
          <Header>{ video.title }</Header>
            {/* <Button as={Link} to={`/videos/${video.id}`} color='black'>
              View
            </Button> */}
            <Iframe
              url={video.trailer}
              width="250px"
              height="150px"
              id={video.id}
              display="initial"
              position="relative"
            >
            </Iframe>
            
          
          </Link>
          {/* <Button 
                icon
                size="tiny" 
                onClick={() => this.deleteVideo(video.id)} 
                style={{ marginLeft: "15px", }}
              >
                <Icon name="trash"/>
              </Button > */}
        </Item>
      </Grid.Row> 
            } 
  </>
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
