// localStorageUtils.js

export const addMovieToFavorites = (movieId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(movieId)) {
        favorites.push(movieId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

export const removeMovieFromFavorites = (movieId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter(id => id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
}

export const fetchFavoritesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}
