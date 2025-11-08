const ReceiptModal = ({ modalData }) => {
  return (
    <div className="modal fade show d-block" style={{ background: "#00000080" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <h4 className="fw-bold">Order Complete ✅</h4>
          <hr />
          <p><b>Name:</b> {modalData.name}</p>
          <p><b>Email:</b> {modalData.email}</p>
          <p className="text-muted small">{modalData.timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
