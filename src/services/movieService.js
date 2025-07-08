const API_URL = "https://www.omdbapi.com/?apikey=da17ff1a";

export const searchMovieByTitle = async (title) => {
  try {
    const response = await fetch(`${API_URL}&t=${encodeURIComponent(title)}`);
    const data = await response.json();
    return data.Response === "True" ? data : null;
  } catch (error) {
    console.error('Error searching movie:', error);
    return null;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${API_URL}&s=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.Response === "True" ? data.Search : [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`${API_URL}&i=${imdbID}&plot=full`);
    const data = await response.json();
    return data.Response === "True" ? data : null;
  } catch (error) {
    console.error('Error getting movie details:', error);
    return null;
  }
};