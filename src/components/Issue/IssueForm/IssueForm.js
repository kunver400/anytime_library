import React from 'react';
import { Form, InputNumber, Button } from 'antd';
import classes from './IssueForm.css';
const FormItem = Form.Item;

const IssueForm = (props) => {
  const { getFieldDecorator } = props.form;
  const BookItem_s = props.selectedBook?(
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
  ):props.selectedBooks && (
    props.selectedBooks.map((book, index)=>
      <FormItem label={(book || { title: 'placeholder book' }).title} key={index}>
      {getFieldDecorator('units+'+index, {
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
    )
  )

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      props.form.validateFields((err, values) => {
        if (!err) {
          if(props.selectedBook) 
          props.handleSubmit(values.units);
          else {
            let units = [];
            for (let key in values) {
              key.startsWith('units') && units.push(values[key])
            }
            props.handleSubmit(units);
          }
        }
      });
    }} className={classes.issue_form}>
      {BookItem_s}
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