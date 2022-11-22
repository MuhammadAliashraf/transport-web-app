import app from "./firebaseconfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged ,signOut} from "firebase/auth";
import { getDatabase, ref, set, onValue, push } from "firebase/database"


const auth = getAuth(app);
const database = getDatabase(app);

let userSignUp = (obj) => {
      let { firstName, lastName, email, password,} = obj;
      return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                        const user = userCredential.user;
                        const myref = ref(database, `user/${user.uid}`);
                        obj.id = user.uid;
                        set(myref, obj)
                              .then(() => {
                                    resolve("User Done")
                              })
                              .catch((eror) => {
                                    reject(eror)
                              })
                  })
                  .catch((error) => {
                        reject(error)
                  })
      })
}

const loginuser = (obj, nodeName ) => {
      let { email, password } = obj;
      return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        const reference = ref(database, `user/${user.uid}`);
                        onValue(reference, (e) => {
                              let status = e.exists();
                              console.log(status)
                              if (status) {
                                    resolve(e.val());
                              }
                              else {
                                    reject("User Not Register Yet!")
                              }
                        })
                  })
                  .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        reject(errorMessage);

                  });

      })
}

const userlogout=()=>{
      return new Promise((resolve,reject)=>{
            signOut(auth).
            then(() => {
            resolve("User Logout")
      })
      .catch((error) => {
            reject(error)
            // An error happened.
      });
})
}

//Cheaking User login in Or Not In Current 

let UserCheaking = () => {
      return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, (user) => {
                  if (user) {
                        const uid = user.uid;
                        resolve(uid);
                  } else {
                        reject("Not User Loged in!")
                  }
            });
      })
}

// This is Funxtion sending Data in dataBase using Dynamic
// this is base to send data in db
// just make Node in data base 
let sendDataToDataBase = (obj, nodeName, id) => {
      // obj == send data in database in object form
      // nodeName== Give nodeName Where you want to send data // path
      // id=item ki id edit k case main;
      let postListRef;
      return new Promise((resolve, reject) => {
            if (id) {
                  postListRef = ref(database, `${nodeName}/${id}`);
            }
            else {
                  let addref = ref(database, nodeName);
                  obj.id = push(addref).key;
                  postListRef = ref(database, `${nodeName}/${obj.id}`);
            }
            set(postListRef, obj)
                  .then(() => {
                        resolve(`Data Send to data Base${nodeName}/${obj.id}`)
                  })
                  .catch((error) => {
                        reject(error);
                  })

      })
}

let getDataFromDataBase = (nodeName, id) => {
      let reference = ref(database, `${nodeName}/${id ? id : ""}`)
      return new Promise((resolve, reject) => {
            onValue(reference, (sanpshot) => {
                  if (sanpshot.exists()) {
                        let data = sanpshot.val();
                        // console.log(data)
                        if (id) {
                              resolve(data)
                        }
                        else {
                              let arr = (Object.values(data));
                              resolve(arr)
                        }
                  }
                  else {
                        reject("No Data Found!")
                  }
            },
                  {
                        onlyOnce: false,
                  }
            )


      })

}

export { userSignUp, loginuser, UserCheaking, sendDataToDataBase, getDataFromDataBase ,userlogout };