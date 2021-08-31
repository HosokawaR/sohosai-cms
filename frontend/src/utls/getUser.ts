import firebase from 'firebase'
import 'firebase/auth'

export const getUser = () => {
  return firebase.auth().currentUser
}
