import React from "react";
import { TreeSelect } from "antd";

const { SHOW_PARENT } = TreeSelect;

function SelectCategories({ categoryList, categoriesChange }) {
  const treeData = [];
  if (categoryList) {
    categoryList.map((item, index) => {
      treeData.push({
        title: item,
        value: item,
        key: index
      });
      return false;
    });
  }
  const tProps = {
    treeData,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    searchPlaceholder: "Furniture Style",
    style: {
      width: "100%"
    }
  };
  return <TreeSelect {...tProps} onChange={categoriesChange} />;
}

export default SelectCategories;
