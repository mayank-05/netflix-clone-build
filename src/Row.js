import axios from "./axios";
import React, { useState, useEffect } from "react";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleCLick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => {
          return (
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                onClick={() => handleCLick(movie)}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
              // <video
              //   className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              //   key={movie.id}
              //   onMouseOver={(e) => e.target.play()}
              //   onMouseOut={(e) => e.target.pause()}
              //   src={`${base_url}${
              //     isLargeRow ? movie.poster_path : movie.backdrop_path
              //   }`}
              //   alt={movie.name}
              // />
            )
          );
        })}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;

/* <video
  poster="https://i.imgur.com/Us5ckqm.jpg"
  onMouseOver={event => event.target.play()}
  onMouseOut={event => event.target.pause()}
  src={`${vid.videos.tiny.url}#t=1`} >
</video> */
