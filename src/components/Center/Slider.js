import styled from "styled-components";

import { BiLike } from "react-icons/bi";
import {
  AiFillCalendar,
  AiOutlineQuestionCircle,
  AiOutlineDislike,
  AiOutlineLike
} from "react-icons/ai";
import { useContext } from "react";
import heroContext from "../../store/heroContext";
import getPercentage from "../../utils/getPercentage";
import VideoPlayer from "./videoPlayer";

const SmallP = styled.p`
  font-size: 0.7em;
`;

/**
 * Render the content (details) about the movie
 * @param {Object} props
 */
export function InfoDisplayContent(props) {
  const [dm, year] = props.ShowDate.split(",");
  const percentage = getPercentage(
    props.ratings.wtsCount,
    props.ratings.totalWTSCount
  );

  return (
    <div className="p-2 px-4 flex flex-col mb-4">
      <h1 className="text-xl text-white text-start">{props.EventTitle}</h1>
      <SmallP className=" text-gray-500 text-start">
        {props.EventLanguage}
      </SmallP>
      <div className="flex w-full my-2">
        {/* Likes */}
        <div className="flex text-white items-center">
          <BiLike size={40} />
          <div className="flex flex-col mx-2">
            <p className="text-md">{percentage}%</p>
            <SmallP className=" text-gray-500 text-start">99/9% Vote</SmallP>
          </div>
        </div>

        {/* Date */}

        <div className="flex text-white items-center ml-8">
          <AiFillCalendar size={40} />
          <div className="flex flex-col mx-2">
            <p className="text-md">{dm}</p>
            <SmallP className=" text-gray-500 text-start">{year.trim()}</SmallP>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500">
        e rest of the code matches vitfo's original answer (but no need for
        onclick() in the html). A couple of people have requested this
        functionality sans jQuery.
      </p>
      <a href="#" className="text-green-700 text-xs">
        Read more
      </a>

      <div className="flex-grow justify-self-end mt-20 mb-4">
        <div className="flex justify-between  text-xs text-center">
          <div className="text-green-700 ">
            <AiOutlineLike size={40} className="m-auto" />
            Some text here
          </div>
          <div className="text-yellow-500">
            <AiOutlineQuestionCircle className="m-auto" size={40} />
            Some text here
          </div>
          <div className="text-red-700">
            <AiOutlineDislike className="m-auto" size={40} />
            Some text here
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Component to render the details about the movie
 */
export function InfoDisplay() {
  const { currentHero } = useContext(heroContext);

  return (
    <div className="md:w-5/12 sm:w-11/12 md:my-0 sm:my-2 md:ml-4   bg-gray-900 rounded">
      {currentHero && Object.keys(currentHero).length > 0 ? (
        <InfoDisplayContent {...currentHero} />
      ) : null}
    </div>
  );
}

/**
 * The main component to render the selected movie
 */
export function Slider() {
  return (
    <div className="flex md:flex-row sm:flex-col justify-center  items-stretch">
      <VideoPlayer />
      <InfoDisplay />
    </div>
  );
}
