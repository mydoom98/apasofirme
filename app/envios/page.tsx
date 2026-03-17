export default function EnviosPage() {
    return (
        <div className="container-main" style={{ textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2 className="titulo">Envíos</h2>
            <div style={{ padding: "20px", display: "flex", justifyContent: "center", width: "100%" }}>
                <img 
                    src="/img/envios.jpg" 
                    alt="Proceso de envío de productos"
                    style={{ width: "90%", maxWidth: "800px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                />
            </div>

            <footer className="landing-footer" style={{ width: "100%", marginTop: "auto" }}>
                <p>Envíos a todo el país</p>
                <a
                    href="https://wa.me/51917024847?text=Hola,%20vi%20tu%20u%20web%20y%20me%20interesa%20crear%20mi%20página"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--secondary)', textDecoration: 'none', marginTop: '10px', display: 'inline-block' }}
                >
                    ¿Quieres que cree tu página? Click aquí
                </a>
            </footer>

            <a className="whatsapp" href="https://wa.me/5493758434182">💬</a>
        </div>
    );
}
