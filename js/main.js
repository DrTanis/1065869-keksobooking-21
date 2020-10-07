'use strict';

const NUMBER_OF_POSTS = 8;
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const ROOM_TYPE = ['palace', 'flat', 'house', 'bungalo'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const LOCATIONS = {
  x: {
    MIN: 0,
    MAX: 1150
  },
  y: {
    MIN: 130,
    MAX: 630
  }
};
let arrayOfPosts =[];

let mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
let mapPinsList = document.querySelector('.map__pins');
let mapElement = document.querySelector('.map');

let showMap = function(){
  mapElement.classList.remove('map--faded');
};

let getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

let getRandomIntInclusive = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

let getArrayRandomLength = function (array) {
  return array.slice(0, getRandomIntInclusive(1, array.length));
};

let createPostsArray = function(){
  for( let i = 1; i <= NUMBER_OF_POSTS; i++){
    let locationX = getRandomIntInclusive(LOCATIONS.x.MIN, LOCATIONS.x.MAX);
    let locationY = getRandomIntInclusive(LOCATIONS.y.MIN, LOCATIONS.y.MAX);
    arrayOfPosts[i - 1] = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png',
      },
      offer: {
        title: 'Lorem ipsum dolor sit.',
        address: locationX + ', ' + locationY,
        price: getRandomIntInclusive(1000, 50000),
        type: getRandomArrayElement(ROOM_TYPE),
        rooms: getRandomIntInclusive(1, 3),
        guests: getRandomIntInclusive(2, 6),
        checkin: getRandomArrayElement(CHECKIN),
        checkout: getRandomArrayElement(CHECKOUT),
        features: getArrayRandomLength(FEATURES),
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        photos: getArrayRandomLength(PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY
      },
    };
  }
  return arrayOfPosts;
}

let createDomElem = function(objJS) {
  let arrayElement = mapPinTemplate.cloneNode(true);
  let arrayImg = arrayElement.querySelector('img');
  // let arrayImg = arrayElement.querySelector('button');
  let coordX = objJS.location.x + arrayImg.width / 2;
  let coordY = objJS.location.y + arrayImg.height;
  arrayElement.style = 'left: ' + coordX + 'px; top: ' + coordY + 'px;';
  arrayImg.src = objJS.author.avatar;
  arrayImg.alt = objJS.offer.title;
  return arrayElement;
}

let createPosts = function(arrayOfData){
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < arrayOfData.length; i++){
    fragment.appendChild(createDomElem(arrayOfData[i]));
  }
  return fragment;
}

var start = function () {
  showMap();
  mapPinsList.appendChild(createPosts(createPostsArray()));
};

start();
