import { useEffect, useState } from "react";

function App() {
    const [messageList, setMessageList] = useState([]);
    

    useEffect(() => {
        fetch("http://localhost:5000/message")
            .then((res) => res.json())
            .then((json) => setMessageList(json));
    }, []);

    return (
        <>
            <h1 className="bg-info text-center fs-3">React DIO Inter</h1>
            <div className="mx-4">
                <h2 className="fs-4">Mural de Mensagens</h2>
                <div className="mb-3" style={{ width: "50rem" }}>
                    <label htmlFor="nameInput" className="form-label">
                        Nome
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        placeholder="Digite seu nome"
                    />
                </div>
                <div className="mb-3" style={{ width: "50rem" }}>
                    <label htmlFor="messageInput" className="form-label">
                        Mensagem
                    </label>
                    <textarea
                        className="form-control"
                        id="messageInput"
                        rows="3"
                        placeholder="Digite sua mensagem"
                    ></textarea>
                </div>
                <button type="button" className="btn btn-primary">
                    Enviar
                </button>

                <h3 className="fs-4 mt-4">Últimas mensagens enviadas: </h3>
                {messageList.map(({id, message, email, created_at}, index) => 
                <div key={id} className="card my-3" style={{ width: "50rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">{email}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{created_at}</h6>
                        <p className="card-text">{message}</p>
                    </div>
                </div>
                
                )}
            </div>
        </>
    );
}

export default App;
