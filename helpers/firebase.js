import firebase from "firebase";
// var config = {
//     apiKey: "AIzaSyAC482wwvh-1A0Yw-vlwdChLxW1Jr04zxo",
//     authDomain: "pt13353-mob.firebaseapp.com",
//     databaseURL: "https://pt13353-mob.firebaseio.com",
//     projectId: "pt13353-mob",
//     storageBucket: "pt13353-mob.appspot.com",
//     messagingSenderId: "93740380746"
//   };
  var config = {
    apiKey: "AIzaSyDQDuRr5qlTPVhuFLjQLHikiK3nvTbASoQ",
    authDomain: "andn-713fc.firebaseapp.com",
    databaseURL: "https://andn-713fc.firebaseio.com",
    projectId: "andn-713fc",
    storageBucket: "andn-713fc.appspot.com",
    messagingSenderId: "887892239577"
  };
  // var config = {
  //   apiKey: "AIzaSyBxdGV5-wk7pCTlRHdZeHC-RidXsxbn4c0",
  //   authDomain: "doan210-e17f9.firebaseapp.com",
  //   databaseURL: "https://doan210-e17f9.firebaseio.com",
  //   projectId: "doan210-e17f9",
  //   storageBucket: "",
  //   messagingSenderId: "755764847675"
  // };

export default firebaseConf =  firebase.initializeApp(config);