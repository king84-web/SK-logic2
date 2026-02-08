import { NextResponse } from 'next/server'

export async function DELETE(
  _request: any,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params
    // TODO: Delete service from database
    return NextResponse.json({ success: true, id })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
