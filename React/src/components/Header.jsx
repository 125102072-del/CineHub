import React from "react";
import Navbar from "./Navbar";
import SearchHero from "./SearchHero";

export default function Header({
  query,
  onQueryChange,
  locationText,
  onLocationChange,
  onLocationEnter,
  onLogoClick,
  user,
}) {
  return (
    <>
      <Navbar
        query={query}
        onQueryChange={onQueryChange}
        locationText={locationText}
        onLocationChange={onLocationChange}
        onLocationEnter={onLocationEnter}
        onLogoClick={onLogoClick}
        user={user}
      />
      <SearchHero locationText={locationText} />
    </>
  );
}
