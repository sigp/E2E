const messageItemStyle = {
    messageContainer: {
      padding: '10px',
      borderBottom: '1px solid #eee',
      display: 'block',
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box'
    },
    messageSender: {
      fontWeight: 'bold',
      marginBottom: '5px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      wordWrap: 'normal',
    },
    icon: {
      width: '5%',
      minWidth: '40px',
      boxSizing: 'border-box',
      margin: '0 20px 0 10px',
      display: 'inline-block',
      verticalAlign: 'top',
    },
    messageRight: {
      width: '70%',
      display: 'inline-block',
      wordWrap: 'break-word',
    },
    messageContent: {
      color: '#1e212b',
      fontWeight: '200',
      transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
    },
    contentClosed: {
      height: '20px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '@media (max-width: 350px)': {
      icon: {
        margin: '0',
      }
    },
    '@media (min-width: 583px)': {
      messageRight: {
        width: '85%',
      }
    }
}

export default messageItemStyle
