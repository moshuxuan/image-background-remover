'use client'

import { useState } from 'react'

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveBg = async () => {
    if (!image) return
    setLoading(true)
    try {
      const res = await fetch('/api/remove-bg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image })
      })
      const blob = await res.blob()
      setResult(URL.createObjectURL(blob))
    } catch (error) {
      alert('处理失败，请重试')
    }
    setLoading(false)
  }

  const handleReset = () => {
    setImage(null)
    setResult(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🖼️ 图片背景去除</h1>
          <p className="text-gray-600">快速、免费、无需注册</p>
        </header>

{!image ? (
          <div className="max-w-2xl mx-auto">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">点击上传</span> 或拖拽图片</p>
                <p className="text-xs text-gray-500">支持 JPG, PNG, WebP (最大 10MB)</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
            </label>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">原图</h3>
                <div className="flex items-center justify-center min-h-[300px]">
                  <img src={image} alt="原图" className="max-w-full max-h-[400px] object-contain rounded-lg" />
                </div>
              </div>
              {result && (
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">处理后</h3>
                  <div className="flex items-center justify-center min-h-[300px]" style={{backgroundImage: 'repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 50% / 20px 20px'}}>
                    <img src={result} alt="处理后" className="max-w-full max-h-[400px] object-contain rounded-lg" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center gap-4">
              {!result ? (
                <button onClick={handleRemoveBg} disabled={loading} className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors">
                  {loading ? '处理中...' : '去除背景'}
                </button>
              ) : (
                <>
                  <a href={result} download="removed-bg.png" className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    下载图片
                  </a>
                  <button onClick={handleReset} className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    重新上传
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <footer className="text-center mt-16 text-sm text-gray-500">
          <p>Powered by remove.bg API</p>
        </footer>
      </div>
    </main>
  )
}
