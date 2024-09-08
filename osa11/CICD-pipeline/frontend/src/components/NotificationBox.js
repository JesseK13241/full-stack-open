const NotificationBox = ({ message }) => {
  if (message === null || message === "") {
    return null
  }

  const notificationStyle = {
    color: "green",
    background: "lightGrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message.startsWith("ERROR")) {
    notificationStyle.color = "red"
  }

  return <div style={notificationStyle}>{message}</div>
}

export default NotificationBox
