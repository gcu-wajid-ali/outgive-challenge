import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Input, Switch, Row, Col } from "antd";
import { TITLE_VALIDATIONS } from "../../../constants/constants";

const DynamicFields: React.FC<any> = ({ subtasks, type }) => {

    return (
        <Form.List name="subtasks">
            {(fields, { add, remove }) => {
                return (
                    <div style={{ fontWeight: 'bold' }}>
                        {fields.map((field, index) => (
                            <div key={field.key}>
                                <Divider>Subtask # {index + 1}</Divider>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, "title"]}
                                            //@ts-ignore
                                            key={[field.name, "title"]}
                                            label="Title"
                                            rules={TITLE_VALIDATIONS}
                                        // initialValue=''
                                        >
                                            <Input disabled={type === 'view' ? true : false} placeholder="Please Enter subtask title" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, "completed"]}
                                            //@ts-ignore
                                            key={[field.name, "completed"]}
                                            label="Completed"
                                            valuePropName="checked"
                                            initialValue={false}
                                        >
                                            <Switch
                                                disabled={type === 'view' ? true : false}
                                                checkedChildren='Uncomplete'
                                                unCheckedChildren='complete'
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        {fields.length && type !== 'view' ? (
                                            <Button
                                                style={{ marginTop: '30px', borderRadius: '8px' }}
                                                type="primary" danger
                                                onClick={() => remove(field.name)}
                                                icon={<MinusCircleOutlined />}
                                            >
                                                Remove
                                            </Button>
                                        ) : null}
                                    </Col>
                                </Row>
                            </div>
                        ))}
                        <Divider />
                        {
                            type !== 'view' && (
                                <Form.Item>
                                    <Button
                                        type='primary'
                                        onClick={() => add()}
                                        style={{ width: "40%", borderRadius: '8px' }}
                                    >
                                        <PlusOutlined /> Add Subtask
                                    </Button>
                                </Form.Item>
                            )
                        }
                    </div>
                );
            }}
        </Form.List>
    );
}

export default DynamicFields;
