import { useState, useContext, useEffect } from "react";
import heroContext from "../../store/heroContext";

/**
 * Component to render video
 */
export default function VideoPlayer() {
  const [link, setVidLink] = useState("");
  const { currentHero } = useContext(heroContext);

  useEffect(() => {
    if (currentHero.TrailerURL) {
      const [, id] = currentHero.TrailerURL.split("?v=");
      setVidLink("https://www.youtube.com/embed/" + id);
    }
  }, [currentHero]);

  return (
    <div className="md:w-7/12 sm:w-11/12   md:mr-4 bg-black rounded">
      <iframe
        className="w-full h-full"
        src={link}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
