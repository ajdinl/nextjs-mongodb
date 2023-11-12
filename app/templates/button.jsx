export default function Button({ style, action = () => {}, title, type }) {
  return (
    <button className={style} type={type} onClick={() => action()}>
      {title}
    </button>
  )
}
