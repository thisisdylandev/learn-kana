import Link from 'next/link'

interface Props {
    correct: string,
    incorrect: string,
    remaining: string
}

const Header = (props: Props) => ( 
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl">Home</Link>
        </div>
        <div className="flex-none">
            <ul className="menu menu-vertical px-1">
                <li className='text-right'>Correct: {props.correct}</li>
                <li className='text-right'>Incorrect: {props.incorrect}</li>
                <li className='text-right'>Remaining: {props.remaining}</li>
            </ul>
        </div>
    </div> 
) 

export default Header