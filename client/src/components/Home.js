import React from "react";
import axios from "axios";
import Iframe from 'react-iframe';
import { Link, } from "react-router-dom";
import { Card, Icon, Button, Header, Grid, Item} from "semantic-ui-react";


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
       .then( res => {
         const { videos, } = this.state;
       this.setState({ videos: videos.filter(v => v.id !== id), })
     })
  }

  renderVideos = () => {
    const { videos, } = this.state;
    if (videos.length <= 0)
      return <h3>No Videos</h3>
    return videos.map( video => ( 
      <>
      {
        video.id === 1 ? 
      <Grid.Row stretched>
        <Grid.Column width={6}>
        <Item key={video.id}>
        <Link to={`/videos/${video.id}`} {...video}>
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
        </Item>
        </Grid.Column>
      </Grid.Row> 
        :
        <Grid.Column width={6}>
        <Item key={video.id}>
        <Link to={`/videos/${video.id}`}>
            <Iframe
              url={video.trailer}
              width="250px"
              height="150px"
              id={video.id}
              display="initial"
              position="relative"
            >
            </Iframe>
            <Header>{ video.title }</Header>
          </Link>
        </Item>
        </Grid.Column>
    } 
  </>
    )
  )}

  render() {

    return (
      <>
        <Header as="h1" textAlign="left" style={{padding: "20px 0"}}>All Videos</Header>
        <Grid columns={4}>
          { this.renderVideos() }
        </Grid>
      </>
    )
  }
};

export default Home;
