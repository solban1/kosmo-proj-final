import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import {
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useServerUser } from "../api/user";
import { SERVER_URL } from "../api/globals";

export default function AccountSetting() {
  const [, setCountry] = React.useState("");
  const result = useServerUser();
  const data = result.data;
  // const pwd = data ? data.pwd : ""; //값을 수정 안되게할때
  const email = data?.id + "@pinterest.clone";
  const [pwd, setPwd] = useState<string>(data?.pwd ?? ""); //값을 수정할 수 있게 할때
  const [birth, setBirth] = React.useState<Dayjs | null>(dayjs(data?.birth));

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
  };

  //비밀번호 변경
  const changePwd = () => {
    //const json = JSON.stringigy({ pwd: pwd }); 로 빼면 body: json, 만 넣으면 됌
    fetch(SERVER_URL + "/members/" + data?.id, {
      //로그인된 계정의 페이지를 가져와야하기때문에
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pwd: pwd, //앞pwd:backend_member  뒤pwd: useState
      }),
    })
      .then((response) => {
        if (response.ok) {
          //res.sucess랑은 다른 개념
          alert("비밀번호가 변경되었습니다.");
        } else {
          alert("비밀번호 변경에 실패하였습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        계정 관리
      </Typography>
      <Typography gutterBottom fontSize={15}>
        개인 정보 또는 계정 유형을 변경합니다.
      </Typography>
      <br />
      <Typography variant="h6" gutterBottom fontWeight="bold">
        내 계정
      </Typography>
      <Typography gutterBottom fontSize={12}>
        이메일 · 비공개
      </Typography>
      <TextField
        id="email"
        placeholder="이메일을 적어주세요"
        variant="outlined"
        style={{ width: "95%", height: "80px" }}
        value={email}
      />

      <br />
      <Typography gutterBottom fontSize={12}>
        비밀번호
      </Typography>
      <TextField
        id="password"
        type="password"
        placeholder="비밀번호를 적어주세요"
        autoComplete="current-password"
        style={{ width: "78%", height: "80px" }}
        onChange={(e) => {
          setPwd(e.target.value);
        }}
        value={pwd}
      />
      <Button
        variant="outlined"
        sx={{
          m: 2,
          color: "black",
          borderColor: "gray",
          bgcolor: "background.paper",
          fontWeight: "bold",
        }}
        onClick={changePwd}
      >
        변경
      </Button>

      <Typography variant="h6" gutterBottom fontWeight="bold">
        개인 정보
      </Typography>

      <Typography gutterBottom fontSize={12}>
        생년월일
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DatePicker onChange={(newBirth) => setBirth(newBirth)} value={birth} />
        <div style={{ margin: "1em 0" }}></div>
      </LocalizationProvider>

      <FormControl>
        <Typography gutterBottom fontSize={12}>
          성별
        </Typography>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="남성" />
          <FormControlLabel value="male" control={<Radio />} label="여성" />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label="둘다아님"
          />
        </RadioGroup>
      </FormControl>
      <div style={{ margin: "1em 0" }}></div>

      <Typography gutterBottom fontSize={12}>
        국가/지역
      </Typography>
      <FormControl fullWidth>
        <Select onChange={handleChange}>
          <MenuItem value={1}>네덜란드</MenuItem>
          <MenuItem value={2}>뉴질랜드</MenuItem>
          <MenuItem value={3}>대만</MenuItem>
          <MenuItem value={4}>대한민국(대한민국)</MenuItem>
          <MenuItem value={5}>독일</MenuItem>
          <MenuItem value={6}>러시아</MenuItem>
          <MenuItem value={7}>몽골</MenuItem>
          <MenuItem value={8}>미국</MenuItem>
          <MenuItem value={9}>베트남</MenuItem>
          <MenuItem value={10}>사우디아라비아</MenuItem>
          <MenuItem value={11}>스웨덴</MenuItem>
          <MenuItem value={12}>스위스</MenuItem>
          <MenuItem value={13}>스페인</MenuItem>
          <MenuItem value={14}>싱가폴</MenuItem>
          <MenuItem value={15}>영국</MenuItem>
          <MenuItem value={16}>오스트레일리아</MenuItem>
          <MenuItem value={17}>우크라이나</MenuItem>
          <MenuItem value={18}>일본</MenuItem>
          <MenuItem value={19}>중국</MenuItem>
          <MenuItem value={20}>태국</MenuItem>
          <MenuItem value={21}>캐나다</MenuItem>
          <MenuItem value={22}>포르투갈</MenuItem>
          <MenuItem value={23}>프랑스</MenuItem>
          <MenuItem value={24}>핀란드</MenuItem>
          <MenuItem value={25}>필리핀</MenuItem>
          <MenuItem value={26}>헝가리</MenuItem>
        </Select>
      </FormControl>
      <div style={{ margin: "1em 0" }}></div>
    </Box>
  );
}
