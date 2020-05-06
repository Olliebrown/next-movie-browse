import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: '1px solid lightgrey',
    margin: theme.spacing(2)
  }
}))

function Banner (props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant='h1'>{props.title}</Typography>
      <Typography variant='body1'>{props.children}</Typography>
    </div>
  )
}

Banner.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

Banner.defaultProps = {
  title: 'Banner Title'
}

export default Banner
