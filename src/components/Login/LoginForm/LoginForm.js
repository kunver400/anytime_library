import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import GoogleLogin from 'react-google-login';
import Axios from 'axios';
import Auxi from '../../../hoc/Auxi/Auxi';
import classes from './LoginForm.css';
const FormItem = Form.Item;

class LoginForm extends React.Component {
  setUserAndRedirect = (user) => {
    this.props.setUser(user);
    this.props.history.push('/');
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.validateUser(values.nickname, values.password)
          .then(response => {
            if (response.user) {
              this.setUserAndRedirect(response.user);
              this.props.toggleModal(false);
            }
          })
          .catch(response => {
            console.log(response, 'something went wrong.');
          })
      }
    });
  }
  validateUser = (nickname, password) => {
    return new Promise((resolveP, rejectP) => {
      Axios.get('/user.json')
        .then(response => {
          let user;
          for (let key in response.data) {
            if (nickname === response.data[key].nickname && password === response.data[key].password) {
              user = response.data[key];
              user['key'] = key;
            }
          }
          resolveP({ user: user });
        })
        .catch(response => {
          rejectP(response);
        })
    });
  }
  handleGoogleUser = (response) => {
    this.validateUser(response.profileObj.givenName, response.profileObj.googleId)
      .then(data => {
        if (data.user) {
          this.setUserAndRedirect(data.user);
          this.props.toggleModal(false);
        }
        else {
          let user = {
            nickname: response.profileObj.givenName,
            email: response.profileObj.email,
            password: response.profileObj.googleId,
            phone: 'NA',
            residence: 'NA',
            website: 'NA',
            isGoogled: true
          };
          Axios.post('user.json', user)
            .then(response => {
              this.setUserAndRedirect(user);
              this.props.toggleModal(false);
            })
            .catch(error => {
              console.log(error, 'unable to create user.');
            });
        }
      })
      .catch(response => {
        console.log(response, 'something went wrong.');
      })


  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={classes.login_form}>
        <FormItem>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nickname" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className={classes.login_form_forgot} href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className={classes.login_form_button}>
            Log in
          </Button>
          <GoogleLogin className={[classes.login_form_button, classes.login_form_gbutton].join(' ')}
            clientId="313435702070-h0c4eqgonsdjmi65tn3ghmihgje9lpja.apps.googleusercontent.com"
            buttonText={<Auxi>Use <Icon type="google" />oogle</Auxi>}
            onSuccess={this.handleGoogleUser}
            onFailure={(r) => { console.log(r, 'something went wrong') }}
          />
        </FormItem>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;