import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import SearchInput from "./components/searchInput";
import Content from "./components/content";
import { Row } from "antd";
import useFetchData from "./utils/useFetchData";

function App() {
  const [
    { products, delivery, furniture_styles, isLoading },
    dispatch
  ] = useFetchData();
  function searchChange(e) {
    dispatch({ type: "FETCH_FILTER", filter: e.target.value, field: "search" });
  }
  function categoriesChange(value) {
    dispatch({ type: "FETCH_FILTER", filter: value, field: "category" });
  }
  function deliveryChange(value) {
    dispatch({ type: "FETCH_FILTER", filter: value, field: "delivery" });
  }
  return (
    <div className="App">
      <header className="App-header">
        <SearchInput
          products={products}
          furniture_styles={furniture_styles}
          categoriesChange={categoriesChange}
          deliveryChange={deliveryChange}
          searchChange={searchChange}
          delivery={delivery}
        />
      </header>
      <content className="App-body">
        <Row gutter={48}>
          <Content products={products} loading={isLoading} />
        </Row>
      </content>
    </div>
  );
}

export default App;
