import { useNavigate } from 'react-router-dom';

export default function Principal(){
  const navigate = useNavigate();

  return(
    <div>
      <h1>Bem-vindo à página principal!</h1>
      <button onClick={() => navigate('/')}>Voltar para Login</button>
    </div>

  )
}