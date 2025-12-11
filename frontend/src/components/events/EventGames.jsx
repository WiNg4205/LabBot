const EventGames = ({games}) => {
  return <table className="w-max text-md">
    <thead>
      <tr>
        <th className="font-semibold text-left">GAME</th>
        <th className="font-semibold text-left">WINNER</th>        
      </tr>
    </thead>
    <tbody>
      {games.map((item) => (
        <tr key={item._id}>
          <td className="pr-8">{item.game}</td>
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
