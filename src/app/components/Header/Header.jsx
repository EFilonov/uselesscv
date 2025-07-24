import "./Header.css";

export const Header = ({animate}) => {
  return (
    <header className="header">
      <h1 className={`headerContent${animate ? " animate" : ""}`}>
        LANDON HARPER
      </h1>
      <button className="button">
        <div className="blob1"></div>
        <div className="blob2"></div>
        <div className="inner">Realism</div>
      </button>

    </header>
  );
}