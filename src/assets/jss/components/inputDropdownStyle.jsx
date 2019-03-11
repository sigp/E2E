const inputDropdownStyle = theme => ({
  container: {
    width: '100%',
  },
  input: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    '@global': {
      input: {
        color: '#fff !important',
        overflowX: 'scroll',
      },
    },
  },
  dropdown: {
    color: '#fff !important',
    wordBreak: 'break-all !important',
    maxWidth: '95% !important',
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  singleValue: {
    fontSize: 16,
    maxWidth: '100%',
    wordBreak: 'break-all',
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  option: {
    color: '#000',
    '&:hover': {
        background: '#e1e2e1'
    }
  },
  '&#react-select-2-input': {
    maxWidth: '90%',
    wordBreak: 'break-all',
  }
})

export default inputDropdownStyle
