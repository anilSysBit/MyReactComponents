import React, { useState } from 'react';
import './ticketPrinter.css'; // Ensure this CSS is created
// import image from '../../assets/beats'
import BeatsLogo from '../../assets/beats/beats_logo.png'
import TransLogo from '../../assets/beats/trans_logo.png'

const TicketPrinter: React.FC = () => {
  const [ticketCount, setTicketCount] = useState<number>(10);
  const [examDate, setExamDate] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [startNumber, setStartNumber] = useState<number>(1000);
  const [tickets, setTickets] = useState<number[]>([]);

  const generateTickets = () => {
    const list: number[] = [];
    for (let i = 0; i < ticketCount; i++) {
      list.push(startNumber + i);
    }
    setTickets(list);
  };

  const renderTicket = (ticketNumber: number) => (
    <div className="ticket" key={ticketNumber}>
      <img src={BeatsLogo} className="beats_logo" alt="Logo" />
      <img src={TransLogo} alt="Watermark" className="watermark_logo" />
      <div className="field font_big">
        <span className="ticket_number">{ticketNumber}</span>
      </div>
      <div className="field font_big">
        <strong>Student Name :</strong> _ _ _ _ _ _ _ _ _ _ _ _ 
      </div>
      <div className="field">
        <strong>Date:</strong> {examDate || '---'}
      </div>
      <div className="field ticket_description">
        <strong>Time:</strong> {remarks || '---'}
      </div>
      <div className="signature">Signature</div>
    </div>
  );

  const renderPages = () => {
    const pages = [];
    for (let i = 0; i < tickets.length; i += 10) {
      const pageTickets = tickets.slice(i, i + 10);
      const rows = [];
      for (let j = 0; j < 5; j++) {
        const ticket1 = pageTickets[j * 2];
        const ticket2 = pageTickets[j * 2 + 1];

        if (ticket1 || ticket2) {
          rows.push(
            <React.Fragment key={`row-${i + j}`}>
              <div></div>
              {ticket1 ? renderTicket(ticket1) : <div></div>}
              <div className="gap-h"></div>
              {ticket2 ? renderTicket(ticket2) : <div></div>}
              <div></div>
              {j < 4 && <div className="gap-v" />}
            </React.Fragment>
          );
        }
      }

      pages.push(
        <div className="page" key={`page-${i}`}>
          {rows}
        </div>
      );
    }
    return pages;
  };

  return (
    <div>
<div className="no-print w-full px-6 py-4 bg-white shadow border border-gray-200 rounded-md mb-6">
  <div className="flex flex-wrap items-end gap-4">
    {/* Number of Tickets */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        Number of Tickets
      </label>
      <input
        type="number"
        value={ticketCount}
        onChange={(e) => setTicketCount(parseInt(e.target.value) || 0)}
        min={1}
        className="w-36 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {/* Exam Date */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        Exam Date
      </label>
      <input
        type="date"
        value={examDate}
        onChange={(e) => setExamDate(e.target.value)}
        className="w-44 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {/* Time / Remarks */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        Time / Remarks
      </label>
      <input
        type="text"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        placeholder="e.g. 10:00 AM - 12:00 PM"
        className="w-56 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {/* Start Ticket Number */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        Start Ticket #
      </label>
      <input
        type="number"
        value={startNumber}
        onChange={(e) => setStartNumber(parseInt(e.target.value) || 0)}
        min={0}
        className="w-36 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {/* Buttons */}
    <div className="flex gap-2 mt-6">
      <button
        onClick={generateTickets}
        className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Generate
      </button>
      <button
        onClick={() => window.print()}
        className="px-4 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 transition"
      >
        Print
      </button>
    </div>
  </div>
</div>


      <div id="pages">{renderPages()}</div>
    </div>
  );
};

export default TicketPrinter;
