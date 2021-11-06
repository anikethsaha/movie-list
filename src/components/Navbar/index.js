import { useContext, useEffect, useState } from "react";

import { CgClose } from "react-icons/cg";
import SelectMenu from "./SelectMenu";
import { filterContext } from "../../store/filterReducer";
import { fetchContext } from "../../store/fetchContext";
import { GreenBtn } from "./customEl";

import SelectCheckBoxMenu from "./SelecCheckBoxMenu";

function LeftNav() {
  return (
    <div className="flex items-center md:w-1/4 sm:w-full sm:justify-center">
      <h1 className="text-4xl">LOGO</h1>
      <GreenBtn className="mx-4 text-white p-1 px-2 rounded ">
        <p className="text-xs">Coming Soon</p>
      </GreenBtn>
      <button className=" text-white p-1 px-2 rounded bg-gray-600">
        <p className="text-xs">Now showing</p>
      </button>
    </div>
  );
}

function RightNav() {
  const [langOptions, setLangOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const { fetchObj } = useContext(fetchContext);
  const { filterState, filterDispatch } = useContext(filterContext);

  function handleSort(e) {
    const sort = e.target.value ?? "popularity";
    filterDispatch({ type: "UPDATE_SORT", payload: { sort } });
  }

  function handleLangChange(e) {
    filterDispatch({
      type: "UPDATE_LANG",
      payload: { lang: e.target.value }
    });
  }

  function handleGenreChange(e) {
    filterDispatch({
      type: "UPDATE_GENRE",
      payload: { genre: e.target.value }
    });
  }
  useEffect(() => {
    fetchObj
      .fetch("https://peaceful-forest-62260.herokuapp.com/")
      .then((res) => {
        if (res) {
          setLangOptions(res.data.languageList);
          if (res.data.moviesData) {
            const { moviesData } = res.data;

            Object.keys(moviesData).forEach((m) => {
              const { EventGenre } = moviesData[m];
              const genres = EventGenre.split("|");
              const allCurrentGenre = new Set(genreOptions.concat(genres));
              setGenreOptions(Array.from(allCurrentGenre));
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="md:w-3/4 sm:w-full justify-center">
      <div className="flex sm:justify-center md:justify-end items-center h-full">
        <SelectMenu
          handler={handleSort}
          selected={filterState.sort ?? "popularity"}
          options={["popularity", "Fresh"]}
        />
        <SelectCheckBoxMenu
          type="lang"
          handler={handleLangChange}
          placeholder={"Languages"}
          options={langOptions ?? []}
        />
        <SelectCheckBoxMenu
          type="genre"
          handler={handleGenreChange}
          placeholder={"Genre"}
          options={genreOptions ?? []}
        />
        <CgClose size={30} className="text-gray-700" />
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <div className="w-full bg-black">
      <div className="md:w-11/12 sm:w-full flex md:flex-row  sm:flex-col m-auto py-2 ">
        <LeftNav />
        <RightNav />
      </div>
    </div>
  );
}
