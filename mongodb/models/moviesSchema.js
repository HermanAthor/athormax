// {
//     "genre": "Action",
//     "title": "Furious 7",
//     "thumbnail": "https://i.imgur.com/7ax74eb.mp4",
//     "year": 2015,
//     "synopsis": "Deckard Shaw seeks revenge against Dominic Toretto and his family for his comatose brother.",
//     "duration": 137
//   },

import { moviesLists } from "@/data/movies";
import mongoose, { Schema } from "mongoose";

const moviesSchema = new Schema({
  genre: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const moviesList =
  mongoose.models.Movies || mongoose.model("Movies", moviesSchema);

export const createMOviesList = async () => {
  const creatData = await new moviesList(moviesLists);
  await creatData.save();
};
4;
