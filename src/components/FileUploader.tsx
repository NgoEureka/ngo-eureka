'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Upload } from 'lucide-react'
import uploadFile from '@/lib/uploadFile'

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(file);
    
    const imgLink = uploadFile(file);
    console.log(imgLink);
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <label htmlFor="file-upload" className="block text-sm font-medium text-white mb-2">
        Upload Image
      </label>
      <form onSubmit={onSubmitHandler} className="flex items-center gap-4">
        <div className="relative flex-1">
          <input
            type="file"
            id="file-upload"
            className="sr-only"
            onChange={handleFileChange}
            aria-describedby="file-upload-description"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <Upload className="w-5 h-5 mr-2" />
            Choose file
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Upload
        </button>
      </form>
      {file && (
        <p id="file-upload-description" className="mt-2 text-sm text-gray-500">
          Selected file: {file.name}
        </p>
      )}
    </div>
  )
}