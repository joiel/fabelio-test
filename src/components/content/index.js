import React from "react";
import CurrencyFormat from "react-currency-format";
import { Row, Col, Card } from "antd";
export default function Content({ products, loading }) {
  const cardStyle = {
    width: "100%",
    marginBottom: "2rem",
    minHeight: "18rem"
  };
  const price = {
    textAlign: "right",
    marginTop: "0.8rem",
    color: "orange",
    fontWeight: "bold",
    fontSize: "1.2rem"
  };
  const desc = {
    textOverflow: "ellipsis",
    textIndent: "1rem",
    textAlign: "justify",
    lineHeight: "1.3rem"
  };
  const footer = {
    width: "calc(100% - 3rem)",
    position: "absolute",
    bottom: ".5rem"
  };
  const furniture_style = {
    color: "cornflowerblue",
    textTransform: "uppercase",
    fontSize: ".75rem",
    fontStyle: "italic",
    paddingRight: ".5rem",
    letterSpacing: ".1rem"
  };
  const delivery_style = {
    textDecoration: "underline",
    textAlign: "right",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "darkblue"
  };
  return products && products.length > 0
    ? products.map((p, i) => (
        <Col key={i} span={12}>
          <Card loading={loading} bordered={false} style={cardStyle}>
            <Row>
              <Col span={18}>
                <h1>{p.name}</h1>
              </Col>
              <Col span={6}>
                <p style={price}>
                  <CurrencyFormat
                    value={p.price}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"IDR "}
                  />
                </p>
              </Col>
            </Row>
            <Row>
              <p style={desc}>{p.description}</p>
            </Row>
            <Row style={footer}>
              <Row style={{ paddingBottom: "1rem" }}>
                {p.furniture_style.map(i => (
                  <span key={i} style={furniture_style}>
                    {i}{" "}
                  </span>
                ))}
              </Row>
              <Row style={delivery_style}>
                <p>{p.delivery_time} Days</p>
              </Row>
            </Row>
          </Card>
        </Col>
      ))
    : [1, 2, 3, 4, 5, 6].map(i => (
        <Col key={i} span={12}>
          <Card loading={true} bordered={false} style={cardStyle} />
        </Col>
      ));
}
