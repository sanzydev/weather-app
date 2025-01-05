'use client'

import { useState } from 'react'
import WeatherDisplay from '../components/WeatherDisplay'
import { Search } from 'lucide-react'

// Input component with fixed text color
const Input = ({ ...props }) => (
  <input
    className="w-full px-4 py-3 text-lg bg-white rounded-lg border-none shadow-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-200 placeholder:text-gray-400 text-gray-800"
    {...props}
  />
)

// Button component remains the same
const Button = ({ children, ...props }) => (
  <button
    className="px-6 py-3 text-lg font-medium text-white bg-purple-500 rounded-lg shadow-lg hover:bg-purple-600 active:bg-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    {...props}
  >
    <Search className="w-5 h-5" />
    {children}
  </button>
)

export default function Home() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87872eec9d2af4f05841c97767aaff8f&units=metric`
      )
      if (!response.ok) {
        throw new Error('City not found')
      }
      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 flex flex-col items-center justify-start p-4 pt-16">
      <h1 className="text-5xl font-bold text-white mb-12 tracking-wide">Weather App</h1>
      <div className="w-full max-w-lg px-4">
        <form onSubmit={fetchWeather} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              aria-label="City name"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Weather'}
          </Button>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-white text-center">{error}</p>
          </div>
        )}
        {weatherData && <WeatherDisplay data={weatherData} />}
      </div>
    </div>
  )
}

