import React from 'react';
import styles from '../styles/Modal.module.css'; 

const Modal = ({ showModal, setShowModal }) => {
    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    // Function to stop propagation for modal content click
    const modalContentClick = (e) => {
        e.stopPropagation();
    };

    // Setting the style dynamically based on showModal state
    const modalStyle = {
        display: showModal ? 'flex' : 'none',
        zIndex: showModal ? 100 : -1 // Use 1 or any positive value when modal is shown, -1 when hidden
    };

    return (
        <div className={styles.containerMain} style={modalStyle} onClick={closeModal}>
            <div className={styles.modalContent} onClick={modalContentClick}>
                <h1>CRUD Application Showcase</h1>
                <p>Welcome to this showcase of a dynamic CRUD (Create, Read, Update, Delete) application, created using Express.js server, Mongoose ORM, Node.js runtime, and Bootstrap front-end framework. 
                <br/><br/>This application seamlessly interfaces with a MongoDB Atlas cloud database, demonstrating the capabilities of managing data in real-time. To ensure the integrity and security of the database, I've opted for a video demonstration that illustrates the functionality and user experience of the application, rather than direct public interaction. <br/><br/>Please watch the demonstration to understand how the application performs data management with intuitive design and robust backend infrastructure.</p>
                <button onClick={closeModal} className={styles.closeButton}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
