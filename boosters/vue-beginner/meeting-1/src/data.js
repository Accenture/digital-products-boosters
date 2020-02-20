import bianchiLupoImage from "./assets/bianchi_lupo.jpeg";
import ridleyXTrailImage from "./assets/ridley_x_trail.jpeg";
import julianaQuincyImage from "./assets/juliana_quincy.jpeg";
import raleighRxImage from "./assets/raleigh_rx.jpeg";

export default [
  {
    bikeImage: bianchiLupoImage,
    comments: [
      {
        id: 1,
        user: { firstName: "Johnny", lastName: "Clipins" },
        text: "What a great bike!"
      },
      {
        id: 2,
        user: { firstName: "Esther", lastName: "Sprocket" },
        text: "That bike is totally tubular!"
      },
      {
        id: 7,
        user: { firstName: "Ezra", lastName: "Handbreak" },
        text: "How do I love thee Bianchi? Let me count the ways..."
      }
    ],
    id: 1,
    name: "Bianchi Lupo",
    price: 1000,
    qty: 5
  },
  {
    bikeImage: ridleyXTrailImage,
    comments: [
      {
        id: 3,
        user: { firstName: "Mirza", lastName: "Spokesman" },
        text: "Beautiful ride"
      },
      {
        id: 4,
        user: { firstName: "Dorian", lastName: "Crossbar" },
        text: "Bikealicious!"
      }
    ],
    id: 2,
    name: "Ridley X-Trail",
    price: 1300,
    qty: 3
  },
  {
    bikeImage: julianaQuincyImage,
    comments: [
      {
        id: 5,
        user: { firstName: "Johnny", lastName: "Clipins" },
        text: "Congratulations for building..."
      }
    ],
    name: "Juliana Quincy",
    id: 3,
    price: 3600,
    qty: 2
  },
  {
    bikeImage: raleighRxImage,
    comments: [
      {
        id: 5,
        user: { firstName: "Mirza", lastName: "Spokesman" },
        text: "your first Vue app!"
      }
    ],
    id: 4,
    name: "Raleigh RX",
    price: 500,
    qty: 7
  }
];
