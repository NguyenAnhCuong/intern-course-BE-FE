"use client";

import { Badge, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageIconComponent = () => {
  const [anchorLangugeEl, setAnchorLanguageEl] = useState<null | HTMLElement>(
    null
  );
  const isOpenLanguageMenu = Boolean(anchorLangugeEl);

  const handleMenuLanguageOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorLanguageEl(event.currentTarget);
  };

  const handleLanguageSelect = (lang: string) => {
    // TODO: Cập nhật logic thay đổi ngôn ngữ tại đây
    setAnchorLanguageEl(null);
  };

  const languageId = "primary-language-menu";
  const renderLanguageMenu = (
    <Menu
      anchorEl={anchorLangugeEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={languageId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpenLanguageMenu}
      onClose={handleLanguageSelect}
    >
      <MenuItem onClick={() => handleLanguageSelect("vi")}>Tiếng Việt</MenuItem>
      <MenuItem onClick={() => handleLanguageSelect("en")}>English</MenuItem>
    </Menu>
  );

  return (
    <>
      <Tooltip title="Change Language">
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={handleMenuLanguageOpen}
        >
          <Badge>
            <LanguageIcon
              sx={{
                "&:hover": { cursor: "pointer", color: "#1976d2" },
              }}
            />
          </Badge>
        </IconButton>
      </Tooltip>
      {renderLanguageMenu}
    </>
  );
};

export default LanguageIconComponent;
