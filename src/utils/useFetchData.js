import { useReducer, useEffect } from "react";
import axios from "axios";
const optSelect = ["1 week", "2 weeks", "1 month", "more"];
// ===== USE REDUCER ==========
function fetchReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      // set delivery based on response data's delivery time
      // let delivery = action.payload.products
      //   .map((item, index) => parseInt(item.delivery_time))
      //   .sort(function(a, b) {
      //     return a - b;
      //   });
      // if (delivery) delivery = [...new Set(delivery)];
      return {
        ...state,
        field: "field",
        isLoading: false,
        isError: false,
        furniture_styles: action.payload.furniture_styles,
        products: action.payload.products,
        allProducts: action.payload.products,
        search: "",
        dTime: [],
        category: [],
        delivery: optSelect
      };
    case "FETCH_FILTER":
      let data = [];
      let products = [];
      const isEmpty =
        action.filter === "" || action.filter.length === 0 ? true : false;
      if (state.field === action.field) {
        data = state.allProducts;
      } else {
        data = state.products;
      }
      const search = action.field === "search" ? action.filter : state.search;
      const dTime = action.field === "delivery" ? action.filter : state.dTime;
      const category =
        action.field === "category" ? action.filter : state.category;
      if (action.filter === "" || action.filter.length === 0) {
        products = state.allProducts;
      } else {
        products = filter(action.filter, data);
      }
      if (state.search !== "" && isEmpty && action.field !== "search") {
        products = filter(state.search, state.allProducts);
      }
      if (state.category.length > 0 && isEmpty && action.field !== "category") {
        products = filter(state.category, state.allProducts);
      }
      if (state.dTime.length > 0 && isEmpty && action.field !== "delivery") {
        products = filter(state.dTime, state.allProducts);
      }
      return {
        ...state,
        isLoading: false,
        search: search,
        dTime: dTime,
        category: category,
        field: action.field,
        isError: false,
        products: products
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
}

const URL = "https://www.mocky.io/v2/";
const API = "5c9105cb330000112b649af8";

export default function useFetchData() {
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: true,
    isError: false
  });
  useEffect(() => {
    let didCancel = false;
    async function getData() {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios.post(URL + API);

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    }

    if (API !== "") {
      getData();
    }

    return () => {
      didCancel = true;
    };
  }, []);

  return [state, dispatch];
}

function filter(input, products) {
  const searchedData = products.filter(arrData => {
    let aWeek, twoWeeks, aMonth, more;
    if (input.toString().includes("1 week")) {
      aWeek = arrData.delivery_time >= 1 && arrData.delivery_time <= 7;
    }
    if (input.toString().includes("2 weeks")) {
      twoWeeks = arrData.delivery_time > 7 && arrData.delivery_time <= 14;
    }
    if (input.toString().includes("1 month")) {
      aMonth = arrData.delivery_time > 14 && arrData.delivery_time <= 30;
    }
    if (input.toString().includes("more")) {
      more = arrData.delivery_time > 30;
    }
    return (
      arrData.furniture_style
        .toString()
        .toLowerCase()
        .includes(input.toString().toLowerCase()) ||
      arrData.name.toLowerCase().includes(input.toString().toLowerCase()) ||
      aWeek ||
      twoWeeks ||
      aMonth ||
      more
    );
  });

  return searchedData;
}
