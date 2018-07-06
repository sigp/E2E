import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from '@material-ui/core/Hidden'
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from "components/TextFields/MultiLineText.jsx"
import MessageList from 'components/Messages/MessageList.jsx'
import messagesStyle from 'assets/jss/layouts/messagesStyle.jsx'

const MessagesPage = (props) => {
  const { classes } = props;

  const fakeMessages = [

    {
        sender: 'Miriam	Holmes',
        address: '0x0000000000000000000000000000000000000000',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e9f78a987afr9f879f8b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        sender: 'Tony Wallace',
        address: '0x0000000000000000000000000000000000000001',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e109238012983091832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },

    {
        sender: 'Thomas Sellino',
        address: '0x1337000000000000000000000000000000133121',
        message: 'hey this is a thing'
    },
    {
        sender: 'Reginald Howdecker',
        address: '0x0000000000000000000000000000000000000002',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e712983719823791832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        sender: 'Miriam	Holmes',
        address: '0x0000000000000000000000000000000000000000',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e9f78a987afr9f879f8b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        sender: 'Tony Wallace',
        address: '0x0000000000000000000000000000000000000001',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e109238012983091832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },

    {
        sender: 'Thomas Sellino',
        address: '0x1337000000000000000000000000000000133121',
        message: 'hey this is a thing'
    },
    {
        sender: '0x0000000000000000000000000000000000000002',
        address: '0x0000000000000000000000000000000000000002',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e712983719823791832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        sender: 'Miriam	Holmes',
        address: '0x0000000000000000000000000000000000000000',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e9f78a987afr9f879f8b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        sender: 'Tony Wallace',
        address: '0x0000000000000000000000000000000000000001',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e109238012983091832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        sender: 'Reginald Howdecker',
        address: '0x0000000000000000000000000000000000000002',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e712983719823791832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        sender: '0x1982739817e91237b1923b912739123190000001',
        address: '0x0000000000000000000000000000000000000000',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e9f78a987afr9f879f8b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        sender: '0x0000000000000000000000000000000000000001',
        address: '0x0000000000000000000000000000000000000001',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e109238012983091832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },

    {
        sender: 'Thomas Sellino',
        address: '0x1337000000000000000000000000000000133121',
        message: 'hey this is a thing'
    },
    {
        sender: 'Reginald Howdecker',
        address: '0x0000000000000000000000000000000000000002',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e712983719823791832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        sender: 'Miriam	Holmes',
        address: '0x0000000000000000000000000000000000000000',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e9f78a987afr9f879f8b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        sender: 'Tony Wallace',
        address: '0x0000000000000000000000000000000000000001',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e109238012983091832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        sender: 'Reginald Howdecker',
        address: '0x0000000000000000000000000000000000000002',
        message: '0xa9f8be7e987fbe987baaf9a798ea7b98ae7b987e712983719823791832b798fd7be9879e879e87b98e7b98e7897e98f79f8798a'
    },
    {
        sender: 'Thomas Sellino',
        address: '0x1337000000000000000000000000000000133121',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus eleifend diam. Proin mollis ipsum a nibh eleifend, sed hendrerit odio ullamcorper. Aenean pulvinar a diam in auctor. Aenean aliquet mauris in euismod consequat. Donec posuere auctor sem. Donec ultrices, erat a venenatis laoreet, leo enim viverra libero, nec gravida tellus magna eget augue. Mauris tellus velit, euismod id tempus et, auctor sed ipsum. Quisque congue quis libero nec tempus. Praesent ac faucibus lacus, sit amet sagittis enim. Maecenas nec consectetur tortor. Pellentesque aliquet dapibus nisi, lacinia sodales leo tempor sed. Aliquam a ipsum tincidunt, commodo eros non, egestas nibh. Curabitur aliquam libero at arcu varius ultrices.'
    }
  ]
  return (
    <div>
      <Hidden xsDown>
      <Card className={classes.card}>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Messages</h4>
        </CardHeader>
        <CardBody >
          <MessageList
            messages={fakeMessages}
          />
        </CardBody>
      </Card>
    </Hidden>
    <Hidden smUp>
          <div className={classes.smallBody}>
            <MessageList
              messages={fakeMessages}
            />
          </div>
    </Hidden>
  </div>
  );
}

export default withStyles(messagesStyle)(MessagesPage);
