window.data = {};

// función para registrar usuario con mail y password
window.data.register = (makeMail, makePassword) => {
  firebase.auth().createUserWithEmailAndPassword(makeMail, makePassword).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('errorCode', errorCode, 'errorMessage', errorMessage);
  });
};


// función para ingresar con mail y password
window.data.ingress = (connectMail, connectPassword) => {
  firebase.auth().signInWithEmailAndPassword(connectMail, connectPassword).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('errorCode', errorCode, 'errorMessage', errorMessage);
  });
};


// función para conectar con facebook
window.data.loginFace = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      console.log('login con facebook');
    })
    .catch((error) => {
      console.log('error de firebase > ' + error.code);
      console.log('error de firebase, mensaje > ' + error.message);
    });
};


// función para cerrar sesión
window.data.logOut = () => {
  firebase.auth().signOut()
    .then(() => {
    })
    .catch(() => {
    });
};

window.data.readWall = () => {

  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true };
  firestore.settings(settings);
  return firestore.collection('Wall').get().then((wallMessages) => {
    return wallMessages;
  });
};


window.data.writeWall = (dataWall) => {

  const firestore = firebase.firestore();
  return firestore.collection('Wall').doc().set({
    date: dataWall.date,
    email: dataWall.email,
    message: dataWall.message,
    name: dataWall.name,
    photoURL: dataWall.photoURL,
    uid: dataWall.uid
  }).then(() => {
    console.log('Document successfully written!');
  }).catch((error) => {
    console.error('Error writing document: ', error);
  });
};