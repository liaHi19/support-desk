import axios from "axios";

import { createConfig } from "../../helpers/api-helpers";

const API_URL = "/api/tickets/";

const getNotes = async (ticketId, token) => {
  const config = createConfig(token);

  const response = await axios.get(API_URL + ticketId + "/notes", config);

  return response.data;
};

const noteService = {
  getNotes,
};

export default noteService;
