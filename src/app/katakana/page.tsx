"use client"; // this is a client component

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Katakana from '../katakana.json'
import shuffle from '../functions/shuffle'
import NonSSRWrapper from '../components/no-ssr-wrapper'

function Home() {
  const shuffledKatakana = shuffle(Katakana);
  const [katakanaArray, setKatakanaArray] = useState(shuffledKatakana);
  const [currentKatakana, setCurrentKatakana] = useState(katakanaArray[0]);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [remaining, setRemaining] = useState(Katakana.length);

  const updateKana = (e: React.FormEvent) => {
    e.preventDefault();
    let newKatakanaArray = katakanaArray;
    let userInput: string = (e.target as HTMLFormElement).kana.value;
    if (userInput === currentKatakana.romanization) {
        newKatakanaArray.shift();
        newKatakanaArray = shuffle(newKatakanaArray);
        setKatakanaArray(newKatakanaArray);
        setCurrentKatakana(newKatakanaArray[0]);
        setCorrect(correct => correct + 1);
        setRemaining(remaining => remaining - 1);
        (e.target as HTMLFormElement).reset();
    } else {
        const incorrectFlashcard = newKatakanaArray[0];
        newKatakanaArray.shift();
        newKatakanaArray.push(incorrectFlashcard);
        newKatakanaArray = shuffle(newKatakanaArray);
        setIncorrect(incorrect => incorrect + 1);
        setKatakanaArray(newKatakanaArray);
        setCurrentKatakana(newKatakanaArray[0]);
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
              src={`/katakana/${currentKatakana.romanization}.svg`}
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
