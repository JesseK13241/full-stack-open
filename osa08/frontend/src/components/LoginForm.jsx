import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('BookApp-user-token', token)
      localStorage.setItem('BookApp-username', username)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])


  const submit = async event => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setError: PropTypes.func,
  setToken: PropTypes.func,
  setUsername: PropTypes.func
}

export default LoginForm
