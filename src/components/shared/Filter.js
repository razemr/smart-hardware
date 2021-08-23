import React, { useEffect, useState } from "react";
import { TOTAL_PRODUCTS } from "../../utils/app-const";

export const Filter = (props) => {
  const { onSearchChange, onPageChange, page, limit } = props;
  const [hidePage, setHidePage] = useState(false);
  const maxPage = Math.ceil(TOTAL_PRODUCTS / limit);

  return (
    <>
      <input type="text" placeholder="Search" onChange={e => {
          if(e.target.value) {
              setHidePage(true);
          } else {
              setHidePage(false);
          }
          onSearchChange(e.target.value)
          }}></input>

      <div hidden={hidePage}>
        <input
          type="number"
          onChange={e => onPageChange(e.target.value)}
          value={page}
          min="1"
          max={maxPage}
        ></input>
        &nbsp;/ {maxPage}
      </div>
    </>
  );
};
