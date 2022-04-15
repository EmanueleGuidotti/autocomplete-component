const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
const FetchData = (query) =>
  fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, options)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.status + " " + response.statusText);
      }
      // ensure ReadableStream is supported
      if (!response.body) {
        throw Error("ReadableStream not yet supported in this browser.");
      }
      return response;
    })
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    })
    .catch((error) => {
      console.error(error);
    });

export default FetchData;
