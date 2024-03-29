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
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase-config";

function VideoModalHero({ movieVideos, isOpen, onClose }) {
  const [activeUser, setActiveUser] = useState({});
  onAuthStateChanged(auth, (user) => {
    setActiveUser(user);
  });
  const videoModal = useDisclosure();
  const router = useRouter();
  const userId = activeUser?.uid;
  // function to play video and close the modal
  const playAndClose = () => {
    if (userId) {
      videoModal.onOpen();
      onClose();
    } else {
      router.push("/register/signin");
    }
  };

  // function to get the embeded Youtube videos

  const results = movieVideos?.videos?.results;

  const embededVideos = [];

  results?.map((video) => {
    const { type, site, key } = video;
    if (type == "Trailer" && site == "YouTube") {
      embededVideos.push(
        <div className="relative overflow-clip pt-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-[100%] h-[100%]"
            width={"100%"}
            height={"70%"}
            src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1`}
            title={video.name}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowfullscreen={true}
          ></iframe>
        </div>
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
                  onClick={playAndClose}
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
