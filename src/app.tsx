"use client"

import { useState, useEffect } from 'react'
import { Button } from "./components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Textarea } from "./components/ui/textarea"
import { Switch } from "./components/ui/switch"
import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { detectSpam } from './services/api'

const models = [
  { id: 'model1', name: 'Random Forest Model' },
  { id: 'model2', name: 'Logistic Regression Model' },
  { id: 'model3', name: 'Support Vector Machine Model' },
  { id: 'model4', name: 'Naive Bayes Model' },
]

export default function SpamDetection() {
  const [message, setMessage] = useState('')
  const [selectedModel, setSelectedModel] = useState(models[0].id)
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Set dark mode by default when component mounts
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleModelChange = (value: string) => {
    setSelectedModel(value)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await detectSpam({ message, model: selectedModel })
      setResult(response.result)
    } catch (error) {
      if (error instanceof Error) {
        setResult(`Error: ${error.message}`)
      } else {
        setResult('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto p-8 space-y-8 transition-colors duration-300 ease-in-out bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-blue-900">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Spam Email Detection
          </h1>
          <div className="flex items-center space-x-2">
            <Sun className="h-6 w-6 text-yellow-500" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="data-[state=checked]:bg-blue-600"
            />
            <Moon className="h-6 w-6 text-blue-500" />
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label htmlFor="message" className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">
            Enter email message:
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type or paste the email message here"
            className="w-full text-lg transition-shadow duration-300 ease-in-out hover:shadow-lg focus:shadow-lg dark:bg-gray-800 dark:text-white"
            rows={5}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label htmlFor="model-select" className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">
            Select Model:
          </label>
          <Select value={selectedModel} onValueChange={handleModelChange}>
            <SelectTrigger id="model-select" className="w-full text-lg dark:bg-gray-800 dark:text-white">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !message.trim()}
            className="w-full text-lg py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {isLoading ? 'Detecting...' : 'Detect Spam'}
          </Button>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-lg shadow-lg ${
                result === 'Spam' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' : 
                result === 'Not Spam' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100' : 
                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100'
              }`}
            >
              <p className="text-2xl font-bold">Result: {result}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <a 
            href="https://github.com/Aakash768" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300"
          >
            @made by Aakash
          </a>
        </div>
      </div>
    </div>
  )
}
