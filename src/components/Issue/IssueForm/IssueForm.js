import React from 'react';
import { Form, InputNumber, Button } from 'antd';
import classes from './IssueForm.css';
const FormItem = Form.Item;

const IssueForm = (props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      props.form.validateFields((err, values) => {
        if (!err) {
          props.handleSubmit(values.units);
        }
      });
    }} className={classes.issue_form}>
      <FormItem label={(props.selectedBook || { title: 'placeholder book' }).title}>
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
      <FormItem
          wrapperCol={{ span: 12, offset: 20 }}
        >
          <Button size='large' type="primary" htmlType="submit">Submit</Button>
        </FormItem>
    </Form>
  );
};

const WrappedIssueForm = Form.create()(IssueForm);

export default WrappedIssueForm;