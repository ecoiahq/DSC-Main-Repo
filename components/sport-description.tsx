import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Calendar, Info } from "lucide-react"

interface SportDescriptionProps {
  name: string
  description: string
  category?: string
  paralympicSport?: boolean
  equipment?: string[]
  rules?: string
  history?: string
  className?: string
}

export default function SportDescription({
  name,
  description,
  category,
  paralympicSport = false,
  equipment = [],
  rules,
  history,
  className = "",
}: SportDescriptionProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Description Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            <div className="flex gap-2">
              {paralympicSport && (
                <Badge variant="default" className="bg-blue-600">
                  <Trophy className="w-4 h-4 mr-1" />
                  Paralympic Sport
                </Badge>
              )}
              {category && (
                <Badge variant="secondary">
                  <Users className="w-4 h-4 mr-1" />
                  {category}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Equipment */}
        {equipment.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="w-5 h-5" />
                Equipment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {equipment.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Rules */}
        {rules && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5" />
                Rules & Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{rules}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* History */}
      {history && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5" />
              History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{history}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
