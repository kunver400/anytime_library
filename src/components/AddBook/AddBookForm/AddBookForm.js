import React from 'react';
import { Form, InputNumber, Button, Input } from 'antd';
import Auxi from '../../../hoc/Auxi/Auxi';
import classes from './AddBookForm.css';
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: { span: 0 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const AddBookForm = (props) => {
    const { getFieldDecorator } = props.form;

    return (
        <Form hideRequiredMark onSubmit={(e) => {
            e.preventDefault();
            props.form.validateFields((err, values) => {
                if (!err) {
                    props.handleSubmit({ ...values, date: Date() });
                }
            });
        }} className={classes.addBook_form}
            layout="inline">
            <Auxi>
                <FormItem
                    {...formItemLayout}
                    label="Title"
                >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Title of the book', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Author"
                >
                    {getFieldDecorator('author', {
                        rules: [{ required: true, message: 'Author of the book', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Description"
                >
                    {getFieldDecorator('desc', {
                        rules: [{ message: 'About the book', whitespace: true }],
                    })(
                        <TextArea rows={4} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="No of Books">
                    {getFieldDecorator('units', {
                        rules: [{ required: true, message: 'Should be number smaller then 4' }],
                        initialValue: 1
                    })(
                        <InputNumber
                            min={1}
                            max={100}
                            formatter={value => `${value} Unit(s)`}
                            parser={value => value.replace(' Unit(s)', '')}
                        />
                    )}
                </FormItem>
            </Auxi>
            <div style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </div>
        </Form>
    );
};

const WrappedAddBookForm = Form.create()(AddBookForm);

export default WrappedAddBookForm;