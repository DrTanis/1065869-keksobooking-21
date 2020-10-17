"use strict";

(function () {
  window.data = {
    NUMBER_OF_POSTS: 8,
    CHECKIN_LIST: [`12:00`, `13:00`, `14:00`],
    CHECKOUT_LIST: [`12:00`, `13:00`, `14:00`],
    ROOM_TYPE_LIST: [`palace`, `flat`, `house`, `bungalo`],
    FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
    PHOTOS: [
      `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
    ],
    LOCATIONS: {
      x: {
        MIN: 0,
        MAX: 1150
      },
      y: {
        MIN: 130,
        MAX: 630
      }
    },
    guestsInRooms: {
      one: [1],
      two: [1, 2],
      three: [1, 2, 3],
      hundred: [0]
    }
  };
})();

