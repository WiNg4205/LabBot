const EventData = ({ selectedOuting }) => {
  if (!selectedOuting) return null
  return (
    <div className="w-96 h-72 border mt-8">
      <p><b>Time:</b> {new Date(selectedOuting.date).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })}</p>
      <p><b>Restaurant:</b> {selectedOuting.placesWent}</p>
      <p><b>People:</b> {selectedOuting.people}</p>
    </div>
  )
}

export default EventData
