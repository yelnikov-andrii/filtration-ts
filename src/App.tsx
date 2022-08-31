import React, { useEffect, useState } from 'react'
import { getData } from './api'
import './App.scss'
import { Link } from 'react-router-dom'
import { DataType } from './types'

export const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>()
  const [query, setQuery] = useState<string>(' ')

  useEffect(() => {
    async function fetchData () {
      try {
        const res = await getData()
        setData(res.results.sort((firstObj: DataType, secondObj: DataType) => firstObj['@path'].localeCompare(secondObj['@path'])))
      } catch (err) {
        console.log(err)
      }
    };

    fetchData()
  }, [])

  const filterData = (input: string) => {
    if (data !== undefined && data.length !== 0) {
      const filtered = [...data].filter((obj: DataType) => obj?.title && obj.title.toLowerCase().includes(input.toLowerCase()))
      return filtered
    }
  }

  const filteredData = filterData(query)

  return (
    <div className="main">
      <div className='main__block'>
      <form className='main__form'>
        <label className='main__form-label'>filter by title</label>
        <input
          className='main__form-input'
          placeholder='title'
          onChange={(event) => {
            setQuery(event.target.value)
            filterData(query)
          }}/>
      </form>
      <ul className='main__list'>
      {filteredData !== undefined && filteredData.map(el => (
        <li
          className='main__list-item'
          key={el['@id']}
        > {`${el['@path'].slice(1).replaceAll('/', ' / ')}/ `}
        <Link
          className='main__link'
          to={`${el.title}`}
        >
          {`${el.title}`}
        </Link>
        </li>
      ))}
      </ul>
      </div>
    </div>
  )
}