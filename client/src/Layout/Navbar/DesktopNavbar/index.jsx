import React from "react";
import { Spacer } from "@chakra-ui/react";
import NavbarLink from "./NavbarLink";
import SearchBar from "../../../SearchBar";
import FeedLogin from "../../../FeedLogin";
import NavbarLayout from "./NavbarLayout";
import NavbarLogo from "./NavbarLogo";

export default function DesktopNavbar() {
  return (
    <NavbarLayout>
      <NavbarLogo />
      <NavbarLink to="/feed">Home</NavbarLink>
      <NavbarLink to="/explore">Explore</NavbarLink>
      <Spacer />
      <SearchBar />
      <Spacer />
      <NavbarLink to="/edit-creator">Edit Creators</NavbarLink>
      <FeedLogin />
    </NavbarLayout>
  );
}
