import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()
    
    // 将 base64 转换为 blob
    const base64Data = image.split(',')[1]
    const buffer = Buffer.from(base64Data, 'base64')
    
    // 调用 remove.bg API
    const formData = new FormData()
    formData.append('image_file_b64', base64Data)
    
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.REMOVE_BG_API_KEY || '',
      },
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error('API 调用失败')
    }
    
    const resultBuffer = await response.arrayBuffer()
    
    return new NextResponse(resultBuffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: '处理失败' }, { status: 500 })
  }
}
