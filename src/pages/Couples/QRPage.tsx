import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const QRPage = () => {
  const { id } = useParams();
  const qrLink = `${import.meta.env.VITE_FRONTEND_URL}/form/${id}`


  return (
    <div>
      <img style={{
        display: 'block',
        margin: '0px auto',
        marginBottom: '60px',
        marginTop: '60px'
      }} src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrLink}&size=600x600&bgcolor=ffffff`} alt="" />
      <div style={{
        textAlign: 'center',
        width: '100%',
        fontSize: '32px'
      }}>
        <NavLink to={qrLink}>{qrLink}</NavLink>
      </div>

    </div>
  );
};

export default QRPage;
