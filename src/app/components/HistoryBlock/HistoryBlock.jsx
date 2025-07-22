import "./HistoryBlock.css";

export const HistoryBlock = ({title, company, years, achivments}) => {

  return (
    <div className="historyBlock">
        <div className="historyHeader">
            <div className="historyTitle">
                {title}
            </div>
            <div className="historyCompany">
                {company}
            </div>
        </div>
        <div className="historyYears">
            {years}
        </div>
        <ul className="historyList">
            {achivments.map((item, index) => (
                <li key={index} className="historyItem">
                    <span className="historyBullet"></span>
                    <div className="historyText">
                        {item}
                    </div>
                </li>
            ))}
        </ul>
    </div>
  );
}