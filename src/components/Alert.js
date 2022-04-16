

const Alert = ({ alert }) => {
    const { type, message } = alert
  return (
    <div className={`app__form__alert alert--${type}`}>{ message }</div>
  )
}

export default Alert