import { db } from "../config/firebase";
import { useState, useEffect } from "react";

import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore/lite";

function Quote({ quote }) {
  const [cu, setCu] = useState(0);
  const colRef = collection(db, "quotes");
  const updateCuInDb = async (data) => {
    try {
      await setDoc(doc(colRef, quote.id), data);
  } catch (error) {
      console.log(error)
  }}

  useEffect(() => {
    const getCuFromDb = async () => {
      try {
        const q = query(colRef, where("id", "==", `${quote.id}`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => setCu(doc.data().charlieUttrance));
      } catch (error) {
        console.log(error)
      }
    };
    colRef && getCuFromDb();
  }, []);

  const handlePlus = () => {
    setCu(cu + 1);
    updateCuInDb({ id: quote.id, charlieUttrance: cu + 1 });
  };

  const handleMinus = () => {
    if (cu > 0) {
      setCu(cu - 1);
      updateCuInDb({ id: quote.id, charlieUttrance: cu - 1 });
    }
  };

  return (
    <div className="m-5">
      <div>{quote.value}</div>
      <div className="d-flex justify-content-center">
        <button className="m-2" onClick={handleMinus}>-</button>
        <p className="m-2">{cu}</p>
        <button className="m-2" onClick={handlePlus}>+</button>
      </div>
    </div>
  );
}

export default Quote;