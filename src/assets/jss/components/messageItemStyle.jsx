const messageItemStyle = theme =>  ({
    messageContainer: {
        padding: '10px',
        borderBottom: '1px solid ' + theme.palette.primary[50],
        display: 'block',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
        // lol this shadow
        "&:hover": {
          cursor: 'pointer',
          //backgroundColor: theme.palette.primary[50],
          //opacity: 0.8,
        }
        /*
        '&:hover': {
            cursor: 'pointer',
            background: theme.palette.secondary['300'] //'#f5f5f5',
        
        },
        */
    },
    messageSender: {
        fontWeight: 'bold',
        marginBottom: '5px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        wordWrap: 'normal',
        color: theme.palette.text.primary
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
        maxHeight: '1000px',
        color: theme.palette.text.secondary, //'#1e212b',
        fontWeight: '200',
        overflow: 'hidden',
        transition: 'all 0.4s linear',
    },
    contentOpen: {
        boxShadow:
            `0 7px 2px -12px ${theme.palette.primary[100]}, 0 4px 20px 0 ${theme.palette.shadows},  0 7px 8px -5px ${theme.palette.primary[200]}`,
        marginBottom: '10px',
    },
    contentClosed: {
        maxHeight: '25px',
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
})

export default messageItemStyle
