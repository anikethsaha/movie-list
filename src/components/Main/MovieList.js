import Card from "./Card";

/**
 * Component to render the list of the movies
 * @param {Array<Object>} param0
 */
export default function MovieList({ moviesData }) {
  return (
    <div className="flex w-full flex-wrap justify-around">
      {moviesData
        ? Object.keys(moviesData).map((data, i) => (
            <Card key={i} {...moviesData[data]} />
          ))
        : null}
    </div>
  );
}
