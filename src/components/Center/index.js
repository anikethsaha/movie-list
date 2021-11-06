import { useState } from "react";
import HeroContext from "../../store/heroContext";
import Main from "../Main";
import { FilterList } from "./FilterList";
import { Slider } from "./Slider";

/**
 * Component to render the filterlist, selected movie compoenent and the list
 * of the movie
 */
export function Center() {
  const [currentHero, updateHero] = useState({});

  return (
    <div className="bg-gray-800 w-full h-auto">
      <div className="md:w-11/12 sm:w-full flex flex-col  m-auto ">
        <FilterList />

        <HeroContext.Provider value={{ currentHero, updateHero }}>
          <Slider />
          <Main />
        </HeroContext.Provider>
      </div>
    </div>
  );
}
