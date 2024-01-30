import { useState , useCallback , useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setcharAllowed] = useState(false);
  const [password , setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback( () => {
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "0123456789"
    if(charAllowed) str+= "!@#$%^&*-_+=[]{})~`("

    for(let i=1;i <=length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
    
    pass += str.charAt(char);
    }

    setPassword(pass)

  } , [length,numberAllowed,charAllowed,setPassword ])

   const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,105);
    window.navigator.clipboard.writeText(password)
   }, [password])


  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <> 
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-600 text-orange-500">
     <h1 className='text-2xl text-white text-center'>Password Generator</h1>
     <div className='className="flex shadow rounded-lg overflow-hidden mb-4" '>
     <input 
     type="text"
     value={password}
     className='outline-none w-full py-3 px-1'
     placeholder='password'
     readOnly
     ref={passwordRef}
     />
   
     <button
      onClick={copyPasswordToClipboard}
      className='flex items-center items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10'>copy</button>
      
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type='range'
           min={6}
           max={100}
           value={length}
           className='cursor-pointer' 
           onChange={(e)=>{setLength(e.target.value)}}
          />
          <label> Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=>!prev);
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={()=>{
            setCharAllowed((prev)=>!prev);
          }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>

      </div>
     </div>
    
    </>
  )
}

export default App
