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
          <Header>{ video.title }</Header>
              <Iframe
                url={video.trailer}
                width="450px"
                height="350px"
                id={video.id}
                display="initial"
                position="relative"
              >
              </Iframe>     
            </Link>
          </Item>
        </Grid.Column>
      </Grid.Row> 
        :
        <Grid.Column mobile={16} tablet={8} computer={5} style={{padding: "0 20px"}}>
        <Item 
          key={video.id}
        >
        <Link 
          to={`/videos/${video.id}`}
          {...video}
          >
            <Header>{ video.title }</Header>
            <Iframe
              url={video.trailer}
              id={video.id}
              display="initial"
              position="relative"
            >
            </Iframe>
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
        <Header as="h1" textAlign="left">All Videos</Header>
        <Grid columns={4}>
          { this.renderVideos() }
        </Grid>
      </>
    )
  }
};

export default Home;
