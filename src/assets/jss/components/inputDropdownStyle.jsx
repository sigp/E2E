const inputDropdownStyle = theme => ({
  input: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',

    '@global': {
      input: {
        color: '#fff !important',
      },
    },
  },
  dropdown: {
    color: '#fff !important',
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  singleValue: {
    fontSize: 16,
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
  }
})

export default inputDropdownStyle
