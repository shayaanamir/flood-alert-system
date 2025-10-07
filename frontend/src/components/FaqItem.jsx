import React from "react";
import "../styles/components/FaqItem.css";

const FaqItem = ({ faq, index, isOpen, onClick }) => {
  return (
    <div className={`faq-item ${isOpen ? "active" : ""}`}>
      <button className="faq-question" onClick={() => onClick(index)}>
        <span>{faq.question}</span>
        {/* REPLACE THE SPAN WITH THIS DIV */}
        <div className="faq-chevron"></div>
      </button>
      <div className={`faq-answer ${isOpen ? "open" : ""}`}>
        <p>{faq.answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;