// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDi5XcxHiNgyTdlk_1d7MZirRuvj5h1N-A",
  authDomain: "spacehub-30f5e.firebaseapp.com",
  projectId: "spacehub-30f5e",
  storageBucket: "spacehub-30f5e.firebasestorage.app",
  messagingSenderId: "413299989764",
  appId: "1:413299989764:web:e2b1535759597b1b6dc451"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

// Sign In function
function signInWithEmail() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const messageElement = document.getElementById("auth-message");

  if (email && password) {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        messageElement.textContent = "Signed in as: " + user.email;
        messageElement.style.color = "green";
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("file-upload-container").style.display = "block";
      })
      .catch((error) => {
        messageElement.textContent = "Error: " + error.message;
        messageElement.style.color = "red";
      });
  } else {
    messageElement.textContent = "Please enter both email and password.";
    messageElement.style.color = "red";
  }
}

// Upload File to Firebase Storage
function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  const fileMessageElement = document.getElementById("file-message");

  if (file) {
    const storageRef = storage.ref('uploads/' + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Track upload progress if needed
      }, 
      (error) => {
        fileMessageElement.textContent = "Error: " + error.message;
        fileMessageElement.style.color = "red";
      }, 
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          fileMessageElement.textContent = "File uploaded successfully! URL: " + downloadURL;
          fileMessageElement.style.color = "green";
        });
      });
  } else {
    fileMessageElement.textContent = "Please select a file.";
    fileMessageElement.style.color = "red";
  }
}
