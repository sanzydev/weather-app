import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from 'lucide-react'

interface WeatherAnimationProps {
  weatherType: string
}

export default function WeatherAnimation({ weatherType }: WeatherAnimationProps) {
  const getWeatherIcon = () => {
    switch (weatherType.toLowerCase()) {
      case 'clear':
        return <Sun className="text-yellow-300 animate-pulse" size={64} />
      case 'clouds':
        return <Cloud className="text-gray-300 animate-bounce" size={64} />
      case 'rain':
        return <CloudRain className="text-blue-300 animate-bounce" size={64} />
      case 'snow':
        return <CloudSnow className="text-white animate-bounce" size={64} />
      case 'thunderstorm':
        return <CloudLightning className="text-yellow-300 animate-pulse" size={64} />
      case 'mist':
      case 'fog':
        return <CloudFog className="text-gray-300 animate-pulse" size={64} />
      default:
        return <Cloud className="text-gray-300" size={64} />
    }
  }

  return <div className="weather-animation">{getWeatherIcon()}</div>
}

