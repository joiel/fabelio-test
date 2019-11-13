import React from "react";
import { Row, Col, Input } from "antd";
import Categories from "./categories";
import DeliveryTime from "./deliveryTime";
export default function SearchForm({
  isLoading,
  products,
  furniture_styles,
  searchChange,
  categoriesChange,
  deliveryChange,
  delivery
}) {
  const searchStyle = {
    color: "#ffffff",
    backgroundColor: "transparent",
    border: "0px",
    borderRadius: "0px",
    borderBottom: "1px #ffffff solid",
    padding: "1rem 3rem 1.2rem 0.5rem",
    fontSize: "1.2rem"
  };
  return (
    <React.Fragment>
      <Row gutter={48} style={{ marginBottom: "1rem" }}>
        <Col span={12}>
          <Input
            size={"small"}
            className="search-input"
            placeholder="Search Furniture"
            style={searchStyle}
            onChange={searchChange}
          />
        </Col>
      </Row>
      <Row gutter={48}>
        <Col span={12}>
          <Categories
            categoryList={furniture_styles}
            categoriesChange={categoriesChange}
          />
        </Col>
        <Col span={12}>
          <DeliveryTime delivery={delivery} deliveryChange={deliveryChange} />
        </Col>
      </Row>
    </React.Fragment>
  );
}
