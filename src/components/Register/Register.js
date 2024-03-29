import React from "react"
import "../SignIn/Siginin.css"
import LoadingScreen from "react-loading-screen"

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      name: "",
      loading: false,
    }
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value.toLowerCase() })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onSubmitSignIn = () => {
    this.setState({ loading: true })
    fetch("https://smart-brain-api-tjrellys-projects.vercel.app/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange("home")
        }
        this.setState({ loading: false })
      })
  }

  onFormSubmit = (event) => {
    event.preventDefault()
    this.onSubmitSignIn()
  }

  render() {
    const { onRouteChange } = this.props
    return (
      <LoadingScreen
        loading={this.state.loading}
        bgColor="transparent"
        spinnerColor="#ffffff"
        textColor="#ffffff"
        logoSrc=""
        text="Loading your content..."
      >
        <form
          onSubmit={this.onFormSubmit}
          id="signin-form"
          className="bg-grey-lighter flex flex-col sm:w-full h-auto m-auto"
        >
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="px-6 py-8 rounded shadow-xl text-black w-full backdrop-blur-sm">
              <h1 className="text-white mb-8 text-3xl text-center">
                Create Account
              </h1>

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="user-id"
                placeholder="Name"
                onChange={this.onNameChange}
              />

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                onChange={this.onEmailChange}
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                onChange={this.onPasswordChange}
              />

              <button
                id="submit-form"
                type="submit"
                className="white w-full text-center py-3 rounded bg-blue-600 text-gray-800 hover:text-white focus:text-white hover:bg-green-dark focus:outline-none my-1"
              >
                {this.state.loading ? <>Signing in . . .</> : <>Sign up</>}
              </button>
              <p className="development"> - Thank you for trying our app! - </p>
            </div>

            <div className="text-grey-dark mt-6 bg-white px-2 py-5 rounded-lg shadow-md text-black w-full">
              Already have an account?
              <button
                className="text-lg no-underline border-b text-blue-700 transition duration-200 hover:border-blue-700 text-blue ml-2"
                href="../login/"
                onClick={() => onRouteChange("signin")}
              >
                Log in.
              </button>
            </div>
          </div>
        </form>
      </LoadingScreen>
    )
  }
}

export default Register
