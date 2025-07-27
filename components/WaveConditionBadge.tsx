interface WaveConditionBadgeProps {
  condition: {
    key: string;
    value: string;
  };
  size?: 'sm' | 'md';
}

export default function WaveConditionBadge({ condition, size = 'md' }: WaveConditionBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  const getConditionStyle = (key: string) => {
    switch (key) {
      case 'small':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-blue-100 text-blue-800'
      case 'large':
        return 'bg-orange-100 text-orange-800'
      case 'epic':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getWaveIcon = (key: string) => {
    switch (key) {
      case 'small':
        return '〰️'
      case 'medium':
        return '🌊'
      case 'large':
        return '🌊🌊'
      case 'epic':
        return '🌊🌊🌊'
      default:
        return '🌊'
    }
  }

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${sizeClasses[size]} ${getConditionStyle(condition.key)}`}>
      <span className="mr-1">{getWaveIcon(condition.key)}</span>
      {condition.value}
    </span>
  )
}