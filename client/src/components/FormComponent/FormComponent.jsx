import React, { useState, useContext } from "react";
import { Modal, Button } from "antd";
import { Form, Row, Col, Input, Typography } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./FormComponent.css";
import { IPLContext } from "../../context/IPLContext";
import img from "../../assets";

const { Title } = Typography;
const FormComponent = () => {
  const { state, actions } = useContext(IPLContext);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      actions.setFormId({ matchId: null, teams: [] });
      actions.setFormPopupOpen(false);
      setLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    actions.setFormId({ matchId: null, teams: [] });
    actions.setFormPopupOpen(false);
  };

  return (
    <>
      <Modal visible={state.formPopupOpen} closable={false} footer={null}>
        <MatchResultForm
          handleCancel={handleCancel}
          loading={loading}
          handleOk={handleOk}
          state={state}
          actions={actions}
        />
      </Modal>
    </>
  );
};

const MatchResultForm = ({
  state,
  actions,
  handleCancel,
  loading,
  handleOk,
}) => {
  const [form] = Form.useForm();

  const getFields = (teams) => {
    return (
      <>
        <Col span={12} className="fullwidth">
          <Form.Item
            name={`teamOneRuns`}
            label={`Runs`}
            rules={[
              { required: true, message: `Please input ${teams[0]} runs` },
            ]}
          >
            <Input max={300} type={"number"} placeholder="Enter Runs" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={`teamTwoRuns`}
            label={`Runs`}
            rules={[
              { required: true, message: `Please input ${teams[1]} runs` }
            ]}
          >
            <Input max={300} type={"number"} placeholder="Enter Runs" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={`teamOneOver`}
            label={`Over Faced`}
            rules={[
              {
                required: true,
                message: `Please input Over faced by ${teams[0]}`,
              },
              {
                pattern: /^[0-9]+(\.(50*|[0-4][0-9]*))?$/,
                message: `Password Pattern`,
              },
            ]}
          >
            <Input max={20} placeholder="Enter over" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={`teamTwoOver`}
            label={`Over Faced`}
            rules={[
              {
                required: true,
                message: `Please input Over faced by ${teams[1]}`,
              },
              {
                pattern: /^[0-9]+(\.(50*|[0-4][0-9]*))?$/,
                message: `Password Pattern`,
              },
            ]}
          >
            <Input  max={20} placeholder="Enter over" />
          </Form.Item>
        </Col>
      </>
    );
  };

  const onFinish = async(values) => {
    console.log("Received values of form: ", values);
    await actions.handleUpdate(state.formId.matchId, values)
    actions.setFormPopupOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{textAlign: 'center'}}>
          <Avatar
            shape="square"
            size={64}
            src={state.formId.teams.length > 0 && img[state.formId.teams[0]]}
          />
        <Title style={{fontWeight: 700}} level={5}>{state.formId.teams[0]}</Title>
        </div>
        <div style={{textAlign: 'center'}}>
            <Title style={{fontWeight: 700}} level={5}>MATCH NO: {state.formId.matchId}</Title>
            {/* <Title style={{fontWeight: 700}} level={5}>vs</Title> */}
            <Avatar size={60} src={img["VS"]}></Avatar>
        </div>
        <div style={{textAlign: 'center'}}>
          <Avatar
            shape="square"
            size={64}
            src={state.formId.teams.length > 0 && img[state.formId.teams[1]]}
          />
        <Title style={{fontWeight: 700}} level={5}>{state.formId.teams[1]}</Title>
        </div>
      </div>
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
        // onFinish={handleOk}
      >
        <Row gutter={24}>{getFields(state.formId.teams)}</Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button
              key="back"
              style={{ marginRight: "10px" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FormComponent;
