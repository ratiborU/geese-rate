// import qrcode from 'qrcode';
import { QRCode } from 'qrcode';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const QRPage = () => {
  const { id } = useParams();
  // const qrLink = 'https://www.google.ru/'
  const qrLink = `http://localhost:5173/form/${id}`


  return (
    <div>
      {/* QR Code */}
      <img style={{
        display: 'block',
        margin: '0px auto',
        marginBottom: '60px',
        marginTop: '60px'
      }} src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrLink}&size=600x600&bgcolor=ffffff`} alt="" />
      <div style={{
        // display: 'inline-block',
        // margin: '0px auto',
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
