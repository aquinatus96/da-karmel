const googleMap = document.getElementById("enableGoogleMaps");
const googleMapClose = document.querySelector(".googlemap__close");
let isMobile = window.matchMedia("only screen and (max-width: 1024px)").matches;

const disableGoogleMaps = e => {
  if (!isMobile) {
    googleMap.classList.toggle("googlemap__info--map-enabled");
  }
};

const enableGoogleMaps = e => {
  console.log(e);

  if (!isMobile && e.code === "Enter") {
    console.log("⚡⚡⚡");
    googleMap.classList.toggle("googlemap__info--map-enabled");
  }
};

googleMapClose.addEventListener("click", e => {
  return disableGoogleMaps(e);
});

window.addEventListener("keydown", e => {
  return enableGoogleMaps(e);
});
