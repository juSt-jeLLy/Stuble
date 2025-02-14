import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

class Piechart extends React.Component {
  COLORS = ["#8884d8", "#82ca9d", "#FFBB28"];
  pieData = [
    {
      name: "Stalk and Straw",
      value: 54.75
    },
    {
      name: "Chaff Waste",
      value: 30.15
    },
    {
      name: "Bran Waste",
      value: 14.9
    }
  ];
  CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "5px",
            border: "1px solid #ccc"
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }
    return null;
  };
  render() {
    return (
      <PieChart width={300} height={300}>
        <Pie
          data={this.pieData}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {this.pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={this.COLORS[index % this.COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip content={<this.CustomTooltip />} />
        <Legend />
      </PieChart>
    );
  }
}
export default Piechart;
