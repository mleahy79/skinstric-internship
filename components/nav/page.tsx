import Link from "next/link"

export default function nav() {
    return (
        <main>
            <header className="flex flex-row justify-between items-center py-3 mb-3 relative w-full h-16 z-[1000]">
                <div className="flex flex-row pt-1 scale-75 justify-center items-center">
               <Link className="text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 mr-2 line-clamp-4 leading-4 z-1000" href="/">SKINSTRIC </Link>
               <img className="h-[17px] w-1" src="/rectangle 2710.svg" alt="left-bracket" />
               <p className="text-sm font-semibold text-[#1a1b1c83] text-opacity-70 ml-1.5 mr-1.5"> INTRO </p>
               <img className="h-[17px] w-1" src="/rectangle 2711.svg" alt="left-bracket" />
                </div>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold  transition-colors  disabled:pointer-events-none text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mx-4 scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] leading-[16px]">ENTER CODE</button>
            </header>
        </main>
    )
}