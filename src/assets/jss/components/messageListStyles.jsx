const MessageListStyles = {
  topLine: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '@media(max-width: 600px)': {
    topLine: {
      flexWrap: 'wrap',
    },
  }

}

export default MessageListStyles
