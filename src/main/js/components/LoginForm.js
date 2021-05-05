import axios from "axios";
import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import UserStore from "../stores/UserStore";
import Header from "./Header";
import Calendar from "../Calendar";
import { result } from "lodash";
import App from "../App"; 
import ReactDOM from 'react-dom'; 
import { withRouter } from 'react-router'


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      buttonDisabled: false,
    };
  }

  setInputValue(property, value) {
    value = value.trim();
    if (value.length > 25) {
      return;
    }
    this.setState({
      [property]: value,
    });
  }

  resetForm() {
    this.setState({
      email: "",
      password: "",
      buttonDisabled: false,
    });
  }

  componentWillUnmount() {//from Stackoverflow to fix a warning
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback)=>{
        return;
    };
}
  showCalendar() {
    const { history: { push } } = this.props;
    push('/calendar');
}

  doLogin() {
    if (!this.state.email) {
      console.log("'Email' darf nicht leer sein");
      return;
    }
    if (!this.state.password) {
      console.log("'Passwort' darf nicht leer sein");
      return;
    }
    this.setState({
      buttonDisabled: true,
    });
    axios
      .post(
        "http://localhost:8080/api/login",
        {
          userEmail: this.state.email,
          userPassword: this.state.password,
        },
        {
          withCredentials: true, //ein Cookie wird gesetzt
        }
      )
      .then((response) => {
        if (response.data != -1) {
          console.log("login erfolgreich", response);
          UserStore.isLoggedIn = true;
          UserStore.id = response.data; //current user id wird zugewiesen
          UserStore.email = this.state.email;
          console.log("current_user_id: " + UserStore.id);
          this.resetForm();
          this.showCalendar();
        } else {
          console.log("login fehlgeschlagen", response);
          this.resetForm();
        }
      })
      .catch((error) => {
        console.log("API-Call fehlgeschlagen", error);
        this.resetForm();
      });
  }

  render() {
    return (
      <div className="loginForm">
        <Header name="Login" />
        <InputField
          type="email"
          placeholder="Email"
          value={this.state.email ? this.state.email : ""}
          onChange={(value) => this.setInputValue("email", value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={this.state.password ? this.state.password : ""}
          onChange={(value) => this.setInputValue("password", value)}
        />
        <SubmitButton
          text="Login"
          disabled={this.state.buttonDisabled}
          onClick={() => this.doLogin()}
        />
    
      </div>
    );
  }
}
export default withRouter(LoginForm);