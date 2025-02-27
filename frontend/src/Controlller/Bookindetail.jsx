import React, { useEffect, useState } from 'react'
import Cards from './Cards/Cards'

const Bookindetail = ({ userl }) => {

  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:8080/api/studio/fetchuser/${userl}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.email);
      })
      .catch((err) => {
        console.error("fetch in error", err);
      });
  }, []);
  const [status, setStatus] = useState("pending");
  return (
    <div className="bg-slate-900 p-10">
      <div className='flex justify-end'>
        <div className="dropdown dropdown-left">
          <div tabIndex={0} role="button" className=" m-1 btn btn-outline btn-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>

          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><a className='btn btn-outline btn-accent' onClick={() => { setStatus("pending") }}>Request</a></li>
            <li><a className='btn btn-outline btn-accent' onClick={() => { setStatus("confirm") }}>Confirm order</a></li>
          </ul>
        </div>
      </div>
      <div>
        <Cards email={user} status={status} />
      </div>
    </div>
  )
}

export default Bookindetail