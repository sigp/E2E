const MessageListStyles = {
  topLine: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  dialogMessageBody: {
    padding: '30px',
  },
  '@media(max-width: 600px)': {
    topLine: {
      flexWrap: 'wrap',
    },
  }

}

export default MessageListStyles
