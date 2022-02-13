import { useEffect, useState } from "react";

function App() {
    const BASE_URL = "http://localhost:5000/message";
    const [messageList, setMessageList] = useState([]);
    const [authorEmail, setAuthorEmail] = useState("");
    const [messageContent, setMessageContent] = useState("");
    const [showValidateMessage, setShowValidateMessage] = useState(false);

    useEffect(() => {
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((json) => setMessageList(json));
    }, []);

    function validateEmail(value) {
        const isEmailValid =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value.length <= 0) {
            setShowValidateMessage(true);
            return;
        } else if (!isEmailValid.test(value)) {
            setShowValidateMessage(true);
            return;
        } else {
            setShowValidateMessage(false);
            return;
        }
    }

    function sendMessage() {
        setShowValidateMessage(false);
        if (authorEmail.length <= 0 || messageContent.length <= 0)
            return setShowValidateMessage(true);
        fetch(BASE_URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: authorEmail,
                message: messageContent,
            }),
        })
            .then((resp) => resp.json())
            .then((json) => console.log(json));
        setAuthorEmail("");
        setMessageContent("");
    }

    return (
        <>
            <h1 className="bg-info text-center fs-3">React DIO Inter</h1>
            <div className="mx-4">
                <h2 className="fs-4">Mural de Mensagens</h2>
                <div className="mb-3" style={{ width: "50rem" }}>
                    <label htmlFor="nameInput" className="form-label">
                        Email
                    </label>
                    <input
                        value={authorEmail}
                        onChange={({ target }) => {
                            if (showValidateMessage) validateEmail(target.value);
                            setAuthorEmail(target.value);
                        }}
                        onBlur={({ target }) => validateEmail(target.value)}
                        type="email"
                        className="form-control"
                        id="emailInput"
                        placeholder="email@exemplo.com"
                    />
                </div>
                <div className="mb-3" style={{ width: "50rem" }}>
                    <label htmlFor="messageInput" className="form-label">
                        Mensagem
                    </label>
                    <textarea
                        value={messageContent}
                        onChange={({ target }) => {
                            if (showValidateMessage && messageContent.length > 0)
                                setShowValidateMessage(false);
                            setMessageContent(target.value);
                        }}
                        className="form-control"
                        id="messageInput"
                        rows="3"
                        placeholder="Digite sua mensagem"
                    ></textarea>
                </div>
                {showValidateMessage && (
                    <>
                        <div
                            className="alert alert-danger d-flex align-items-center"
                            style={{ width: "50rem" }}
                            role="alert"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                width="24"
                                height="24"
                                role="img"
                                aria-label="Danger:"
                            >
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                            <div>Preencha os campos corretamente</div>
                        </div>
                    </>
                )}
                <button type="button" className="btn btn-primary" onClick={sendMessage}>
                    Enviar
                </button>

                <h3 className="fs-4 mt-4">Últimas mensagens enviadas: </h3>
                {messageList.map(({ id, message, email, created_at }, index) => (
                    <div key={id} className="card my-3" style={{ width: "50rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{email}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{created_at}</h6>
                            <p className="card-text">{message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
