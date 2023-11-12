import Button from './button'
export default function TemplatesList({ data, handleDelete, openEditForm }) {
  return (
    <>
      {data.map((item) => (
        <li
          className='pl-2 border even:border-orange-300 odd:border-zinc-300 rounded-lg w-72'
          key={item._id}
        >
          <div className='flex justify-between items-center'>
            <span
              className='truncate cursor-pointer'
              onClick={() => openEditForm(item._id)}
            >
              {item.name}
            </span>
            <Button
              style='p-2 text-red-500'
              action={() => handleDelete(item._id)}
              title='X'
            />
          </div>
        </li>
      ))}
    </>
  )
}
