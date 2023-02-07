'use client'; // this is a client component

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Hiragana from '../hiragana.json';
import Katakana from '../katakana.json';
import shuffle from '../functions/shuffle';
import Header from '../components/header';
import NonSSRWrapper from '../components/no-ssr-wrapper';
import { KanaType } from '@/types/kana';

function Quiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kana = searchParams.get('kana') === 'hiragana' ? Hiragana : Katakana;
  const columns = searchParams?.get('columns')?.split(',') || ['root'];

  let kanaQuiz: KanaType[] = [];
  if (columns.includes('root')) {
    kana.forEach((char) => {
      if (char.romanization.length === 1) kanaQuiz.push(char);
    });
    // remove 'n' from root kana
    kanaQuiz = kanaQuiz.filter(item => !(item.romanization === 'n'));
  }

  columns.forEach(item => {
    kana.forEach(char => {
      if (char.romanization.startsWith(item)) kanaQuiz.push(char);
    });
  });
  if (columns.includes('variants')) {
    kana.forEach(char => {
      if (
        char.romanization.startsWith('d') ||
        char.romanization.startsWith('g') ||
        char.romanization.startsWith('z') ||
        char.romanization.startsWith('j') ||
        char.romanization.startsWith('b') ||
        char.romanization.startsWith('p')
      ) {
        kanaQuiz.push(char);
      }
    });
  }
  kanaQuiz = kanaQuiz.filter(item => !(item.character.length === 2));

  if (columns.includes('h')) {
    const found = kana.filter(item => item.romanization === 'fu');
    kanaQuiz.push(found[0]);
  }
  if (columns.includes('t')) {
    const found = kana.filter(item => item.romanization === 'chi');
    kanaQuiz.push(found[0]);
  }

  if (columns.includes('combo')) {
    kana.forEach(char => {
      if (char.character.length >= 2) kanaQuiz.push(char);
    });
  }

  const shuffledKana = shuffle(kanaQuiz);

  const [kanaArray, setKanaArray] = useState(shuffledKana);
  const [currentKana, setCurrentKana] = useState(kanaArray[0]);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [remaining, setRemaining] = useState(kanaQuiz.length);
  let imageSrc = '';
  if (currentKana === undefined) {
    imageSrc = `/hiragana/a.svg`;
  } else if (kana === Hiragana) {
    imageSrc = `/hiragana/${currentKana.romanization}.svg`;
  } else {
    imageSrc = `/katakana/${currentKana.romanization}.svg`;
  }

  const updateKana = (e: React.FormEvent) => {
    e.preventDefault();
    let newKanaArray = kanaArray;
    const testArray = Array.from(kanaArray);
    testArray.shift();
    if (testArray.length === 0) {
      router.push(
        `/?correct=${correct.toString()}&incorrect=${incorrect.toString()}&remaining=0`
      );
    }
    const userInput: string = (e.target as HTMLFormElement).kana.value;
    if (userInput === currentKana.romanization) {
      newKanaArray.shift();
      newKanaArray = shuffle(newKanaArray);
      setKanaArray(newKanaArray);
      setCurrentKana(newKanaArray[0]);
      setCorrect(correct => correct + 1);
      setRemaining(remaining => remaining - 1);
      (e.target as HTMLFormElement).reset();
    } else {
      const incorrectFlashcard = newKanaArray[0];
      newKanaArray.shift();
      newKanaArray.push(incorrectFlashcard);
      newKanaArray = shuffle(newKanaArray);
      setIncorrect(incorrect => incorrect + 1);
      setKanaArray(newKanaArray);
      setCurrentKana(newKanaArray[0]);
      (e.target as HTMLFormElement).reset();
    }
  };

  const headerProps = {
    correct: correct.toString(),
    incorrect: incorrect.toString(),
    remaining: remaining.toString(),
  };

  return (
    <NonSSRWrapper>
      <Header {...headerProps} />
      <section className="min-w-full">
        <div className="mx-auto px-10 py-5 bg-white border border-gray-200 rounded-lg shadow max-w-sm">
          <Image
            src={imageSrc}
            className="mb-4 max-h-64 max-w-64"
            alt="Japanese Kana"
            width={500}
            height={500}
          />
          <form
            onSubmit={e => {
              updateKana(e);
            }}
          >
            <input
              type="text"
              name="kana"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto"
            />
          </form>
        </div>
      </section>
    </NonSSRWrapper>
  );
}

export default Quiz;
