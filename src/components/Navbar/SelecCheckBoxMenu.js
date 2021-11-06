import { useContext, useEffect, useState, memo } from "react";
import { FiChevronDown } from "react-icons/fi";
import { MenuBtn, MenuUl } from "./customEl";
import { filterContext } from "../../store/filterReducer";

const SelectCheckBoxMenuLi = memo(function (props) {
  const [isSelected, setSelected] = useState(false);
  const { filterState } = useContext(filterContext);

  useEffect(() => {
    setSelected(filterState[props.type].includes(props.val));
  }, [filterState[props.type]]);

  return (
    <li className=" cursor-default select-none relative bg-gray-600 text-green-300 p-1 text-semibold">
      <div className="flex items-center">
        <input
          onChange={props.handler}
          value={props.val}
          type="checkbox"
          checked={isSelected}
          className="h-4 w-4 border-gray-300 rounded"
        />
        <label className="ml-3 min-w-0 flex-1 text-left truncate ">
          {props.val}
        </label>
      </div>
    </li>
  );
});

const SelectCheckBoxMenu = memo(function (props) {
  const [hidden, setHidden] = useState(false);

  return (
    <MenuBtn
      type="button"
      onClick={() => setHidden(!hidden)}
      className="relative bg-transparent border-2 border-green-300 text-green-300 rounded-md shadow-sm px-4  cursor-default focus:outline-nonesm:text-sm text-xs py-1 mx-2"
    >
      <div className="flex items-center justify-around">
        <span>{props.placeholder}</span>
        <span>
          <FiChevronDown size={15} />
        </span>
      </div>
      {hidden ? (
        <MenuUl className="absolute z-30 rounded mt-1 bg-white  shadow-md  bg-gray-600 py-1 text-base  overflow-auto focus:outline-none sm:text-sm left-0 top-6">
          {props.options.map((op, i) => (
            <SelectCheckBoxMenuLi
              type={props.type}
              key={i}
              val={op}
              handler={props.handler}
            />
          ))}
        </MenuUl>
      ) : null}
    </MenuBtn>
  );
});

export default SelectCheckBoxMenu;
