interface TimelineEvent {
  year: string
  title: string
  description: string
  image?: string
}

interface SportHistoryTimelineProps {
  events: TimelineEvent[]
  sportName?: string
}

export default function SportHistoryTimeline({ events, sportName = "Sport" }: SportHistoryTimelineProps) {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">History of {sportName}</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-blue-600" />

        {events.map((event, index) => (
          <div
            key={index}
            className={`relative flex items-center mb-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white z-10" />

            {/* Content */}
            <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-blue-600 font-bold text-lg mb-2">{event.year}</div>
                <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
                {event.image && (
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="mt-4 w-full h-32 object-cover rounded"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
