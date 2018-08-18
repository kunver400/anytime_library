import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Axios from "axios";
import Auxi from "../../../hoc/Auxi/Auxi";
import firebase from "../../../firebase/config";
import classes from "./LoginForm.css";
const FormItem = Form.Item;


class LoginForm extends React.Component {
  setUserAndRedirect = (user) => {
      this.props.setUser(user);
      this.props.history.push("/");
      this.props.toggleModal(false);
  }
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          if (!err) {
              firebase.auth().signInWithEmailAndPassword(values.email, values.password).catch(function (error) {
                  console.log(error);
              });
          }
      });
  }
  validateUser = (email, idtoken) => {
      return new Promise((resolveP, rejectP) => {
          Axios.get("/user.json?auth=" + idtoken)
              .then(response => {
                  let user;
                  for (let key in response.data) {
                      if (email === response.data[key].email) {
                          user = response.data[key];
                          user["key"] = key;
                          user["token"] = idtoken;
                      }
                  }
                  resolveP({ user: user });
              })
              .catch(response => {
                  rejectP(response);
              });
      });
  }
  handleGoogleUser = () => {
      let _this = this;
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (result) {
          if (result.user) {
              result.user.getIdToken().then((idtoken) => {
                  _this.validateUser(result.user.email, idtoken)
                      .then(data => {
                          if (data.user) {
                              _this.setUserAndRedirect(data.user);
                          }
                          else {
                              let user = {
                                  nickname: result.user.displayName,
                                  email: result.user.email,
                                  phone: "NA",
                                  residence: "NA",
                                  website: "NA",
                                  isGoogled: true
                              };
                              Axios.post("user.json?auth=" + idtoken, user)
                                  .then(data => {
                                      user["token"] = idtoken;
                                      user["key"] = data.data.name;
                                      _this.setUserAndRedirect(user);
                                  })
                                  .catch(error => {
                                      console.log(error, "unable to create user.");
                                  });
                          }
                      })
                      .catch(response => {
                          console.log(response, "something went wrong.");
                      });
              });
          }

      }).catch(function (error) {
          console.log(error);
      });
  }
  componentDidMount = () => {
      let validateUser = this.validateUser;
      let setUserAndRedirect = this.setUserAndRedirect;
      firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
              user.getIdToken().then((idtoken) => {
                  validateUser(user.email, idtoken).then((data) => {
                      setUserAndRedirect(data.user);
                  });
              });
          } else {
              console.log("User Logged Out");
          }
      });
  }
  render() {
      const { getFieldDecorator } = this.props.form;
      return (
          <Form onSubmit={this.handleSubmit} className={classes.login_form}>
              <FormItem>
                  {getFieldDecorator("email", {
                      rules: [{ required: true, message: "Please input your email!" }],
                  })(
                      <Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Email" />
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator("password", {
                      rules: [{ required: true, message: "Please input your Password!" }],
                  })(
                      <Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Password" />
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator("remember", {
                      valuePropName: "checked",
                      initialValue: true,
                  })(
                      <Checkbox>Remember me</Checkbox>
                  )}
                  <a className={classes.login_form_forgot} href="">Forgot password</a>
                  <Button type="primary" htmlType="submit" className={classes.login_form_button}>
            Log in
                  </Button>
                  <Button type="primary" className={classes.login_form_gbutton} onClick={this.handleGoogleUser}>
                      <Auxi>Use <Icon type="google" />oogle</Auxi>
                  </Button>
              </FormItem>
          </Form>
      );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;