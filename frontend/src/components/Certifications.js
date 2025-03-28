// src/components/Certifications.js
import '../styles/Certifications.styles.css';

function Certifications() {
  return (
    <div className="certifications-container">
      <input type="text" className="certifications-input" placeholder="Enter certification" />
      <button className="add-button">Add Certification</button>
      <ul className="certifications-list">
        <li className="certification-item">
          <span className="certification-name">Example Certification</span>
          <span className="certification-date">2023-10-12</span>
        </li>
      </ul>
    </div>
  );
}

export default Certifications;
