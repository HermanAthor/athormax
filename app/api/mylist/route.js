import { myListMovies } from "@/app/mongodb/models/mylistMovies";
import { mongodbconnect } from "@/libs/mongodbconnect";
import { NextResponse } from "next/server";
import { mongoose } from "mongoose";
import { ObjectId } from "mongodb";

export async function POST(req, res) {
  try {
    await mongodbconnect();
    const data = await req.json();
    const { userId, movie } = data;
    const createMovieList = new myListMovies({
      userId,
      movie,
    });

    await createMovieList.save();
    console.log("Movie has been saved");
    return NextResponse.json({
      results: ["Movie has been added to your list"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ results: errorList });
    } else {
      return NextResponse.json({ results: ["Unable to save your movie"] });
    }
  }
}
//GET route to get the movies list
export async function GET(req) {
  try {
    await mongodbconnect();
    const movies = await myListMovies.find({});
    return NextResponse.json({
      results: movies,
      success: true,
    });
  } catch (error) {
    console.log("An error occured: ", error);
    return NextResponse.json({
      results: ["An error occured while fetching you movies"],
      success: false,
    });
  }
}

// Removing movie from watchlist

export async function DELETE(req) {
  const { id } = await req.json();
  try {
    await mongodbconnect();
    const movies = await myListMovies.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({
      results: ["Movie removed from watchlist"],
      success: true,
    });
  } catch (error) {
    console.log("An error occured: ", error);
    return NextResponse.json({
      results: ["An error occured while deleting your movie"],
      success: false,
    });
  }
}
