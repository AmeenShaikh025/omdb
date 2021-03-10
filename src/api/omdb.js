import axios from "axios";

export default axios.create({
//   baseURL: `http://img.omdbapi.com/?apikey=b4566d3b`,
  baseURL: `http://www.omdbapi.com/?t=joker&apikey=b4566d3b`,
});
