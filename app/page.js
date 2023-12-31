import Templates from './templates/templates'

async function getData() {
  const res = await fetch('http://localhost:3000/api/templates', {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()

  return data
}

export default async function Home() {
  const data = await getData()

  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div>
        <Templates data={data} />
      </div>
    </main>
  )
}
