import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "./swippermodalstyles.css";

function VideoPlayer({ embededVideos, open, close }) {
  return (
    <Modal onClose={close} size={"3xl"} isOpen={open} isCentered>
      <ModalOverlay />
      <ModalContent
        bg={"blackAlpha.700"}
        textColor={"whiteAlpha.900"}
        color={"white"}
      >
        <ModalBody>
          <Box>{embededVideos[0]}</Box>
        </ModalBody>
        <ModalFooter>
          <button onClick={close}>Close</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default VideoPlayer;
