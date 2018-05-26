import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Axios from 'axios';
import classes from './LoginForm.css';
const FormItem = Form.Item;

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Axios.get('/user.json')
          .then(response => {
            let user;
            for (let key in response.data) {
              if (values.nickname === response.data[key].nickname && values.password === response.data[key].password) {
                user = response.data[key];
                user['key'] = key;
              }
            }
            if(user) {
              this.props.setUser(user);
              this.props.toggleModal(false);
            }
          })
          .catch(response => {
            console.log(response);
          })
      }
    });
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
        </FormItem>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;