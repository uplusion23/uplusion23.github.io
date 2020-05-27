const firebaseConfig = {
  apiKey: "AIzaSyA2gakifF2n-6mqov6Z-FqnH7WMuWAFcOA",
  authDomain: "uplusion23-blog.firebaseapp.com",
  databaseURL: "https://uplusion23-blog.firebaseio.com",
  projectId: "uplusion23-blog",
  storageBucket: "uplusion23-blog.appspot.com",
  messagingSenderId: "254166198617",
  appId: "1:254166198617:web:0ed377262f9750ee778448",
  measurementId: "G-ERMVWKTCEM"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

function getPosts() {
  database.collection('posts').orderBy('date', 'desc').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      // This is where we load the data.
      console.log(doc.data())
      global.posts[doc.id] = doc.data();
      global.posts[doc.id].id = doc.id;
      $('[data-list="updates"]').append(`
        <div class="post" data-post="${global.posts[doc.id].id}" style="background-image: url('${global.posts[doc.id].header}')">
          <span class="description">
            <span class="category">Announcement</span>
            ${global.posts[doc.id].smallDescription}
          </span>
          <span class="title">
            <span>${global.posts[doc.id].title}</span>
          </span>
        </div>`);
    });
  });
}

const requestSignIn = () => {
  console.log('whatthefuck')
  firebase.auth().signInWithRedirect(provider);
}

firebase.auth().getRedirectResult().then(function(result) {
  console.log(result) /* ********************************* RESPONSE JSON HERE */
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
  console.log(user);
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log(error.code, error.message);
});

firebase.auth().onAuthStateChanged(function(user) {
          console.log(user);
});
