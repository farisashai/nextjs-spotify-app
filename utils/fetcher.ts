import axios from "axios";
export const defaultFetcher = (url) => axios.get(url).then((res) => res.data);
