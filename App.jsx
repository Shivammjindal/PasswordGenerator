import {useCallback, useEffect, useState, useRef} from 'react'

function App() {

  const [length,setLength] = useState(10)
  const [Number,setNumber] = useState(false)
  const [Character,setCharacter] = useState(false)
  const [Symbol,setSymbol] = useState(false)
  const [Password, setPassword]  = useState("")

  // Ref Hook
  // Here you can use any default value.
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if(Number)
      str += "1234567890"
    if(Character)
      str += "!@#$%^&*()"
    if(Symbol)
      str += ",.<>/?;':{}][|"

    for(let i = 0; i < length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[Number,Character,length,Symbol,setPassword])

  useEffect(() => {
    passwordGenerator()
  },[Number,Character,length,Symbol,setPassword])

  const copying = useCallback(() => {
    window.navigator.clipboard.writeText(Password)
  },[Password])

  return (
    <>
      <div className=" flex-col items-center w-[1080px] bg-white  mx-auto">
        <h1 className="text-blue-600 py-5 text-center text-[2.3rem] font-semibold ">Password Generator</h1>
        <div className="flex justify-center my-3 pb-4 gap-4">
          <input type="text" placeholder="Password" className=" border-2 border-slate-500 rounded-md px-2 text-[1.1rem]" ref={passwordRef} readOnly value={Password}/>
          <button className=" bg-blue-600 text-white p-2 text-[1.1rem] border-0 rounded-lg px-4" 
          onClick={copying}>Copy</button>
        </div>
        <div className="flex w-[760px] mx-auto justify-between tablet:flex-col text-center laptop:flex-row">
          <div className='tablet:m-2'>
            <input type="range" id="Length" min={8} max={15} value={length} className="cursor-pointer" onChange={(event) => {
              setLength(event.target.value)
            }}/>
            <label htmlFor="Length" className=" text-black px-2 text-[1.4rem]">Length {length}</label>
          </div>
          <div className='tablet:m-2'>
            <input type="checkbox" id="number" defaultChecked={Number} onChange={() => {
              setNumber((prev) => !prev)
            }}/>
            <label htmlFor="number" className=" text-[1.4rem] px-2 text-black font-normal">Numbers</label>
          </div>
          <div className='tablet:m-2'>
            <input type="checkbox" id="Character" defaultChecked={Character} onChange={()=>{
              setCharacter((prev) => !prev)
            }}/>
            <label htmlFor="Character" className=" text-[1.4rem] px-2 text-black font-normal">Characters</label>
          </div>
          <div className='tablet:m-2'>
            <input type="checkbox" id="Symbol" defaultChecked={Symbol} onChange={() => {
              setSymbol((prev) => !prev)
            }}/>
            <label htmlFor="Symbol" className=" text-[1.4rem] px-2 text-black font-normal">Symbols</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App