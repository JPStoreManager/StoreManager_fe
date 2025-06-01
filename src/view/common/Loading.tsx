import React from "react";
import { Spin } from "antd";

const SpinnerLoading: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",        
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default SpinnerLoading;
