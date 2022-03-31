import React, { useState, useContext } from "react";
import { Card, Button, Typography, Avatar } from "antd";
import { IPLContext } from "../context/IPLContext";
import img from "../assets";
import MatchComponent from "../components/MatchComponent/MatchComponent";
import PointTable from "../components/PointComponent/PointComponent";
import FormComponent from "../components/FormComponent/FormComponent";

import "antd/dist/antd.css";
import "./Container.css";

const { Text, Title  } = Typography;
const tabList = [
  {
    key: "MATCHES",
    tab: "MATCHES",
  },
  {
    key: "TABLE",
    tab: "TABLE",
  },
];

const Container = () => {
  const [activeTabKey1, setActiveTabKey1] = useState("MATCHES");
  const { actions } = useContext(IPLContext)

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  const contentList = {
    MATCHES: <MatchComponent />,
    TABLE: <PointTable />,
  };

  return (
    <>
      <Card
        style={{ width: "100%" }}
        // title="Indian Premier League"
        title={
          <div style={{display: 'flex', alignItems: "center"}}>
            <Avatar shape="square" size={'meadium'} src={img.IPL} style={{marginRight: '10px'}}/>
            <Title level={5} style={{fontWeight: 700}}>INDIAN PREMIER LEAGUE</Title>
          </div>
        }
        extra={<Button type="primary" onClick={() => actions.handleReset()}>Reset</Button>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
        className="main-tap"
      >
        {contentList[activeTabKey1]}
      </Card>
      <FormComponent/>
    </>
  );
};

export default Container;
