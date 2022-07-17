const WEATHER_API_KEY = "599fb16444104973699d45f0a32bb730";

const timeBlock = document.querySelector("#time");
const dateBlock = document.querySelector("#date");
const weatherBlock = document.querySelector("#weather");
const todoBlock = document.querySelector("#todoBlock");
const bookmarkBlock = document.querySelector("#bookmarkBlock");

const dates = ["일", "월", "화", "수", "목", "금", "토"];

// 배경 이미지
const bgImgs = ["bg0.jpg", "bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg", "bg6.jpg", "bg7.jpg", "bg8.jpg",
"gbg0.gif", "gbg1.gif", "gbg2.gif", "gbg3.gif", "gbg4.gif"];
const bgDir = "img/";
const bgImg = bgImgs[Math.floor(Math.random() * bgImgs.length)];
document.body.style.backgroundImage = `url(${bgDir}${bgImg})`;

// 시계,날짜
setInterval(() => {
  const nowTime = new Date();

  const hour = nowTime.getHours();
  const ampm = hour >= 12 ? "pm" : "am";
  let hour12h = hour;
  hour12h = hour12h >= 12 ? hour12h - 12 : hour12h;
  hour12h = hour === 0 ? 12 : hour12h;
  hour12h = String(hour12h).padStart(2, "0");

  const minute = String(nowTime.getMinutes()).padStart(2, "0");
  const second = String(nowTime.getSeconds()).padStart(2, "0");
  if (window.innerWidth <= 800) {
    timeBlock.innerHTML = `<span style="font-size: 20%;">${ampm}&nbsp;</span>${hour12h}:${minute}`;
  } else {
    timeBlock.innerHTML = `<span style="font-size: 20%;">${ampm}&nbsp;</span>${hour12h}:${minute}:${second}`;
  }
  

  const year = nowTime.getFullYear();
  const month = nowTime.getMonth();
  const date = nowTime.getDate();
  const day = dates[nowTime.getDay()];
  dateBlock.innerHTML = `${year}. ${month}. ${date}<span style="font-size: 50%;">&nbsp;(${day})</span>`;

  if (minute === "00" && nowTime.getSeconds() < 3) {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }
}, 1000);

// 날씨
function onGeoOk(position) {
  console.log(position);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${WEATHER_API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // city.innerText = data.name;
      weatherBlock.innerHTML = `<img class="weather_icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />${data.weather[0].main} / ${data.main.temp}°C / ${data.name}`;
      // weather.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />`;
    });
}
function onGeoError() {
  // weatherBlock.innerText = "-";
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// 창높이가 내용보다 작으면 위로정렬
function toggleScroll() {
  if (bookmarkBlock.scrollHeight > window.innerHeight) {
    bookmarkBlock.setAttribute("style", "justify-content: flex-start;")
  } else {
    bookmarkBlock.removeAttribute("style")
  }
  
  if (todoBlock.scrollHeight > window.innerHeight) {
    todoBlock.setAttribute("style", "justify-content: flex-start;")
  } else {
    todoBlock.removeAttribute("style")
  }
}

function checkNeedScroll() {
  console.log(bookmarkBlock.scrollTop)
  scrollTo({top: 100, behavior: 'smooth'})
  console.log(bookmarkBlock.scrollTop)
  if (bookmarkBlock.scrollTop == 1) {    
    bookmarkBlock.setAttribute("style", "justify-content: flex-start;")
  }
}

window.addEventListener("resize", toggleScroll);