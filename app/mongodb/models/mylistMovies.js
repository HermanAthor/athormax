import { Schema, mongoose } from "mongoose";

const moviesSchema = {
  adult: { type: Boolean, require: true },
  backdrop_path: { type: String, require: true },
  genre_ids: { type: [Number], require: true },
  id: { type: Number, require: true },
  original_language: { type: String, require: true },
  original_title: { type: String, require: true },
  overview: { type: String, require: true },
  popularity: { type: Number },
  poster_path: { type: String, require: true },
  release_date: { type: String, require: true },
  title: { type: String, require: true },
  video: { type: Boolean, require: true },
  vote_count: { type: Number, require: true },
  vote_average: { type: Number, require: true },
};

const myListMoviesSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    movie: {
      adult: { type: Boolean, required: true },
      backdrop_path: { type: String, required: true },
      genre_ids: { type: [Number], required: true },
      id: { type: Number, required: true },
      original_language: { type: String, required: true },
      original_title: { type: String, required: true },
      overview: { type: String, required: true },
      popularity: { type: Number, required: false },
      poster_path: { type: String, required: true },
      release_date: { type: String, required: true },
      title: { type: String, required: true },
      video: { type: Boolean, required: true },
      vote_count: { type: Number, required: true },
      vote_average: { type: Number, required: true },
    },
  },
  { timestamps: true }
);
export const myListMovies =
  mongoose.models.MyMovies || mongoose.model("MyMovies", myListMoviesSchema);
