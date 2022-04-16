import { RiStockFill } from 'react-icons/ri'

import './Brand.css'


const Brand = ({ title }) => {
  return (
    <div className='Brand'>
        <div className="brand__logo">
            <RiStockFill className="brand__logo__icon"/>
        </div>
        <span className="brand__text">{ title }</span>
    </div>
  )
}

export default Brand