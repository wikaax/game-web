import React, { useRef } from 'react';
import { addDoc, collection } from '@firebase/firestore';
import { firestore } from '../config/firebaseConfig';

const CreateGame = () => {
  const titleRef = useRef();
  const companyNameRef = useRef();
  const releaseDateRef = useRef();
  const contentRef = useRef();

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current.value,
      companyName: companyNameRef.current.value,
      releaseDate: releaseDateRef.current.value,
      content: contentRef.current.value,
    };

    try {
      const gamesRef = collection(firestore, 'games');
      await addDoc(gamesRef, data);
      console.log('Gra została dodana do bazy danych');
    } catch (e) {
      console.error('Błąd podczas dodawania gry', e);
    }
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSave} className="white">
          <h5 className="grey-text text-darken-3">Stwórz grę</h5>
          <div className="input-field">
            <label htmlFor="title">title</label>
            <input type="text" id="title" ref={titleRef} />
          </div>
          <div className="input-field">
            <label htmlFor="companyName">company name</label>
            <input type="text" id="companyName" ref={companyNameRef} />
          </div>
          <div className="input-field">
            <label htmlFor="releaseDate">release date</label>
            <input type="text" id="releaseDate" ref={releaseDateRef} />
          </div>
          <div className="input-field">
            <label htmlFor="content">game content</label>
            <textarea id="content" className="materialize-textarea" ref={contentRef}></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0" type="submit">Stwórz grę</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
