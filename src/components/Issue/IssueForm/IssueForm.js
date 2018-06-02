import React from 'react';
import { Form, InputNumber, Button, DatePicker } from 'antd';
import moment from 'moment';
import Auxi from '../../../hoc/Auxi/Auxi';
import classes from './IssueForm.css';
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
  },
  wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
  },
};
const IssueForm = (props) => {
  const { getFieldDecorator } = props.form;
  const BookItem_s = props.selectedBook ? (
    <Auxi>
      <FormItem label={(props.selectedBook || { title: 'placeholder book' }).title}>
        {getFieldDecorator('units', {
          rules: [{ required: true, message: 'Should be number smaller then 4' }],
          initialValue: 1
        })(
          <InputNumber
            // size='large'
            min={1}
            max={3}
            formatter={value => `${value} Unit(s)`}
            parser={value => value.replace(' Unit(s)', '')}
          />
        )}
        <FormItem style={{ width: '115px', marginLeft: '15px' }}>
          {getFieldDecorator('date', {
            rules: [{ required: true }],
            initialValue: moment().add(2, 'days')
          })(
            <DatePicker onChange={(d, ds) => { console.log(d, ds) }} />)}
        </FormItem>
      </FormItem>
    </Auxi>
  ) : (
      <Auxi>
        {
          props.selectedBooks.map((book, index) =>
            <FormItem label={book.title} key={index} {...formItemLayout} style={{marginBottom: 20}}>
              {getFieldDecorator('units+' + index, {
                rules: [{ required: true, message: 'Should be number smaller then 4' }],
                initialValue: 1
              })(
                <InputNumber
                  // size='large'
                  min={1}
                  max={3}
                  formatter={value => `${value} Unit(s)`}
                  parser={value => value.replace(' Unit(s)', '')}
                />
              )}
              <FormItem style={{ width: '115px', marginLeft: '15px' }}>
                {getFieldDecorator('date'+index, {
                  rules: [{ required: true }],
                  initialValue: moment().add(2, 'days')
                })(
                  <DatePicker onChange={(d, ds) => { console.log(d, ds) }} />)}
              </FormItem>
            </FormItem>
          )}
      </Auxi>
    )

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      props.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          if (props.selectedBook)
            props.handleSubmit({units:values.units, rdate: values.date});
          else {
            let units = [],rdates=[];
            for (let key in values) {
              key.startsWith('units') && units.push(values[key])
              key.startsWith('date') && rdates.push(values[key])
            }
            units = units.map((unit, index) => {
              return {
                ...props.selectedBooks[index],
                units: unit,
                rdate: rdates[index]
              }
            })
            props.handleSubmit(null, units);
          }
        }
      });
    }} className={classes.issue_form}
      layout="inline">
      {BookItem_s}
      <div style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit">Submit</Button>
      </div>
    </Form>
  );
};

const WrappedIssueForm = Form.create()(IssueForm);

export default WrappedIssueForm;