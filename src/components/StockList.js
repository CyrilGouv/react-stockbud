import { RiEditCircleFill, RiDeleteBin2Fill } from 'react-icons/ri'
import { AiOutlineStock} from 'react-icons/ai'

import './StockList.css'


const StockList = ({ list, handleClearAll, handleStockRemove, handleStockEdit }) => {
  return (
    <div className="StockList">
      { list.map(stock => {

        const { id, title } = stock
        return (
          <div className="stocklist__item" key={ id }>
            <div className="stocklist__item__title"><AiOutlineStock /> <span>{ title }</span></div>
            <div className="stocklist__item__action">
              <button onClick={ () => handleStockEdit(id, title) } className='action--edit'><RiEditCircleFill /></button>
              <button onClick={ () => handleStockRemove(id) } className='action--remove'><RiDeleteBin2Fill /></button>
            </div>
          </div>
        )
      }) }
      

      <div className="stocklist__clear">
        <button onClick={ handleClearAll } className="stocklist__clear__btn">Clear All Stocks</button>
      </div>
    </div>
  )
}

export default StockList