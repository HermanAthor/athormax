import { movieDurationfunction } from "@/libs/getDuration";
import { releaseYear } from "@/libs/getReleaseYear";
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

function VideoModal({ movieVideo, isOpen, onClose }) {
  const {
    adult,
    budget,
    genres,
    homepage,
    original_language,
    title,
    populality,
    overview,
    poster_path,
    tagline,
    videos,
    runtime,
    spoken_languages,
    release_date,
    production_companies,
    revenue,
  } = movieVideo;

  return (
    <div className="animate__zoomInLeft animate__delay-2s">
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box className="relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                fallbackSrc="https://via.placeholder.com/150"
                className="w-full "
              />
              <Box className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400">
                <button className=" bg-transparent rounded-full p-3 border-2 border-blue-400">
                  <PlayArrowIcon fontSize="large" />
                </button>
              </Box>
              <Box
                color={"whiteAlpha.600"}
                fontStyle={"normal"}
                fontFamily={"cursive"}
                className="absolute bottom-5 left-5"
              >
                <Text
                  fontSize={"2xl"}
                  color={"whiteAlpha.600"}
                  fontStyle={"normal"}
                  fontFamily={"cursive"}
                >
                  <span>{releaseYear(release_date)}</span>
                  <span className="text-7xl">. </span>
                  {genres?.map((genre) => {
                    return (
                      <span
                        className="hover:underline cursor-pointer"
                        key={genre}
                      >
                        {genre.name} |{" "}
                      </span>
                    );
                  })}
                  <span className="text-7xl">. </span>
                  <span>{movieDurationfunction(runtime)}</span>
                </Text>
                <Text fontSize={"xl"}>{tagline}</Text>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <button onClick={onClose}>Close</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default VideoModal;
