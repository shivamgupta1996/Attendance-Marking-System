import firebase_devKeys from "./firebase_dev"
import firebase_prodkeys from "./firebase_prod"

let firebase_config

if (process.env.NODE_ENV === "production") {
    firebase_config = firebase_prodkeys
} else {
    firebase_config = firebase_devKeys
}

export default firebase_config