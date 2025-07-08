import React from 'react';

const MovieSuggestion = ({ movie }) => {
  const { Title, Year, Poster, Plot, imdbRating, Genre, Director } = movie;
  
  return (
    <div className="movie-suggestion">
      <div className="movie-poster">
        <img 
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/200x300?text=No+Image"} 
          alt={Title}
        />
      </div>
      <div className="movie-details">
        <h3>{Title} ({Year})</h3>
        {Genre && <p className="genre">{Genre}</p>}
        {Director && <p className="director">Directed by {Director}</p>}
        {imdbRating && <p className="rating">⭐ {imdbRating}/10</p>}
        {Plot && Plot !== "N/A" && <p className="plot">{Plot}</p>}
      </div>
    </div>
  );
};

export default MovieSuggestion;