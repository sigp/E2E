import React from 'react'
import PropTypes from 'prop-types'
// Material core
import withStyles from "@material-ui/core/styles/withStyles";
import Contact from 'components/Contact/Contact.jsx'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import Delete from '@material-ui/icons/Delete'
// import Checkbox from '@material-ui/core/Checkbox';
// import Avatar from '@material-ui/core/Avatar';
import Blockies from 'react-blockies'

// TESTING
import Hidden from '@material-ui/core/Hidden'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  identicon: {
    textAlign: 'center',
  }
})

const ContactList = ({...props}) => {
  const { classes, contacts } = props

  let contactItems = (
    contacts.map((prop, key) => {
      return (
        <GridListTile key={prop.contactName}>
            <div className={classes.identicon}>
            <Hidden mdDown>
            <Blockies
              seed={prop.address.toLowerCase()}
              size={8}
              scale={80}
            />
            </Hidden>
            <Hidden lgUp>
            <Blockies
              seed={prop.address.toLowerCase()}
              size={8}
              scale={36}
            />
            </Hidden>
            </div>
          <GridListTileBar
            title={prop.contactName}
            subtitle={<span>{prop.address}</span>}
            actionIcon={
              <IconButton className={classes.icon}>
                <Delete />
              </IconButton>
            }
          />
        </GridListTile>
      )
    })
  )

//  let contactItems = (
//    contacts.map((prop, key) => {
//      return(
//        <ListItem key={key} button dense={false} divider={true} className={classes.listItem}>
//          <ListItemAvatar>
//            <Blockies
//              seed={prop.address.toLowerCase()}
//              size={8}
//            />
//          </ListItemAvatar>
//          <ListItemText
//            primary={prop.contactName}
//            secondary={prop.address}
//          />
//          <ListItemSecondaryAction>
//              <IconButton
//                tooltip="Delete Contact"
//                aria-label="Delete Contact"
//              >
//                  <Delete />
//              </IconButton>
//          </ListItemSecondaryAction>
//        </ListItem>
//
//      )
//      // return (
//      //   <Contact
//      //     contactName={prop.contactName}
//      //     address={prop.address}
//      //     pubkey={prop.pubkey}
//      //   />
//      // )
//    })
//  )
  return (
    <div className={classes.root}>
      <Hidden mdDown>
      <GridList cellHeight={250} cols={4} className={classes.gridList}>
          {contactItems}
      </GridList>
      </Hidden>
      <Hidden smDown lgUp>
      <GridList cellHeight={250} cols={3} className={classes.gridList}>
          {contactItems}
      </GridList>
      </Hidden>
      <Hidden mdUp xsDown>
      <GridList cellHeight={250} cols={2} className={classes.gridList}>
          {contactItems}
      </GridList>
      </Hidden>
      <Hidden smUp>
      <GridList cellHeight={250} cols={1} className={classes.gridList}>
          {contactItems}
      </GridList>
      </Hidden>
      
    </div>
  )
  // return (
  //   <div>
  //     <List>
  //     <Divider />
  //     {contactItems}
  //     </List>
  //   </div>
  // )
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
}

export default withStyles(styles)(ContactList)
