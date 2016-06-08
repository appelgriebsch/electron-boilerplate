// @flow
export const winIconStyle = {
  width: '10px',
  height: '10px',
  paddingLeft: '5px',
  ':hover': {
    opacity: 100
  }
};

export const winButtonStyle = {
  base: {
    height: '24px',
    width: '24px',
    borderRadius: '10%',
    marginTop: 0,
    marginBottom: 0,
    minWidth: 0,
    lineHeight: '30px',
    padding: '8px',
    ':active': {
      backgroundColor: 'rgba(255, 255, 255, .23)'
    },
    ':hover': {
      transition: 'background-color 0.1s',
      backgroundColor: 'rgba(255, 255, 255, .13)'
    }
  },
  close: {
    ':active': {
      backgroundColor: '#f1707a'
    },
    ':hover': {
      transition: 'background-color 0.1s',
      backgroundColor: '#e81123'
    }
  }
};

export const osxIconStyle = {
  opacity: 0,
  width: '6px',
  height: '6px',
  marginTop: '2px',
  marginLeft: '2px',
  ':hover': {
    opacity: 100
  }
};

export const osxButtonStyle = {
  base: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    marginBottom: '0.5px',
    marginLeft: '4px',
    marginRight: '4px',
    lineHeight: 0
  },
  close: {
    backgroundColor: '#ff5f57',
    borderColor: '#e2463f',
    ':active': {
      backgroundColor: '#bf4943',
      borderColor: '#ad3934'
    }
  },
  minimize: {
    backgroundColor: '#ffbd2e',
    borderColor: '#e1a116',
    ':active': {
      backgroundColor: '#bf9123',
      borderColor: '#ad7d15'
    }
  },
  maximize: {
    backgroundColor: '#28c940',
    borderColor: '#12ac28',
    ':active': {
      backgroundcolor: '#1f9a31',
      borderColor: '#128622'
    }
  }
};
