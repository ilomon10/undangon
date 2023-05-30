import { useNode } from "@craftjs/core";
import { Box, Flex } from "components/Grid";
import _get from "lodash/get";
import _set from "lodash/set";
import _pick from "lodash/pick";
import _merge from "lodash/merge";
import { useRef, useState } from "react";
import { DocumentSettings } from "./DocumentSettings";
import AudioPlayer from "react-audio-player";
import { useRouter } from "next/router";
import { useViewport } from "components/editor/Viewport/useViewport";
import { ProcessUnitForViewport } from "../Container/ProcessUnitForViewport";

export const Document = ({ children, modalOptions, musicOptions }) => {
  const {
    actions,
    connectors: { connect },
  } = useNode();

  const audioPlayerRef = useRef();

  const [localModalOpen, setLocalModalOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { query: searchParams } = useRouter();
  const { media, isProduction } = useViewport();

  const handleOpenModal = () => {
    if (isProduction) {
      setLocalModalOpen(true);
    } else {
      actions.setProp((props) =>
        _set(props, "modalOptions.open", !modalOptions.open)
      );
    }
    if (!audioPlayerRef.current) return;
    const audioEl = audioPlayerRef.current.audioEl.current;
    audioEl.play();
  };

  return (
    <Flex
      ref={connect}
      sx={{
        position: "relative",
        minHeight: !isProduction
          ? ProcessUnitForViewport("100vh", media.currentMedia.height)
          : undefined,
      }}
    >
      <Flex sx={{ position: "absolute", bottom: 0, left: 0 }}>
        {musicOptions.url && (
          <AudioPlayer
            onCanPlay={() => {
              setIsReady(true);
            }}
            ref={audioPlayerRef}
            src={musicOptions.url}
            controls={musicOptions.showButton}
          />
        )}
      </Flex>
      <ModalComponent
        isOpen={isProduction ? localModalOpen : modalOptions.open}
        imageUrl={modalOptions.imageUrl}
        guests={searchParams.u}
        onOpen={handleOpenModal}
        loading={isProduction ? !isReady : undefined}
        gradientStyle={_get(modalOptions, "gradientStyle")}
        frontImageAttribute={_get(modalOptions, "frontImageAttribute")}
        descriptions={_get(modalOptions, "descriptions")}
      />
      {children}
    </Flex>
  );
};

const ModalComponent = ({
  isOpen,
  imageUrl,
  guests,
  onOpen = () => {},
  loading = false,
  gradientStyle = {},
  frontImageAttribute = {},
  descriptions = {},
}) => {
  const { isProduction } = useViewport();
  const handleInvitation = () => {
    onOpen();
    // if (isProduction) {
    //   document.documentElement.requestFullscreen();
    // }
  };
  return (
    <Box
      className={isOpen && "opened"}
      sx={{
        position: isProduction ? "fixed" : "absolute",
        zIndex: 999,
        inset: 0,
        opacity: "1",
        transitionDelay: "0ms",
        transition: "0ms ease-out",
        "&.opened": {
          opacity: "0",
          visibility: "hidden",
          transition: "500ms ease-out",
          transitionDelay: "2000ms",
        },
        "& > .image": {
          opacity: "1",
          transform: "translateX(0)",
          transition: "0ms ease-out",
          transitionDelay: "0ms",
        },
        "&.opened > .image": {
          opacity: "0",
          transform: "translateX(393px)",
          transition: "500ms ease-out",
          transitionDelay: "1500ms",
        },
        "& > .image .overlay": {
          opacity: "0.5",
          transition: "0ms ease-out",
          transitionDelay: "0ms",
        },
        "&.opened > .image .overlay": {
          opacity: "0",
          transition: "500ms ease-out 500ms",
          transitionDelay: "500ms",
        },
        "& > .text": {
          opacity: "1",
          transition: "0ms ease-out",
          transitionDelay: "0ms",
        },
        "&.opened > .text": {
          opacity: "0",
          transition: "500ms ease-out",
          transitionDelay: "0ms",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgb(0,142,145)",
          background:
            _get(gradientStyle, "background") ||
            "linear-gradient(35deg, rgba(0,142,145,1) 0%, rgba(255,171,112,1) 100%)",
          opacity: _get(gradientStyle, "opacity") || 0.95,
        }}
      />
      <Box
        className="image"
        sx={{
          position: "absolute",
          inset: 0,
          p: 3,
        }}
      >
        <Box
          sx={{
            position: "relative",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 512,
            maxHeight: 851,
            height: "100%",
            width: "100%",
            boxShadow: "0px 0px 36px -16px grey",
          }}
        >
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgb(0,142,145)",
              background:
                _get(gradientStyle, "background") ||
                "linear-gradient(35deg, rgba(255,171,112,1) 0%, rgba(0,142,145,1) 100%)",
              opacity: _get(gradientStyle, "opacity") || 0.5,
            }}
          />
          <Box
            as="img"
            src={imageUrl}
            sx={{
              display: "block",
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
      <Flex
        className="text"
        sx={{
          position: "absolute",
          inset: 0,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Flex
          sx={{
            flexDirection: "column",
            py: 4,
            px: 4,
            color: "white",
            textAlign: "center",
            maxWidth: 512,
            maxHeight: "100vh",
            width: "100%",
            height: "100%",
          }}
        >
          <Box sx={{ textShadow: "1px 1px 4px rgba(0,0,0,0.65)" }}>
            <Box sx={{ fontSize: 2, fontWeight: "bold", mb: 2, mt: 4 }}>
              {_get(descriptions, "one") || "Dear Mr/Mrs/Ms"}
            </Box>
            <Box
              sx={{ fontSize: 5, mb: 4 }}
              style={{
                ..._get(descriptions, "guestStyle"),
              }}
            >
              {guests}
            </Box>
            <Box sx={{ fontSize: 2, mb: 4 }}>
              {_get(descriptions, "two") || "You are invited to our wedding"}
            </Box>
          </Box>
          <Box flexGrow={1}></Box>
          <Box>
            <img
              {...frontImageAttribute}
              src={_get(frontImageAttribute, "src")}
            />
          </Box>
          <Box
            as="button"
            onClick={() => {
              handleInvitation();
            }}
            sx={{
              border: "1px solid white",
              borderColor: "gray.4",
              borderRadius: 4,
              px: 3,
              py: 2,
            }}
          >
            {loading ? "Please wait" : "Open Invitation"}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export const documentDefaultProps = {
  modalOptions: {
    open: false,
    imageUrl: "https://via.placeholder.com/150",

    descriptions: {
      one: "Dear Mr/Mrs/Ms",
      two: "You are invited to our wedding",
      guestStyle: {},
    },

    frontImageAttribute: {
      src: "https://via.placeholder.com/150x100",
      style: {},
    },

    gradientStyle: {
      background:
        "linear-gradient(35deg, rgba(255,171,112,1) 0%, rgba(0,142,145,1) 100%)",
      opacity: 0.5,
    },
  },
  musicOptions: {
    url: undefined,
    showButton: undefined,
  },
};

Document.craft = {
  name: "Document",
  props: documentDefaultProps,
  custom: {},
  related: {
    settings: DocumentSettings,
  },
};
