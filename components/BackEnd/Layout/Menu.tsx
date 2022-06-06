import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ListItem, Stack } from "@mui/material";
import Link from "next/link";
import { Layers, BarChart, Person } from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BookIcon from "@mui/icons-material/Book";
import { useRouter } from "next/router";

import Image from "next/image";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type MenuProps = {
  open: boolean;
  onDrawerClose: () => void;
};

export default function Menu({ open, onDrawerClose }: MenuProps) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Stack direction="row" alignItems="center">
          {/* <Image
            src="/static/img/cm_logo.png"
            width={200}
            height={40}
            objectFit="contain"
            alt="logo"
          /> */}
          <Image
            src="/static/images/logo.png"
            width={200}
            height={68}
            objectFit="cover"
            alt="logo"
          />
          <IconButton onClick={onDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Stack>
      </DrawerHeader>
      <Divider />
      <List>
        {/* Stock */}
        <Link href="/admin/banner" passHref>
          <ListItem
            button
            className={
              router.pathname === "/admin/banner"
                ? "Mui-selected"
                : router.pathname === "/admin/banner/add"
                ? "Mui-selected"
                : router.pathname === "/admin/banner/edit"
                ? "Mui-selected"
                : ""
            }
          >
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText primary="Banner" />
          </ListItem>
        </Link>
      </List>

      <List>
        {/* Stock */}
        <Link href="/admin/news" passHref>
          <ListItem
            button
            className={
              router.pathname === "/admin/news"
                ? "Mui-selected"
                : router.pathname === "/admin/news/add"
                ? "Mui-selected"
                : router.pathname === "/admin/news/edit"
                ? "Mui-selected"
                : ""
            }
          >
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText primary="News" />
          </ListItem>
        </Link>
      </List>

      <List>
        {/* Stock */}
        <Link href="/admin/blog" passHref>
          <ListItem
            button
            className={
              router.pathname === "/admin/blog"
                ? "Mui-selected"
                : router.pathname === "/admin/blog/add"
                ? "Mui-selected"
                : router.pathname === "/admin/blog/edit"
                ? "Mui-selected"
                : ""
            }
          >
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Blog" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}
