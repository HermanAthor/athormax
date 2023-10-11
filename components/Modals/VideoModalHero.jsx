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
  console.log(movieVideos);

  // destructuring the movieVideos
  // function to get the duration of the video and it should return in this format --- 1h 40m
  // function movieDuration() {
  //   const hours = Math.floor(runtime / 60);
  //   const minutes = runtime % 60;
  //   return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  // }

  // function to get the embeded Youtube videos

  const results = movieVideos?.videos?.results;

  const embededVideos = [];

  results?.map((video) => {
    const { type, site, key } = video;
    if (type == "Trailer" && site == "YouTube") {
      embededVideos.push(
        <iframe
          width={"80%"}
          height={"80%"}
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
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size={"3xl"}
        colorScheme="blackAlpha"
      >
        <ModalOverlay />
        <ModalContent
          bg={"blackAlpha.700"}
          textColor={"whiteAlpha.700"}
          fontFamily={"cursive"}
          fontSize={"3xl"}
        >
          <ModalHeader>
            <Text fontSize={"3xl"}>{movieVideos?.original_title}</Text>
            <Text fontSize={"lg"}>{movieVideos?.tagline}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box className="relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movieVideos?.backdrop_path}`}
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
                  {movieVideos?.genres?.map((genre) => (
                    <span className="px-2 ">{genre.name}</span>
                  ))}
                </Text>
                <Text fontSize={"lg"} color={"white"}>
                  {movieDurationfunction(movieVideos?.runtime)}
                </Text>
              </Box>
            </Box>

            <Text fontSize={"lg"}>
              {movieVideos?.overview}{" "}
              <span className="pl-2 text-blue-500 hover:underline">
                <a target="_blank" href={movieVideos?.homepage}>
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
    </div>
  );
}

export default VideoModalHero;
