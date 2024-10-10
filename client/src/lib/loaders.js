import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  console.log(params);
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  console.log(request);
  const query = request.url.split("?")[1];
  const postPromise = await apiRequest("/posts?" + query);
  return postPromise
  // return defer({
  //   postResponse: postPromise,
  // }); 
};

export const profilePageLoader = async () => {
  const res = await apiRequest("/users/profilePosts");
  const chatRes = await apiRequest("/chats");

  console.log(chatRes);
  return {
    res,
    chatRes,
  }
}; 