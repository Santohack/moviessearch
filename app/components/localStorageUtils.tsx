"use client"

/**
 * Adds a movie to the favorites list in localStorage.
 * Ensures that duplicates are not added.
 *
 * @param {string|number} movieId - The ID of the movie to add to favorites.
 * @throws Will throw an error if the movie ID is not provided or if the operation fails.
 */
export const addMovieToFavorites = (movieId:string | number) => {
  // Validate input
  if (!movieId) {
    throw new Error('No movie ID provided for adding to favorites.');
  }

  try {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding movie to favorites:', error);
  }
}

/**
 * Removes a movie from the favorites list in localStorage.
 *
 * @param {string|number} movieId - The ID of the movie to remove from favorites.
 * @throws Will throw an error if the movie ID is not provided or if the operation fails.
 */
export const removeMovieFromFavorites = (movieId:string | number) => {
  // Validate input
  if (!movieId) {
    throw new Error('No movie ID provided for removing from favorites.');
  }

  try {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter((id: string | number) => id !== movieId);

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing movie from favorites:', error);
  }
}

/**
 * Fetches the list of favorite movies from localStorage.
 *
 * @return {Array<string|number>} - The list of favorite movie IDs.
 */
export const fetchFavoritesFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  } catch (error) {
    console.error('Error fetching favorites from localStorage:', error);
    return [];
  }
}
