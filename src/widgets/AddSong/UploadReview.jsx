import Icon from '../../shared/ui/Icon.jsx'

export default function UploadReview({ audioUrl, form, imageUrl }) {
  return (
    <div className="upload-review">
      <div className="upload-review__cover">{imageUrl ? <img alt="Podgląd okładki utworu" src={imageUrl} /> : <Icon name="plus" size={42} />}</div>
      <div className="upload-review__copy"><span>GOTOWE DO WYSŁANIA</span><h2>{form.song_name || 'Tytuł utworu'}</h2><p>{form.credit || 'Bez dodatkowego opisu'}</p><small>{form.album_name || 'Bez połączenia z albumem'}</small></div>
      <div className="upload-review__audio">{audioUrl ? <audio controls preload="metadata" src={audioUrl} /> : <p>Dodaj plik MP3, aby odsłuchać podgląd.</p>}</div>
    </div>
  )
}
