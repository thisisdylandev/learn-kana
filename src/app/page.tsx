import Link from 'next/link'

function Home() {

  return (
    <>
      <section className="min-w-full flex h-screen">
        <div className="m-auto px-10 py-5 bg-white border border-gray-200 rounded-lg shadow">
          <div className="grid grid-cols-2 grid-rows-2">
            <h1 className="text-lg font-bold col-span-2">Would you like to practice hiragana or katakana?</h1>
            <Link href="/hiragana" className="mx-auto">HIRAGANA</Link>
            <Link href="/katakana" className="mx-auto">KATAKANA</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
