import { addDoc, collection } from "@firebase/firestore";
import {firestore} from "./config/firebaseConfig"
import React, {useRef} from "react";

export default function Home() {
    const messageRef = useRef();
    const ref = collection(firestore, "messages");

    const handleSave = async(e) => {
        e.preventDefault();
        console.log(messageRef.current.value);

        let data = {
            message: messageRef.current.value
        }

        try {
            addDoc(ref, data);
        }catch(e) {
            console.log('error');
        }

    }

    return (
        <div>
            <form onSubmit={handleSave}>
                <label>Enter message</label>
                <input type="text" ref={messageRef} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}