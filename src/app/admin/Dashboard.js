import React from 'react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  //const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = 'Dashboard'
  })

  return (
    <div className="container-fluid">
        Dashboard
    </div>
  )
}