const EventGames = ({games}) => {
  return <table className="border mx-20 w-max">
    <thead>
      <tr>
        <th className="px-4">GAME</th>
        <th className="px-4">WINNER</th>        
      </tr>
    </thead>
    <tbody>
      {games.map((item) => (
        <tr key={item._id}>
          <td className="px-4">{item.game}</td>
          <td className="px-4">{Object.keys(item.results)
                .filter(name => item.results[name] === 1)
                .join(", ")}
          </td>
        </tr>
      ))}      
    </tbody>
  </table>
}

export default EventGames
