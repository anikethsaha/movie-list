import { useContext, useEffect, useState } from "react";
import { filterContext } from "../../store/filterReducer";
import { IoIosClose } from "react-icons/io";

const actionMap = {
  lang: "DELETE_LANG",
  genre: "DELETE_GENRE"
};

/**
 * Tag component for each filters
 * @param {Object<{type:string, val:string}>} props
 */
function FilterTag(props) {
  const { filterDispatch } = useContext(filterContext);

  function closeHandler() {
    filterDispatch({
      type: actionMap[props.type],
      payload: {
        [props.type]: props.val
      }
    });
  }

  return (
    <div className="flex ml-1 justify-center items-center bg-gray-600 text-gray-100 rounded-full py-1 px-2 text-xs">
      {props.val}
      <IoIosClose onClick={closeHandler} size={20} />
    </div>
  );
}

/**
 * Component to render list of filter components
 */
export function FilterList() {
  const [filterList, updateFilterList] = useState([]);
  const { filterState } = useContext(filterContext);

  useEffect(() => {
    const list = [];
    if (filterState.lang?.length) {
      filterState.lang.forEach((l) => list.push({ val: l, type: "lang" }));
    }
    if (filterState.genre?.length) {
      filterState.genre.forEach((g) => list.push({ val: g, type: "genre" }));
    }

    updateFilterList(list);
  }, [filterState]);

  return (
    <div className="md:w-full sm:w-full sm:justify-center h-12 flex  items-center md:justify-start ">
      <p className="text-xs text-gray-300 mr-4">Applied Filter </p>
      {filterList.map((filterProps, i) => (
        <FilterTag key={i} {...filterProps} />
      ))}
    </div>
  );
}
