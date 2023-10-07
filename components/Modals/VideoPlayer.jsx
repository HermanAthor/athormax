import React from "react";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "./swippermodalstyles.css";

function VideoPlayer({ embededVideos, open, close }) {
  return (
    <Modal onClose={close} size={"full"} isOpen={open}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton
          color={"blue.500"}
          fontSize={"3xl"}
          backgroundColor={"gray.500"}
        />
        <ModalBody>
          <Swiper
            navigation={true}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            className="w-full h-full"
            slidesPerView={1}
          >
            <SwiperSlide>
              <div className="w-full h-screen relative overflow-clip">
                {embededVideos?.map((videoArray) => {
                  return (
                    <div className="w-full h-full" key={videoArray}>
                      {videoArray}
                    </div>
                  );
                })}
              </div>
            </SwiperSlide>
          </Swiper>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default VideoPlayer;
