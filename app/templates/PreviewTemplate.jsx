export default function PreviewTemplate({ template }) {
  return (
    <div className='flex flex-col items-center text-center p-10 space-y-4 w-96'>
      <span className='text-xl p-2 text-black border-t-4 rounded-lg border-gray-400 w-full'>
        {template.name}
      </span>
      <span className='text-md text-black border-b-4 border-gray-400 w-full'>
        {template.subject}
      </span>
      <span className='text-md pb-2 text-black border-b-4 rounded-2xl border-gray-400 w-full'>
        {template.body}
      </span>
    </div>
  )
}
