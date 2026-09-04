import Icon from '../../shared/ui/Icon.jsx'

export default function UploadField({ accept, error, file, hint, id, label, onFile }) {
  const chooseFile = (files) => {
    const nextFile = files?.[0]
    if (nextFile) onFile(nextFile)
  }

  return (
    <label
      className={error ? 'upload-field upload-field--error' : 'upload-field'}
      htmlFor={id}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault()
        chooseFile(event.dataTransfer.files)
      }}
    >
      <input accept={accept} id={id} onChange={(event) => chooseFile(event.target.files)} type="file" />
      <span className="upload-field__icon"><Icon name="plus" size={23} /></span>
      <strong>{file ? file.name : label}</strong>
      <small>{file ? 'Kliknij lub upuść plik, aby go zmienić.' : hint}</small>
      {error ? <em>{error}</em> : null}
    </label>
  )
}
