import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import Sync from '@material-ui/icons/Sync'

import withStyles from '@material-ui/core/styles/withStyles'
import notificationStyle from 'assets/jss/components/notificationStyle.jsx'

class NotificationSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      hidden: false,
    }
  }

  handleFadeOut = async () => {
    setTimeout( () => {
        this.setState({ open: false })

    }, 1500)

    setTimeout( () => {
        this.setState({ hidden: true})

    }, 2250)
  }

  handleClick = () => {
    this.setState({ open: false,})

    setTimeout( () => {
        this.setState({ hidden: true})
    }, 750)
  }

  render() {
      const { classes, status } = this.props

      if (this.state.hidden) {
        return null
      }
      
      if (status === "CONFIRMED") {
        this.handleFadeOut()
      }

      let cNames = classNames({
          [classes.notificationSlider]: true,
          [classes.notificationSliderOpen]: this.state.open,
          [classes.notificationSliderClosed]: !this.state.open,
      })

      // TODO @Age
      let col
      switch(status) {
        case 'PENDING':
            col = '#FFA000'
            break
        case 'AWAITING':
            col = '#01579B'
            break
        case 'CONFIRMED':
            col = '#2E7D32'
            break
      }

      return(
        <section
            className={cNames}
            onClick={this.handleClick}
        >
          <section className={classes.notificationHeader}>
          <Typography variant='headline' align='center' style={{ color: '#202124'}}>
              {status}
          </Typography>
          </section>
          <section className={classes.contentContainer} style={{ color: col }}>
          { status === 'PENDING' &&
            <Sync
              style={{fontSize: 70}}
              className={classes.pending}
            />
          }

          { status === 'AWAITING' &&
              <div>
              <div className={classes.awaiting} style={{background: col}}></div>
              <div
                  className={classes.awaiting}
                  style={{
                    background: col,
                    animationDelay: '1s'
                  }}
              ></div>
              </div>
          }
          { status === 'CONFIRMED' &&
            <div>
              <div className={classes.sucessCircle} style={{borderColor: col}}>
                <div className={classes.confirmed} style={{borderColor: col}}></div>
              </div>
            </div>
          }
          </section>
        </section>
      )
  }
}

NotificationSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.number.isRequired,
}


export default withStyles(notificationStyle)(NotificationSlider)
