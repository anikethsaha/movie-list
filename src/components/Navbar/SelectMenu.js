import { useContext, useEffect, useState, memo } from "react";
import { FiChevronDown } from "react-icons/fi";
import { MenuBtn, MenuUl } from "./customEl";

function SelectMenuLi(props) {
  return (
    <li
      key={props.i}
      className="relative hover:bg-gray-500 bg-gray-600 text-green-300 p-1 text-semibold"
    >
      <option onClick={props.handler} className="text-center">
        {props.value}
      </option>
    </li>
  );
}

export default function SelectMenu(props) {
  const { options } = props;
  const [hidden, setHidden] = useState(true);
  return (
    <MenuBtn
      type="button"
      onClick={() => setHidden(!hidden)}
      className="relative bg-transparent border-2 border-green-300 text-green-300 rounded-md shadow-sm px-4  cursor-default focus:outline-nonesm:text-sm text-xs py-1 mx-2"
    >
      <div className="flex items-center justify-around">
        <span>{props.selected}</span>
        <span>
          <FiChevronDown size={15} />
        </span>
      </div>

      {hidden ? null : (
        <MenuUl className="absolute z-10 mt-1 bg-white  shadow-md  bg-gray-600 py-1 text-base  overflow-auto focus:outline-none sm:text-sm -left-1 top-6">
          {options
            .filter((o) => o !== props.selected)
            .map((o, i) => {
              return <SelectMenuLi handler={props.handler} value={o} i={i} />;
            })}
        </MenuUl>
      )}
    </MenuBtn>
  );
}
