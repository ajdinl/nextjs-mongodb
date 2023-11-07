import {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from '@/lib/mongo/templates'

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('_id')

  if (query) {
    const res = await getTemplate(query)

    return new Response(JSON.stringify(res))
  }
  const res = await getTemplates()

  return new Response(JSON.stringify(res))
}

export async function POST(req) {
  const res = await createTemplate(await req.json())

  return new Response(JSON.stringify(res))
}

export async function PUT(req) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('_id')

  const res = await updateTemplate(query, await req.json())

  return new Response(JSON.stringify(res))
}

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('_id')

  const res = await deleteTemplate(query)

  return new Response(JSON.stringify(res))
}
