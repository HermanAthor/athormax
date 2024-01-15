import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
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
          <Swiper
            navigation={true}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            className="w-full h-full mr-3"
            slidesPerView={1}
          >
            <SwiperSlide>
              <div className="w-[100%] h-screen relative overflow-clip">
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
