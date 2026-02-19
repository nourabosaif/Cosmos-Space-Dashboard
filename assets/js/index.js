// toggling between pages

const navLinks = document.getElementsByClassName("nav-link");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    if (navLinks[i].getAttribute("data-section") === "today-in-space") {
      document.getElementById("today-in-space").classList.remove("hidden");
      document.getElementById("launches").classList.add("hidden");
      document.getElementById("planets").classList.add("hidden");
      localStorage.setItem("currentSection", "today-in-space");
    } else if (navLinks[i].getAttribute("data-section") === "launches") {
      document.getElementById("launches").classList.remove("hidden");
      document.getElementById("today-in-space").classList.add("hidden");
      document.getElementById("planets").classList.add("hidden");
      localStorage.setItem("currentSection", "launches");
    } else {
      document.getElementById("planets").classList.remove("hidden");
      document.getElementById("today-in-space").classList.add("hidden");
      document.getElementById("launches").classList.add("hidden");
      localStorage.setItem("currentSection", "planets");
    }

    navLinks[i].classList.add("bg-blue-500/10", "text-blue-400");
    navLinks[i].classList.remove("text-slate-300", "hover:bg-blue-800");
    for (let j = 0; j < navLinks.length; j++) {
      if (j !== i) {
        navLinks[j].classList.remove("bg-blue-500/10", "text-blue-400");
        navLinks[j].classList.add("text-slate-300", "hover:bg-blue-800");
      }
    }
  });
}

if (localStorage.getItem("currentSection")) {
  const currentSection = localStorage.getItem("currentSection");
  document.querySelector(`.nav-link[data-section="${currentSection}"]`).click();
}

const resolution = document.getElementById("resolution");

var dateNow = new Date().toISOString().split("T")[0];
loadTodayInSpace(dateNow);

// today in space section

async function loadTodayInSpace(date) {
  document.getElementById("apod-loading").classList.remove("hidden");
  document.getElementById("apod-image").classList.add("hidden");
  document.getElementById("apod-explanation").innerHTML = "loading...";

  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=4MCm1KBc7oV2JQYnYesGNKluz52jSAN5N0pgaYTF&date=${date}`,
  )
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      console.log(response);

      document.getElementById("apod-image").setAttribute("src", response.hdurl);
      document.getElementById("apod-title").innerHTML = response.title;
      document.getElementById("apod-explanation").innerHTML =
        response.explanation;
      document.getElementById("apod-copyright").innerHTML = response.copyright;
      let dateString = response.date;
      let date = new Date(dateString);
      let formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      document.getElementById("apod-date-detail").innerHTML = formattedDate;
      document.getElementById("apod-date-info").innerHTML = formattedDate;
      document.getElementById("apod-date").innerHTML =
        "Astronomy Picture of the Day - " + formattedDate;
      resolution.addEventListener("click", function () {
        window.location.href = response.url;
      });
    })
    .finally(() => {
      document.getElementById("apod-loading").classList.add("hidden");
      document.getElementById("apod-image").classList.remove("hidden");
    });
}

let searchDate = document.getElementById("apod-date-input");
const loadBtn = document.getElementById("load-date-btn");
const todayDate = document.getElementById("today-apod-btn");

loadBtn.addEventListener("click", function () {
  loadTodayInSpace(searchDate.value);
  console.log(searchDate);
});

todayDate.addEventListener("click", function () {
  loadTodayInSpace(dateNow);
  searchDate.value = "";
});

// Launches
loadLaunches();
launchesCards();

async function loadLaunches() {
  fetch("https://ll.thespacedevs.com/2.3.0/launches/upcoming")
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      console.log(response.results);
      launchesCards(response.results);
      document.getElementById("featured-launch").innerHTML = `<div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        Go
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${response.results[0].name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${response.results[0].launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>Starship</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">2</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">March 14, 2024</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">12:00 PM UTC</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">Starbase, Texas</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">USA</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${response.results[0].mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                    <img src="${response.results[0].image.image_url}" alt="Launch Image" class="w-full h-full object-cover"/>
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                      <i class="fas fa-rocket text-9xl text-slate-700/50"></i>
                    </div>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>`;
    });
}

function launchesCards(launches) {
  let cartona = ``;
  for (var i = 1; i < launches.length; i++) {
    //let launchDate=launches[i].net.toISOString().split('T')[0];
    cartona += ` <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <img src="${launches[i].image.image_url}" alt="Launch Image" class="w-full h-full object-cover"/> 
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    Go
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                   ${launches[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    SpaceX
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">Mar 15, 2024</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">23:00 UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">Falcon 9</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">KSC, LC-39A</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`;
  }
  document.getElementById("launches-grid").innerHTML = cartona;
}
