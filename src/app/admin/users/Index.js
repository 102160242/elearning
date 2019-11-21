import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Users_Index() {
  //const [count, setCount] = useState(0)
  const requestStatus = useSelector(state => state.admin.users.status);
  useEffect(() => {
    document.title = ''
  }, [])

  return (
    <div className="container-fluid">
        Hello
    </div>
  )
}