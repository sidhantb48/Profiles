import "./map.css";

const UserMap = ({ lat, lng, zoom }) => {
  return (
    <div className="Comp1">
      <iframe
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
        width="600"
        height="450"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="google map"
      ></iframe>
      <div className="location">
        <h4>Lat: {lat}</h4>
        <h4>Long: {lng}</h4>
      </div>
    </div>
  );
};

export default UserMap;
