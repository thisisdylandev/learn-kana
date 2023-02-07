"use client"; // this is a client component

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from './components/header'

function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [kanaType, setKanaType] = useState('hiragana');
  const [columns, setColumns] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const headerProps = {
    correct: searchParams.get('correct') || "0",
    incorrect: searchParams.get('incorrect') || "0",
    remaining: searchParams.get('remaining') || "0",
  }

  const handleCheckboxClick = (column: string) => {
    let queryColumns = columns
    if (queryColumns.includes(column)){
      queryColumns = queryColumns.filter(item => item !== column)
    } else {
      queryColumns.push(column)
    }
    setIsDisabled(!(queryColumns.length > 0))
    setColumns(queryColumns)
  }

  const handleButtonClick = () => {
    let query = `kana=${kanaType}&columns=`
    columns.forEach(item => query = query + `${item},`)
    // remove trailing comma
    query = query.substring(0, query.length - 1);
    router.push(`quiz?${query}`)
  }

  return (
    <>
      <Header {...headerProps}/>
      <section className="min-w-full flex h-screen">
        <div className="m-auto px-10 py-5 bg-white border border-gray-200 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-x-7">
            <h1 className="text-lg font-bold col-span-2">Would you like to practice hiragana or katakana?</h1>
            <div className="col-span-2 mx-auto">
              <div className="form-control mx-auto">
                <label className="label cursor-pointer">
                  <input type="radio" name="kana" checked className="radio mr-5" onChange={() => setKanaType('hiragana')} />
                  <span className="label-text">HIRAGANA</span> 
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input type="radio" name="kana" className="radio mr-5" onChange={() => setKanaType('katakana')} />
                  <span className="label-text">KATAKANA</span> 
                </label>
              </div>
            </div>
            <h2 className="text-lg font-bold col-span-2 mx-auto">Which columns would you like to study?</h2>
            <div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Root (a,i,o,e,u)</span> 
                  <input type="checkbox" className="checkbox" name="root" onChange={() => handleCheckboxClick('root')}/>
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">K</span> 
                  <input type="checkbox" className="checkbox" onChange={() => handleCheckboxClick('k')}/>
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">S</span> 
                  <input type="checkbox" className="checkbox" onChange={() => handleCheckboxClick('s')}/>
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">T</span> 
                  <input type="checkbox" className="checkbox" onChange={() => handleCheckboxClick('t')}/>
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">N</span> 
                  <input type="checkbox" className="checkbox" onChange={() => handleCheckboxClick('n')}/>
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Combo</span> 
                  <input type="checkbox" className="checkbox" onChange={() => handleCheckboxClick('combo')}/>
                </label>
              </div>
            </div>
            <div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">H</span> 
                  <input type="checkbox" className="checkbox" onChange={() => handleCheckboxClick('h')}/>
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">M</span> 
                  <input type="checkbox" className="checkbox" onChange={() => handleCheckboxClick('m')}/>
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Y</span> 
                  <input type="checkbox" className="checkbox" onChange={() => handleCheckboxClick('y')}/>
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">R</span> 
                  <input type="checkbox" className="checkbox" onChange={() => handleCheckboxClick('r')}/>
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">W/-N</span> 
                  <input type="checkbox" className="checkbox" onChange={() => handleCheckboxClick('w')}/>
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Variants</span> 
                  <input type="checkbox" className="checkbox" onChange={() => handleCheckboxClick('variants')}/>
                </label>
              </div>
            </div>
            <button className="btn btn-wide col-span-2 mt-5 mx-auto" id="btn_begin" disabled={isDisabled} onClick={() => handleButtonClick()}>BEGIN</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
