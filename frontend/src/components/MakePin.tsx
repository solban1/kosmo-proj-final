import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Autocomplete,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { Mutation, useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import PinNavBar from "./PinNavBar";
import Profiletext from "./Profiletext";
import axios from "axios";
import { SERVER_URL } from "../api/globals";
import Pin from "./Pin";
import { useNavigate } from "react-router-dom";
import { useUser } from "../api/user";

function MakePin() {
  const options = ["보드선택", "보드<1>", "보드<2>", "확인용보드"];
  const [imgFile, setImgFile] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);
  const [seq, setSeq] = useState<number>(-1);
  useEffect(() => {
    console.log(seq);
  }, [seq]);
  const navigate = useNavigate();

  const saveImgFile = () => {
    let file: File | null = null;
    if (imgRef.current?.files != null && imgRef.current.files.length !== 0) {
      file = imgRef.current.files[0];
    }

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImgFile(reader.result);
        }
      };
    }
  };
  const deleteFileImage = () => {
    URL.revokeObjectURL(imgFile);
    setImgFile("");
  };
  const handleImageClick = () => {
    if (imgRef.current) {
      imgRef.current.click(); // input 클릭 이벤트를 발생시킵니다.
    }
  };

  const [selectedTags, setSelectedTags] = useState(Array<object>());
  const tagsRef = useRef<React.ReactElement>(null);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    // setAnchorEl(anchorRef.current);
    // setAnchorEl(event.target as HTMLDivElement);
    // console.log(anchorEl);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  interface Pin {
    pinSeq: number;
    pinTitle: string;
    pinDesc: string;
    image?: string;
    writer: string;
  }

  interface UpImage {
    imgSeq: number;
  }

  const [pinTitle, setpinTitle] = useState("");
  const [pinDesc, setpinDesc] = useState("");

  async function handleSubmit() {
    const { imgSeq } = await createImage();
    const imgUrl = `/upImages/${imgSeq}`;
    await uploadImage(imgSeq);
    const { pinSeq } = await createPin(imgUrl);
    await createTag(pinSeq);
    alert("핀이 생성되었습니다.");
    navigate("/feed");
  }

  const createImage = async () => {
    const response = await fetch(`${SERVER_URL}/upImages`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json() as Promise<UpImage>;
  };

  const uploadImage = async (id: number) => {
    if (!imgRef.current?.files) {
      throw new Error("No file selected");
    }
    const response = await fetch(`${SERVER_URL}/upImages/${id}/content`, {
      method: "PUT",
      body: imgRef.current.files[0],
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
    return response;
  };

  const createPin = async (imageUrl: string) => {
    const data = await fetch(`${SERVER_URL}/pins`, {
      method: "POST",
      body: JSON.stringify({
        pinTitle: pinTitle,
        pinDesc: pinDesc,
        image: imageUrl,
        writer: `${SERVER_URL}/members/${userId}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.json() as Promise<Pin>;
  };

  //로그인 중인 userId 값 가지고 옴
  const [user] = useUser();
  const userId = user?.id;

  const createTag = async (seq: number) => {
    const tagIds = selectedTags.map((tag) => tag.reason);
    console.log("tagIds: ", tagIds);
    console.log("tag의 seq: ", seq);
    for (const tag of tagIds) {
      await fetch(`${SERVER_URL}/tags`, {
        method: "POST",
        body: JSON.stringify({
          tagId: {
            tagName: tag,
            pin: `${SERVER_URL}/pins/${seq}`,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //return data;
      // 여기에서 data를 사용하거나 필요한 작업 수행
    }
  };

  return (
    <Container>
      <PinNavBar />
      <Box>
        <div style={styles.mainscreen}>
          <div>
            <div style={styles.startmainscreen}>
              <div style={styles.fileupscreen}>
                <div style={styles.searchbar}>
                  <div style={styles.searchbutton}></div>
                  <div style={styles.searchbutton2}>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ ml: 27, mr: 1 }}
                      onClick={() => {
                        handleSubmit().catch((e) => {
                          console.error(e);
                        });
                      }}
                    >
                      저장
                    </Button>
                  </div>
                </div>
                <div style={styles.fileandtext}>
                  <div style={styles.fileandtext2}>
                    <div style={styles.fileupload}>
                      <div style={styles.fileupload2}>
                        {imgFile && (
                          <>
                            <div style={styles.fileupload3img}>
                              <img
                                src={imgFile}
                                alt="업로드 할 이미지"
                                style={styles.imgStyle}
                              />
                            </div>
                            <div
                              style={{
                                position: "relative",
                                right: 30,
                                bottom: 580,
                                width: 50.97,
                                height: 50.97,
                                borderRadius: "50%",
                                backgroundColor: "lightgray",
                                zIndex: 1,
                              }}
                            >
                              <IconButton onClick={deleteFileImage}>
                                <DeleteForeverIcon fontSize={"large"} />
                              </IconButton>
                            </div>
                          </>
                        )}

                        <Box
                          component="div"
                          sx={{
                            display: imgFile ? "none !important" : "inherit",
                          }}
                          style={styles.fileupload3}
                        >
                          <div style={styles.inputpadding}>
                            <div style={styles.inputinline}>
                              <div style={styles.inputtext}>
                                <div style={styles.inputtext2}>
                                  <div
                                    style={{
                                      ...styles.visibleWrapper,
                                      pointerEvents: imgFile ? "none" : "auto",
                                    }}
                                    onClick={
                                      !imgFile ? handleImageClick : undefined
                                    }
                                  >
                                    {!imgFile && (
                                      <div style={styles.overlayText}>
                                        드래그하거나 클릭하여 업로드
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <input
                                aria-label="파일 업로드"
                                id="media-upload-input-5d6df17c-e614-4193-9f8c-6ca3ea8c0a82"
                                data-test-id="media-upload-input-5d6df17c-e614-4193-9f8c-6ca3ea8c0a82"
                                type="file"
                                accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
                                aria-hidden="true"
                                tabIndex={-1}
                                style={styles.fileupstyle}
                                ref={imgRef}
                                onChange={saveImgFile}
                              />
                            </div>
                          </div>
                        </Box>
                      </div>
                    </div>
                    <div style={styles.textbox}>
                      <div style={styles.textbox2}>
                        <div style={styles.titletext}>
                          <div style={styles.titletext2}>
                            <div style={styles.titletext2}>
                              <div style={styles.titletexttitle}>
                                <TextField
                                  id="standard-textarea"
                                  label="제목 입력"
                                  placeholder="모두의 이목을 끌 제목을 입력해보세요!"
                                  multiline
                                  value={pinTitle}
                                  onChange={(e) => setpinTitle(e.target.value)}
                                  variant="standard"
                                  fullWidth
                                  InputLabelProps={{ style: { fontSize: 20 } }}
                                  InputProps={{
                                    sx: {
                                      "& ::placeholder": {
                                        fontSize: 40,
                                      },
                                      fontSize: 30,
                                    },
                                  }}
                                />
                              </div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                        <div style={styles.profileline}>
                          <Profiletext />
                        </div>
                        <div style={styles.explaintext}>
                          <TextField
                            id="standard-textarea"
                            placeholder="사람들에게 이 핀에 대해서 설명해 보세요!"
                            // multiline
                            variant="standard"
                            value={pinDesc}
                            onChange={(e) => setpinDesc(e.target.value)}
                            fullWidth
                            InputLabelProps={{ style: { fontSize: 20 } }}
                            InputProps={{
                              sx: {
                                "& ::placeholder": {
                                  fontSize: 20,
                                },
                                fontSize: 20,
                              },
                            }}
                          />
                        </div>
                        <div style={styles.tagdiv}>
                          {imgFile && (
                            <Autocomplete
                              multiple
                              id="tags-standard"
                              options={imIdiot}
                              getOptionLabel={(option) => option.reason}
                              getOptionDisabled={() => selectedTags.length > 4}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                  label="태그"
                                  placeholder="태그를 적어보세요!"
                                />
                              )}
                              ref={tagsRef}
                              onChange={(_, value) => setSelectedTags(value)}
                              value={selectedTags}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Container>
  );
}
const imIdiot = [
  { reason: "idk :(", why: 123 },
  { reason: "i know why :D", why: 123 },
  { reason: "whatdoido? :(", why: 123 },
  { reason: "bold :(", why: 123 },
  { reason: "rottenanion :(", why: 123 },
  { reason: "nerd :(", why: 123 },
  { reason: "puppy :D", why: 123 },
  { reason: "bark bard :O", why: 123 },
  { reason: "bobisgood :(", why: 123 },
  { reason: "kick :m", why: 123 },
  { reason: "bearisdanger :(", why: 123 },
  { reason: "can i fly? :/", why: 123 },
  { reason: "ca", why: 123 },
];

const styles: Record<string, React.CSSProperties> = {
  Body: {
    margin: 0,
  },
  mainscreen: {
    paddingTop: 55.972,
    boxSizing: "border-box",
    display: "block",
  },
  startmainscreen: {
    top: 55.972,
    boxSizing: "border-box",
    display: "flex",
    backgroundColor: "#fff8fa",
    position: "fixed",
    flexDirection: "column",
    left: "0",
    bottom: "0",
    right: "0",
    padding: 100,
    alignItems: "center",
  },
  fileupscreen: {
    textAlign: "center",
    boxSizing: "border-box",
    position: "relative",
    flexDirection: "column",
    display: "flex",
    height: 700,
    backgroundColor: "white",
    borderRadius: 16,
    width: 900,
    justifyContent: "center",
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
  searchbar: {
    marginBottom: 15,
    boxSizing: "border-box",
    display: "flex",
  },
  searchbutton: {
    minWidth: 320,
    minHeight: 40,
    alignItems: "center",
    margin: 0,
    display: "flex",
  },
  searchbutton2: {
    minWidth: 250,
    minHeight: 40,
    alignItems: "center",
    margin: 0,
    display: "flex",
    paddingLeft: 210,
  },
  scrollbutton: {
    alignItems: "center",
    backgroundColor: "rgb(239, 239, 239)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexGrow: 1,
    height: 40,
    justifyContent: "spaceBetween",
    minWidth: 0,
    width: 190,
    outline: 0,
    padding: "0px 0px 0px 14px",
    position: "relative",
    borderRadius: "8px 0px 0px 8px",
    pointerEvents: "auto",
  },
  scrollbutton2: {
    backgroundColor: "rgb(230, 0, 35)",
    border: "none",
    cursor: "pointer",
    flex: "0 0 auto",
    height: "40px",
    width: 60,
    outline: "0px",
    padding: "0px 14px",
    borderRadius: "0px 8px 8px 0px",
    pointerEvents: "auto",
  },
  fileandtext: {
    boxSizing: "border-box",
    display: "block",
  },
  fileandtext2: {
    paddingBottom: 40,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
  },
  fileupload: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    width: 300,
    height: 570,
  },
  fileupload2: {
    boxSizing: "border-box",
    display: "block",
    width: 300,
    height: "100%",
    flex: "1 1 auto",
  },
  fileupload3: {
    backgroundColor: "rgb(239, 239, 239)",
    boxShadow: "none",
    height: "100%",
    borderRadius: 8,
    boxSizing: "border-box",
    display: "block",
    position: "relative",
  },
  fileupload3img: {
    boxShadow: "none",
    height: "100%",
    borderRadius: 8,
    boxSizing: "border-box",
    display: "block",
    position: "relative",
  },
  fileupstyle: {
    cursor: "pointer",
    height: "100%",
    opacity: 0,
    position: "absolute",
    width: "100%",
    left: 0,
    top: 0,
    fontSize: 0,
  },
  inputpadding: {
    height: "100%",
    borderRadius: "12px",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingTop: 12,
    width: "100%",
    display: "block",
  },
  inputinline: {
    border: "2px dashed rgb(218, 218, 218)",
    borderRadius: 6,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    marginBottom: 4,
    marginTop: 4,
    flexDirection: "column",
    display: "flex",
  },
  inputtext: {
    width: 270,
    boxSizing: "border-box",
    paddingLeft: 48,
    paddingRight: 48,
    marginTop: 16,
    display: "block",
  },
  inputtext2: {
    wordBreak: "break-all",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 14,
    color: "#111",
    display: "block",
  },
  textbox: {
    minHeight: 510,
    width: "100%",
    flex: "1 1 auto",
    boxSizing: "border-box",
    paddingLeft: 40,
    display: "block",
  },
  textbox2: {
    height: 570,
    width: 480,
    boxSizing: "border-box",
    position: "absolute",
    display: "block",
  },
  titletext: {
    boxSizing: "border-box",
    marginTop: 32,
    width: "100%",
    display: "block",
  },
  titletext2: {
    boxSizing: "border-box",
    marginTop: 32,
    width: "100%",
    display: "block",
  },
  titletext3: {
    boxSizing: "border-box",
    width: "100%",
    flexDirection: "column",
    display: "flex",
  },
  titletexttitle: {
    boxSizing: "border-box",
    position: "relative",
    width: "100%",
    display: "block",
    backgroundColor: "white",
  },
  titletextarea: {
    backgroundColor: "white",
    width: 480,
    color: "black",
  },
  profileline: {
    boxSizing: "border-box",
    marginTop: 16,
    width: "100%",
    display: "block",
  },
  explaintext: {
    flex: "1 1 auto",
    minHeight: 0,
    minWidth: 0,
    boxSizing: "border-box",
    marginTop: 24,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  inputWrapper: {
    position: "relative",
    display: "inline-block",
  },
  inputStyle: {
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  imgStyle: {
    width: "100%", // 혹은 필요한 크기로 조절
    height: "auto", // 비율 유지
    maxHeight: 570,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    borderRadius: 16,
  },
  overlayText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  },
  tagdiv: {
    paddingTop: 30,
    paddingBottom: 10,
  },
};

export default MakePin;
