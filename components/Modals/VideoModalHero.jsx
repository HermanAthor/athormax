"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { movieDurationfunction } from "@/libs/getDuration";
//import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";

function VideoModalHero({ movieVideos, isOpen, onClose }) {
  const videoModal = useDisclosure();

  const {
    backdrop_path,
    genres,
    homepage,
    original_title,
    overview,
    runtime,
    tagline,
    videos,
  } = movieVideos; // destructuring the movieVideos
  // function to get the duration of the video and it should return in this format --- 1h 40m
  // function movieDuration() {
  //   const hours = Math.floor(runtime / 60);
  //   const minutes = runtime % 60;
  //   return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  // }

  // function to get the embeded Youtube videos

  const results = videos?.results;

  const embededVideos = [];

  results?.map((video) => {
    const { type, site, key } = video;
    if (type == "Trailer" && site == "YouTube") {
      embededVideos.push(
        <iframe
          className="w-full h-screen"
          src={`https://www.youtube.com/embed/${key}`}
          title={video.name}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowfullscreen={true}
        ></iframe>
      );
    }
  });

  return (
    <div className="animate__zoomInLeft animate__delay-2s">
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize={"3xl"}>{original_title}</Text>
            <Text fontSize={"lg"}>{tagline}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box className="relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                fallbackSrc="https://via.placeholder.com/150"
                className="w-full h-auto"
              />
              <Box className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400 ">
                <button
                  onClick={videoModal.onOpen}
                  className=" bg-transparent rounded-full p-3 border-2 border-blue-400"
                >
                  <PlayArrowIcon className="text-7xl" fontSize="large" />
                </button>
              </Box>
              <Box className="absolute bottom-3 left-3 text-white">
                <Text fontSize={"2xl"}>
                  {genres?.map((genre) => (
                    <span className="px-2 ">{genre.name}</span>
                  ))}
                </Text>
                <Text fontSize={"lg"} color={"white"}>
                  {movieDurationfunction(runtime)}
                </Text>
              </Box>
            </Box>

            <Text>
              {overview}{" "}
              <span className="pl-2 text-blue-500 hover:underline">
                <a target="_blank" href={homepage}>
                  Visit Official page
                </a>
              </span>
            </Text>
          </ModalBody>
          <ModalFooter>
            <button onClick={onClose}>Close</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VideoPlayer
        embededVideos={embededVideos}
        open={videoModal.isOpen}
        close={videoModal.onClose}
      />
      {/* {true && (
        <div className="absolute inset-0 w-full h-full bg-black">
          {embededVideos.map((videoArray) => (
            <div>{videoArray}</div>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default VideoModalHero;

/*
<iframe width="560" height="315" src="https://www.youtube.com/embed/zrv_SAnnmtk?si=fdqkJQ61fciOcEQH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


*/
