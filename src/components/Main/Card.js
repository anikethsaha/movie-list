import { memo, useContext, useEffect, useRef, useState } from "react";
import { AiOutlinePlayCircle, AiFillLike } from "react-icons/ai";

import useViewPortVisibility from "../../hooks/useViewPortVisibility";
import heroContext from "../../store/heroContext";
import { normalizeDate } from "../../utils/dates";
import getPercentage from "../../utils/getPercentage";

import { CenterDivAbs, CardContainer } from "./customEl";

/**
 * Component to render card details
 * @param {Object} props
 */
const CardContent = (props) => {
  const ref = useRef();
  const { updateHero } = useContext(heroContext);

  const date = normalizeDate(props.ShowDate);
  const percentage = getPercentage(
    props.ratings.wtsCount,
    props.ratings.totalWTSCount
  );

  function updateHeroHandler() {
    updateHero(props);
  }

  function handleError() {
    ref.current.classList.add("bg-gray-700");
  }

  return (
    <div className="w-full h-full">
      <CardContainer
        onClick={updateHeroHandler}
        className="w-full h-full border-0 border-white relative rounded-md min-h-60 hover:border-2 hover:border-green-800"
      >
        <div className="absolute z-10 opacity-100 top-4 right-4 rounded-full h-10 w-10 p-1 bg-green-500 text-white text-xs text-center text-semibold">
          {date}
        </div>
        <img
          ref={ref}
          onError={handleError}
          alt={props.EventName}
          className="w-full h-full rounded opacity-70"
          src={props.EventImageUrl}
        />
        <CenterDivAbs className="absolute text-white">
          <AiOutlinePlayCircle size={40} />
        </CenterDivAbs>
        <div className="absolute opacity-100 z-10  bottom-4 right-4 p-1 text-white text-xs text-center text-semibold ">
          <div className="flex flex-col justify-end items-end text-gray-100">
            <div className="flex items-center">
              <AiFillLike
                className="text-green-500 mx-2 opacity-100 "
                size={15}
              />
              {percentage}%
            </div>
            <span>{props.wtsCount} votes</span>
          </div>
        </div>
      </CardContainer>
      <p className="text-xs text-white z-10 text-start text-gray-300 opacity-100 ">
        {props.EventName}
      </p>
    </div>
  );
};

/**
 * Component to render the card element
 * @param {Object} props
 */
const Card = (props) => {
  const ref = useRef();
  const [isPreviewVisible, setPreviewVisibility] = useState(false);
  const { currentHero } = useContext(heroContext);
  const { isVisible } = useViewPortVisibility(ref);

  useEffect(() => {
    setPreviewVisibility(currentHero.EventCode === props.EventCode);
  }, [currentHero]);

  return (
    <>
      <div ref={ref} className="md:w-1/6 sm:2/6 my-4 p-4 flex flex-col">
        <div className="relative">
          {isVisible ? <CardContent {...props} /> : <CardSkeleton />}
        </div>
      </div>
      {/* {isPreviewVisible ? <Slider /> : null} */}
    </>
  );
};

/**
 * Component to render a skeleton till the card component gets ready
 */
export const CardSkeleton = () => {
  return (
    <div className="w-full border-0 border-white relative rounded-md min-h-60 w-full h-60 bg-gray-200"></div>
  );
};

export default memo(Card);
