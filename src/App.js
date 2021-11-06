import React, { useReducer } from "react";
import { Center } from "./components/Center";
import Navbar from "./components/Navbar";

import { InMemoryCache } from "./data/inMemoryCache";
import { fetchContext as FetchContext } from "./store/fetchContext";
import filterReducer, {
  filterContext as FilterContext,
  initialVal
} from "./store/filterReducer";

import "./styles.css";

export default function App() {
  const [filterState, filterDispatch] = useReducer(filterReducer, initialVal);
  const inMemoryCacheObj = new InMemoryCache();

  return (
    <div className="w-full h-screen  m-auto">
      <FetchContext.Provider value={{ fetchObj: inMemoryCacheObj }}>
        <FilterContext.Provider value={{ filterState, filterDispatch }}>
          <Navbar />
          <Center />
        </FilterContext.Provider>
      </FetchContext.Provider>
    </div>
  );
}
