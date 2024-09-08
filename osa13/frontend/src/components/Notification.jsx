import PropTypes from 'prop-types'

function Notification({ message }) {
  if (message === null || message === '') {
    return null
  }

  const notificationStyle = {
    color: 'green',
    background: 'lightGrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message.startsWith('ERROR')) {
    notificationStyle.color = 'red'
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Notification
