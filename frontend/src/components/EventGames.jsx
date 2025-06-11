const EventGames = ({games}) => {
  return <table className="w-max text-sm mx-8">
    <thead>
      <tr>
        <th className="w-24 font-semibold text-left">GAME</th>
        <th className="w-60 font-semibold text-left">WINNER</th>        
      </tr>
    </thead>
    <tbody>
      {games.map((item) => (
        <tr key={item._id}>
          <td>{item.game}</td>
          <td>{Object.keys(item.results)
                .filter(name => item.results[name] === 1)
                .join(", ")}
          </td>
        </tr>
      ))}      
    </tbody>
  </table>
}

export default EventGames
