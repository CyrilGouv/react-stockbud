import { useEffect, useState } from 'react'
import Brand from './components/Brand'
import StockList from './components/StockList'
import Alert from './components/Alert'

import { getLocalStorage } from './utils'

import './App.css'


function App() {
  
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  })
  const [list, setList] = useState(getLocalStorage())
  const [edit, setEdit] = useState(false)
  const [id, setID] = useState('')


  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (error) {
        handleAlert('', '')
      }
    }, 3000)

    return () => clearTimeout(timeout)

  }, [alert, error])


  const handleSubmit = e => {
    e.preventDefault()
    
    // handle empty input
    if (value === '') {
      handleAlert('error', 'Please add a stock value')
      return
    }

    // handle edit input
    if (value && edit && id) {

      return list.map(item => {
        if (item.id === id) {
          item.title = value

          handleAlert('success', 'Stock was edited!')
          setValue('')
          setEdit(false)
          setID('')
          localStorage.setItem('list', JSON.stringify(list))
        }
      })
    }

    // Add stock
    const newStock = {
      id: new Date().getTime().toString(),
      title: value
    }

    setList([...list, newStock])
    handleAlert('success', 'Stock was successfully added!')
    setValue('')
  }


  const handleClearAll = () => {
    setError(true)
    handleAlert('success', 'All stocks removed!')
    setList([])
  }


  const handleStockRemove = id => {
    const newList = list.filter(item => item.id !== id)
    setList(newList)
    setError(true)
    handleAlert('error', 'Stock removed!')
  }

  const handleStockEdit = (id, title) => {
    setEdit(true)
    setValue(title)
    setID(id)
  }


  const handleAlert = (type, message) => {
    setError(true)
    setAlert({ type, message })
  }


  return (
    <section className="App">
      <div className="app__wrapper">
        <Brand title="StockBud" />

        <form onSubmit={ handleSubmit } className="app__form">
            { error && <Alert alert={ alert } /> }
        
            <label htmlFor="stock">Stock to Watch</label>
            <input type="text" name='stock' className='app__form__input' placeholder='e.g. Apple' value={ value } onChange={ (e) => setValue(e.target.value) } />
            <button type="submit" className='app__form__btn'>Submit</button>
        </form>

        { list.length > 0 && <StockList list={ list } handleClearAll={ handleClearAll } handleStockRemove={ handleStockRemove } handleStockEdit={ handleStockEdit } /> }
      </div>
    </section>
  );
}

export default App
