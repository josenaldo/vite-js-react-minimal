const Icon = ({ name, style = {} }) => {
  return (
    <span className="material-icons" style={{ ...style }}>
      {name}
    </span>
  )
}

export default Icon
