import { useContext, useEffect, useState } from "react";
import { fetchContext } from "../../store/fetchContext";
import MovieList from "./MovieList";
import compareLogic from "../../utils/compareLogic";
import { filterContext } from "../../store/filterReducer";
import heroContext from "../../store/heroContext";

export default function Main() {
  const [loading, setLoading] = useState(true);
  const { updateHero } = useContext(heroContext);
  const { filterState } = useContext(filterContext);
  const { fetchObj } = useContext(fetchContext);
  const [datas, setData] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchObj
      .fetch("https://peaceful-forest-62260.herokuapp.com/")
      .then((res) => {
        if (res) {
          let datas = [];

          const langs = new Set(filterState.lang ?? []);
          const genres = new Set(filterState.genre ?? []);

          Object.keys(res.data.moviesData).forEach((d) => {
            const data = res.data.moviesData[d];

            /** If no filters are present */
            if (langs.size === 0 && genres.size === 0) datas.push(data);
            else {
              /** If any or both filters are present */
              const dadaGenres = data.EventGenre.split("|");

              const isLangPresent = langs.has(data.EventLanguage);
              const isGenrePresent = dadaGenres.some(
                (genre) => genres.has("All Genres") || genres.has(genre)
              );

              /** if only language filter is present */
              if (langs.size && !genres.size) {
                if (isLangPresent) datas.push(data);
              } else if (genres.size && !langs.size) {
                /** If only genres filter is present */
                if (isGenrePresent) datas.push(data);
              } else if (langs.size && genres.size) {
                /** If both genres and language filter is present */
                if (isGenrePresent && isLangPresent) {
                  datas.push(data);
                } else if (isGenrePresent && isLangPresent) {
                  datas.push(data);
                }
              }
            }
          });

          updateHero(datas[0]);

          datas.sort((a, b) => compareLogic(a, b, filterState));

          setData(datas);
          setLoading(false);
        }
      });
  }, [filterState]);

  return (
    <div className="w-full mt-8 h-full">
      {loading ? (
        <div className="w-full h-40 bg-gray-400 rounded"></div>
      ) : (
        <MovieList moviesData={datas} />
      )}
    </div>
  );
}
