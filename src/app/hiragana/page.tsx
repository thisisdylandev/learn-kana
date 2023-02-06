"use client"; // this is a client component

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Hiragana from '../hiragana.json'
import shuffle from '../functions/shuffle'
import NonSSRWrapper from '../components/no-ssr-wrapper'

function Home() {
  const shuffledHiragana = shuffle(Hiragana);
  const [hiraganaArray, setHiraganaArray] = useState(shuffledHiragana);
  const [currentHiragana, setCurrentHiragana] = useState(hiraganaArray[0]);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [remaining, setRemaining] = useState(Hiragana.length);

  const updateKana = (e: React.FormEvent) => {
    e.preventDefault();
    let newHiraganaArray = hiraganaArray;
    let userInput: string = (e.target as HTMLFormElement).kana.value;
    if (userInput === currentHiragana.romanization) {
        newHiraganaArray.shift();
        newHiraganaArray = shuffle(newHiraganaArray);
        setHiraganaArray(newHiraganaArray);
        setCurrentHiragana(newHiraganaArray[0]);
        setCorrect(correct => correct + 1);
        setRemaining(remaining => remaining - 1);
        (e.target as HTMLFormElement).reset();
    } else {
        const incorrectFlashcard = newHiraganaArray[0];
        newHiraganaArray.shift();
        newHiraganaArray.push(incorrectFlashcard);
        newHiraganaArray = shuffle(newHiraganaArray);
        setIncorrect(incorrect => incorrect + 1);
        setHiraganaArray(newHiraganaArray);
        setCurrentHiragana(newHiraganaArray[0]);
        (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <NonSSRWrapper>
      <header className="text-right mb-8 mr-6">
        <Link href="/" className="mx-auto">HOME</Link>
        <p>Correct: {correct}</p>
        <p>Incorrect: {incorrect}</p>
        <p>Remaining: {remaining}</p>
      </header>
      <section className="min-w-full">
        <div className="mx-auto px-10 py-5 bg-white border border-gray-200 rounded-lg shadow max-w-sm">
          <Image
              src={`/hiragana/${currentHiragana.char_id}`}
              className="mb-4 max-h-64 max-w-64"
              alt=""
              width={500}
              height={500}
            />
          <form onSubmit={(e) => {updateKana(e)}}>
            <input type="text" name="kana" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto"/>
          </form>
        </div>
      </section>
    </NonSSRWrapper>
  )
}

export default Home
