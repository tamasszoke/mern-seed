import React, { Component } from 'react'
import styles from './home.module.scss'
import { Card, CardContent, Typography } from '@material-ui/core'
import GitHubButton from 'react-github-btn'

class Home extends Component {
  render() {
    return (
      <div className={ styles.home }>
        <Card className={ styles.card }>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Get started with
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              MERN Boilerplate
            </Typography>
            <Typography component="p">
              <GitHubButton
                href="https://github.com/tamasszoke/mern-boilerplate"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star tamasszoke/mern-boilerplate on GitHub"
              >
                Star
              </GitHubButton>
            </Typography>
            <Typography component="p">
              <GitHubButton
                href="https://github.com/tamasszoke"
                data-size="large"
                aria-label="Follow @tamasszoke on GitHub"
              >
                Follow @tamasszoke
              </GitHubButton>
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default Home
