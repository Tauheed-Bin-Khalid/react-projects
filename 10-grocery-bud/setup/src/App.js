import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'



const getLocalStorage =()=>{
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))

  }
  else{
    return []
  }
}
function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'danger', 'please enter value')
    }
    else if (name && isEditing) {
      setList(list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: name }

        }
        return item
      }))
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true,'success','value edited')
    }
    else {
      showAlert(true, 'success', 'item added to list')
      const newItem = {
        id: new Date().getTime().toString(),
        title: name
      };
      setList([...list, newItem]);
      setName('')
    }

  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([])
  }

  const remoeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  },[list])

  return <section className='section-center'>
    <form className='grocery-form'
      onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert}
        removeAlert={showAlert}
        list={list}
      />}
      <h3>grocery bud</h3>
      <div className='form-control'>
        <input type="text"
          placeholder='e.g: eggs' value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className='submit-btn'>
          {isEditing ? 'edit' : 'submit'}
        </button>

      </div>

    </form>

    {list.length > 0 &&
      <div className='grocery-container'>
        <List items={list} removeItem={remoeItem} editItem={editItem} />
        <button type="" className='clear-btn' onClick={clearList}>
          clear items
        </button>
      </div>
    }

  </section>
}

export default App
