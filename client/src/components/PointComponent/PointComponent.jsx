import React, { useContext } from "react";
import { Table, Tag, Radio, Space, Avatar, Badge } from "antd";
import { Typography } from "antd";
import { IPLContext } from "../../context/IPLContext";
import img from "../../assets/index";
import "./PointComponent.css";

const { Text } = Typography;
const columns = [
  {
    title: "Team",
    dataIndex: "team",
    key: "team",
    // render: (text) => <a>{text}</a>,
    render: (team) => (
      <div style={{ display: "flex", alignItems: 'center' }}>
        <Avatar
          shape="square"
          size="small"
          src={img[team]}
          style={{ marginRight: "10px" }}
        />
        <div>
          <Text strong>{team}</Text>
        </div>
      </div>
    ),
  },
  {
    title: "Match",
    dataIndex: "match",
    key: "match",
  },
  {
    title: "Win",
    dataIndex: "win",
    key: "win",
  },
  {
    title: "NRR",
    key: "nrr",
    dataIndex: "nrr",
  },
  {
    title: "Pts",
    dataIndex: "pts",
    key: "pts",
    // render: (tags) => (
    //   <div style={{ display: "flex", justifyContent: "space-between" }}>
    //     <div>
    //       <Text strong>{tags}</Text>
    //     </div>
    //     <Tag color={"green"}>Q</Tag>
    //   </div>
    // ),
  },
  {
    title: "Playoff",
    dataIndex: "tag",
    key: "tag",
    render: (tag) => (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
       { tag ? <Tag color={"green"}>Q</Tag> : <Tag color={"warning"}>N</Tag> }
      </div>
    ),
  },
];

const PointTable = () => {
  const { state } = useContext(IPLContext);
  const sortArray = (data) => {
    
  }
  return (
    <div>
      {Object.keys(state.pointTable.data).length && (
        <Table columns={columns} dataSource={Object.keys(state.pointTable.data).map((v, i) => {
            const pointData = state.pointTable.data[v]
            return {
              key: pointData.id,
              team: pointData.teamName,
              match: pointData.matchPlayed,
              win: pointData.matchWoned,
              nrr: (pointData.NRR).toFixed(3),
              pts: pointData.Pts,
              tag: false ? "Q" : false,
            }
        }).sort((a,b) => {
          if(Number(a.pts) == Number(b.pts)) {
            return (Number(a.nrr) > Number(b.nrr)) ? -1 : (Number(a.nrr) < Number(b.nrr)) ? 1 : 0
          }else {
            return Number(a.pts) > Number(b.pts) ? -1 : 1
          }
        })} pagination={false} />
      )}
    </div>
  );
};

export default PointTable;
