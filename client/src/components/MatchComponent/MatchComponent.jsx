import React, { useContext } from "react";
import { Badge, Button, Card, Col, Row } from "antd";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IPLContext } from "../../context/IPLContext";
import "./MatchComponent.css";
import img from "../../assets";
import { Typography, Space } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Text, Link } = Typography;

const MatchComponent = () => {
  const { state, actions } = useContext(IPLContext)

  const matchPlayed = Object.keys(state.matchSchedule.data).map(v => state.matchSchedule.data[v]).find(({matchPlayed}) => matchPlayed === false)
  console.log("state", matchPlayed)

  const findWonTeam = (data) => {
    if(data.teamOneRuns > data.teamTwoRuns) {
      return `${data.teamOneName} Won`
    }else if(data.teamOneRuns < data.teamTwoRuns) {
      return `${data.teamTwoName} Won`
    }else if(data.teamOneRuns == data.teamTwoRuns) {
      return `Match Tied`
    }
  }

  const showModal = (data) => {
    actions.setFormId(prev => ({
      matchId: data.id,
      teams: [data.teamOneName, data.teamTwoName]
    }))
    actions.setFormPopupOpen(true);
  };

  return (
    <div className="site-card-wrapper">
      <Row gutter={[8, 8]}>
        {Boolean(Object.keys(state.matchSchedule.data).length) && Object.keys(state.matchSchedule.data).map((v, i) => {
          const data = state.matchSchedule.data[v]
          return(
            <Col span={12} key={i}>
            <Card
              className="scheduled-card"
              actions={[
                // data.matchPlayed ? <span>{findWonTeam(data)}</span> : (Boolean(matchPlayed) && matchPlayed.id == v) ? <EditOutlined key="edit" onClick={() => showModal(data)}/> : <span>Not Yet Played</span>
                data.matchPlayed ? <span>{findWonTeam(data)}</span> : (Boolean(matchPlayed) && matchPlayed.id == v) ? <Button type="primary" onClick={() => showModal(data)} >Update score</Button> : <span>Not Yet Played</span>
                //  <EditOutlined key="edit" onClick={() => showModal(data)}/> 
              ]}
              bordered={true}
            >
                    <div style={{textAlign:'center'}}><Text style={{fontSize: '13px'}} strong>MATCH {v}</Text></div>
                  <ScheduleCard data={data}/>
            </Card>
          </Col>
          )
        })}
      </Row>
    </div>
  );
};

const ScheduleCard = ({data}) => {
  return (
    <div>
      <div className="mb-1 card-content-main">
        <div className="card-content-main">
          <Avatar
            shape="square"
            size="large"
            className="mr-1"
            src={img[data.teamOneName]}
          />
          <Text strong>{data.teamOneName}</Text>
        </div>
        <div>
          { Boolean(data.teamOneRuns) && <Text strong>{data.teamOneRuns}({data.teamOneOver})</Text> }
        </div>
      </div>
      <div className="card-content-main">
        <div className="card-content-main mr-1">
          <Avatar
            shape="square"
            size="large"
            className="mr-1"
            src={img[data.teamTwoName]}
          />
          <Text strong>{data.teamTwoName}</Text>
        </div>
        <div>
        { Boolean(data.teamTwoRuns) && <Text strong>{data.teamTwoRuns}({data.teamTwoOver})</Text> }

        </div>
      </div>
    </div>
  );
};

export default MatchComponent;
