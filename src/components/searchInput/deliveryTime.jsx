import React from "react";
import { Select } from "antd";
const { Option } = Select;
export default function DeliveryTime({ delivery, deliveryChange }) {
  return (
    <Select
      mode="multiple"
      allowClear={true}
      placeholder="Delivery Time"
      style={{ width: "100%" }}
      onChange={deliveryChange}
    >
      {delivery
        ? delivery.map((item, index) => (
            <Option key={index} value={`${item}`}>
              {item}
            </Option>
          ))
        : []}
    </Select>
  );
}
