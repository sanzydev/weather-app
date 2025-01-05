import { useState, useEffect } from 'react'
import WeatherAnimation from './WeatherAnimation'
import { Compass, Droplets, Eye, Gauge, Thermometer, Wind } from 'lucide-react'

// Card components
const Card = ({ className, children }) => (
  <div className={`rounded-lg border bg-white/10 backdrop-blur-md shadow-lg ${className}`}>
    {children}
  </div>
)

const CardContent = ({ className, children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
)

interface WeatherData {
  name: string
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level?: number
    grnd_level?: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
    deg: number
  }
  visibility: number
  clouds: {
    all: number
  }
  rain?: {
    "1h"?: number
  }
  coord: {
    lon: number
    lat: number
  }
}

interface WeatherDisplayProps {
  data: WeatherData
}

export default function WeatherDisplay({ data }: WeatherDisplayProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="mt-8 space-y-6">
      <Card className="w-full">
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold text-white">{data.name}</h2>
                <span className="text-xl text-white/80">{data.sys.country}</span>
              </div>
              <p className="text-white/60 mt-1">
                {data.coord.lat.toFixed(2)}°N, {data.coord.lon.toFixed(2)}°E
              </p>
            </div>
            <div className="flex items-center gap-4">
              <WeatherAnimation weatherType={data.weather[0].main} />
              <div className="text-center">
                <p className="text-5xl font-bold text-white">{Math.round(data.main.temp)}°C</p>
                <p className="text-xl text-white/80 capitalize">{data.weather[0].description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="text-xl font-semibold text-white mb-4">Temperature Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="text-white/60" />
                  <span className="text-white/80">Feels Like</span>
                </div>
                <span className="text-white font-medium">{Math.round(data.main.feels_like)}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Min Temperature</span>
                <span className="text-white font-medium">{Math.round(data.main.temp_min)}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Max Temperature</span>
                <span className="text-white font-medium">{Math.round(data.main.temp_max)}°C</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-xl font-semibold text-white mb-4">Atmospheric Conditions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="text-white/60" />
                  <span className="text-white/80">Humidity</span>
                </div>
                <span className="text-white font-medium">{data.main.humidity}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="text-white/60" />
                  <span className="text-white/80">Pressure</span>
                </div>
                <span className="text-white font-medium">{data.main.pressure} hPa</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="text-white/60" />
                  <span className="text-white/80">Visibility</span>
                </div>
                <span className="text-white font-medium">{(data.visibility / 1000).toFixed(1)} km</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-xl font-semibold text-white mb-4">Wind Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="text-white/60" />
                  <span className="text-white/80">Wind Speed</span>
                </div>
                <span className="text-white font-medium">{data.wind.speed} m/s</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Compass className="text-white/60" />
                  <span className="text-white/80">Wind Direction</span>
                </div>
                <span className="text-white font-medium">{data.wind.deg}°</span>
              </div>
              {data.rain && (
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Rainfall (1h)</span>
                  <span className="text-white font-medium">{data.rain["1h"]} mm</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-xl font-semibold text-white mb-4">Sun Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Sunrise</span>
                <span className="text-white font-medium">{formatTime(data.sys.sunrise)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Sunset</span>
                <span className="text-white font-medium">{formatTime(data.sys.sunset)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Cloud Cover</span>
                <span className="text-white font-medium">{data.clouds.all}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

