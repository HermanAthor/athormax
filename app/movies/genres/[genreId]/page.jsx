import GenreCard from "@/components/GenreCard";
import React from "react";

async function GenrePage({ params }) {
  const genreId = params.genreId;
  return (
    <div>
      <GenreCard genreId={genreId} />
    </div>
  );
}

export default GenrePage;
