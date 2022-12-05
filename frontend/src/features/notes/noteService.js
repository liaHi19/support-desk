import axios from "axios";

import { createConfig } from "../../helpers/api-helpers";

const API_URL = "/api/tickets/";

const getNotes = async (ticketId, token) => {
  const config = createConfig(token);

  const response = await axios.get(API_URL + ticketId + "/notes", config);

  return response.data;
};

const createNote = async (noteText, ticketId, token) => {
  const config = createConfig(token);

  const response = await axios.post(
    API_URL + ticketId + "/notes",
    { text: noteText },
    config
  );

  return response.data;
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;
