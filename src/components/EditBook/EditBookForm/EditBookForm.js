import React from "react";
import { Form, InputNumber, Button, Input, Icon, Upload, message } from "antd";
import moment from "moment";
import classes from "./EditBookForm.css";
const FormItem = Form.Item;
const { TextArea } = Input;
const { Dragger } = Upload;
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
let coverImage;
let fileList = [];
const EditBookForm = (props) => {
    coverImage = props.book.cover;
    const { getFieldDecorator } = props.form;
    const UploadProps = {
        name: "file",
        multiple: false,
        beforeUpload: (file) => {
            const isJPG = file.type === "image/jpeg";
            if (!isJPG) {
                message.error("You can only upload JPG file!");
            }
            const isLt2M = file.size / 1024 / 1024 < 0.5;
            if (!isLt2M) {
                message.error("Image must smaller than 0.5MB!");
            }
            let fr = new FileReader();
            fr.onloadend = () =>{
                coverImage = fr.result;
            };
            fr.readAsDataURL(file);
            return false;
        },
        onChange: (info) => {
            fileList = info.fileList.slice(-1);
        
        }
    };

    return (
        <Form hideRequiredMark onSubmit={(e) => {
            e.preventDefault();
            props.form.validateFields((err, values) => {
                if (!err) {
                    props.handleSubmit({ ...values, date: moment(), cover: coverImage });
                    props.form.resetFields();
                }
            });
        }} className={classes.editBook_form}
        layout="inline">
            <React.Fragment>
                <FormItem
                    {...formItemLayout}
                    label="Title"
                >
                    {getFieldDecorator("title", {
                        rules: [{ required: true, message: "Title of the book", whitespace: true }],
                        initialValue: props.book.title
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Author"
                >
                    {getFieldDecorator("author", {
                        rules: [{ required: true, message: "Author of the book", whitespace: true }],
                        initialValue: props.book.author
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Description"
                >
                    {getFieldDecorator("desc", {
                        rules: [{ message: "About the book", whitespace: true }],
                        initialValue: props.book.desc
                    })(
                        <TextArea rows={4} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Cover"
                >
                    {getFieldDecorator("cover", {
                    })(
                        <Dragger {...UploadProps} fileList={fileList}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox"/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">select to replace existing cover.</p>
                        </Dragger>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="No of Books">
                    {getFieldDecorator("units", {
                        rules: [{ required: true, message: "Should be number smaller then 4" }],
                        initialValue: props.book.availablity
                    })(
                        <InputNumber
                            min={1}
                            max={100}
                            formatter={value => `${value} Unit(s)`}
                            parser={value => value.replace(" Unit(s)", "")}
                        />
                    )}
                </FormItem>
            </React.Fragment>
            <div style={{ textAlign: "center" }}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </div>
        </Form>
    );
};

const WrappedEditBookForm = Form.create()(EditBookForm);

export default WrappedEditBookForm;