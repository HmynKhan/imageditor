import React, { useCallback, useEffect, useRef, useState } from 'react'

const PassGen = () => {

    const [length,setLength] = useState(8);
    const [numberAllowed,setNumberAllowed] = useState(false);
    const [characterAllowed,setcharacterAllowed] = useState(false);
    const [password,setPassowrd] = useState('');

    const passwordRef = useRef(null)

    const passwordGenerator = useCallback(()=>{
        let pass = ''
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

        if(numberAllowed) str+='0123456789'
        if(characterAllowed) str+='!@#$%^&*()-_=+[]{}|;:",.<>?/~`'

        for (let i = 0; i <= length; i++) {
            let char = Math.floor(Math.random()*str.length+1)
            pass += str.charAt(char)


            
        }

        setPassowrd(pass)


    },[length,numberAllowed,characterAllowed,setPassowrd])


    const copyPassword = useCallback(()=>{
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0,length+1)
        window.navigator.clipboard.writeText(password)
    },[password])
    useEffect(()=>{
        passwordGenerator()
    }
    ,[length,characterAllowed,numberAllowed,passwordGenerator])
  return (
    <>

        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8  text-orange-500 bg-gray-800'>
        <h1 className='text-4xl text-center mx-3 my-4 text-white'>Password Generator</h1>
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input ref={passwordRef} type="text" value={password} className='outline-none rounded-lg my-3 w-full py-1 px-3'
            placeholder='password' readOnly />
            <button onClick={copyPassword} className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>copy</button>
            </div>
            <div className='flex text-sm gap-x-2'>
                <div className='flex items-center gap-x-1'>
                    <input type="range" min={8} max={20} value={length} className='cursor-pointer'
                    onChange={(e)=>{setLength(e.target.value)}} />
                    <label>{length}</label>
                </div>
                <div className='flex items-center gap-x-1'>
                    <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' 
                    onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
                    <label >numbers</label>
                </div>
                <div className='flex items-center gap-x-1'>
                    <input type="checkbox" defaultChecked={characterAllowed} id='characterInput' 
                    onChange={()=>{setcharacterAllowed((prev)=>!prev)}} />
                    <label >characters</label>
                </div>
            </div>
        </div>
        {/* <button className='text-center text-white p-4 m-4 bg-green-500 hover:bg-green-800' onClick={passwordGenerator}>password</button> */}
    </>
  )
}

export default PassGen