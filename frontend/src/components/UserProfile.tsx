import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import PinNavBar from "./PinNavBar";
import Container from "@mui/material/Container";
import { useServerUser, useUser } from "../api/user";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();
  const userQuery = useServerUser(id);
  const [self] = useUser();
  const isSelf = self?.id === id;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <PinNavBar position="static" />
      <Container maxWidth="md" sx={{ padding: "1.5em" }}>
        <Grid
          container
          spacing={1}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Avatar sx={{ width: 120, height: 120 }} />
          </Grid>
          <Grid item>
            <Typography variant="h4">
              {userQuery.data?.name ?? "이름"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">@{id ?? "아이디"}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">{"n"}명이 팔로우</Typography>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid item display={isSelf ? "none" : "flex"}>
              <Button variant="contained">팔로우</Button>
            </Grid>
            <Grid item display={isSelf ? "flex" : "none"}>
              <Button variant="outlined">프로필 수정</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
