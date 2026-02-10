import axios from "axios";

const API = "http://localhost:5000/api/tasks";

export const getTasks = (token) =>
  axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createTask = (data, token) =>
  axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
