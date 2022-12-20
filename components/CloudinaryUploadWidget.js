import { Button, Classes, Dialog, Icon, Text } from "@blueprintjs/core";
import { Box, Flex } from "./Grid";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AspectRatio } from "./AspectRatio";
import axios from "axios";
import { generateId } from "./utils/generateId";
import { imagekit } from "./imagekit";

export const CloudinaryUploadWidget = ({ max = 1, onChange, folderTarget }) => {
  const [media, setMedia] = useState([]);

  const upload = useCallback(
    async ({ key, file }) => {
      let res = await imagekit.upload({
        file: file,
        fileName: generateId(),
        folder: folderTarget || `/manjo/assets`,
      });
      setMedia((m) => [
        ...m.map((f) => {
          if (f.key === key) {
            f.url = res.url;
          }
          return f;
        }),
      ]);
    },
    [media]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      const files = acceptedFiles.map((file) => {
        const f = {
          key: generateId(),
          file,
          url: null,
        };
        setMedia((m) => [...m, f]);
        upload(f);
        return f;
      });
    },
    [media]
  );

  const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    onChange(media);
  }, [media]);

  return (
    <Box>
      <Flex mx={-2} sx={{ flexWrap: "wrap" }}>
        {!(media.length >= max) && (
          <Box width="30%" px={2} pb={2}>
            <AspectRatio ratio="1:1">
              <Flex
                {...getRootProps()}
                height="100%"
                sx={{
                  border: "1px solid black",
                  borderRadius: 8,
                  bg: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  px: 2,
                }}
              >
                <input {...getInputProps()} />

                <Icon icon="plus" size={36} />
                <Box fontSize={"12px"} textAlign="center">
                  {isDragActive
                    ? "Drop the files here..."
                    : "Click or Drag some files here"}
                </Box>
              </Flex>
            </AspectRatio>
          </Box>
        )}
        {media.map(({ key, url, file }, id) => (
          <Box key={key} width="30%" px={2} pb={2}>
            <AspectRatio ratio="1:1">
              <Box
                sx={{
                  bg: "white",
                  height: "100%",
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid black",
                  borderRadius: 8,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <Button
                    loading={url === null}
                    icon="trash"
                    minimal={true}
                    intent="danger"
                    onClick={() =>
                      setMedia((m) => [...m.filter((_, i) => i !== id)])
                    }
                  />
                </Box>
                <Box
                  as={"img"}
                  width="100%"
                  display="block"
                  src={url || URL.createObjectURL(file)}
                />
              </Box>
            </AspectRatio>
          </Box>
        ))}
      </Flex>
      {/* <Flex mx={-2}>
        <Box px={2}>
          <Button large={true} outlined={true} icon="camera" />
        </Box>
        <Box>
          <Button large={true} outlined={true} icon="trash" />
        </Box>
      </Flex> */}
    </Box>
  );
};

export const CloudinaryUploadWidgetButton = ({ onSave, folderTarget }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const onChange = useCallback((files) => {
    setFiles(files);
  }, []);

  return (
    <>
      <Button text="Select file" onClick={() => setIsOpen(true)} />
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={Classes.DIALOG_BODY}>
          <CloudinaryUploadWidget
            onChange={onChange}
            folderTarget={folderTarget}
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              text="Close"
              minimal={true}
              onClick={() => setIsOpen(false)}
            />
            <Button
              text="Save"
              onClick={() => {
                setIsOpen(false);
                onSave(files);
              }}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};
