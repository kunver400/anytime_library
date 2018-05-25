import React from 'react';
import { Form, Icon, InputNumber, Button, Checkbox } from 'antd';
import Axios from 'axios';
import classes from './IssueForm.css';
const FormItem = Form.Item;

class IssueForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Axios.get('/user.json')
          .then(response => {
            let user;
            for (let key in response.data) {
              if (values.units === response.data[key].units && values.password === response.data[key].password) {
                user = response.data[key];
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
      <Form onSubmit={this.handleSubmit} className={classes.issue_form}>
        <FormItem label={(this.props.selectedBook||{title: 'placeholder book'}).title}>
          {getFieldDecorator('units', {
            rules: [{ required: true, message: 'Should be number smaller then 4' }],
            initialValue: 1
          })(
            <InputNumber
            size='large'
            min={1}
            max={3}
            formatter={value => `${value} Unit(s)`}
            parser={value => value.replace(' Unit(s)', '')}
          />
          )}
        </FormItem>
      </Form>
    );
  }
}

const WrappedIssueForm = Form.create()(IssueForm);

export default WrappedIssueForm;