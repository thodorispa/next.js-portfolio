export function filesToDataUrl(files, index = 0, accept, cb, _value) {
  if (!_value) _value = []

  const reader = new FileReader()

  reader.addEventListener("load", () => {
    const image = new Image()
    image.src = reader.result

    const objectUrl = URL.createObjectURL(files[index]);

    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(image.width / 2)
      canvas.height = Math.round(image.height / 2)

      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

      const url = canvas.toDataURL("image/webp", 0.85);


      // Clean up
      URL.revokeObjectURL(url);
      image.remove();
      canvas.remove();

      _value.push({
        url: url,
        objectUrl: objectUrl,
        width: image.width,
        height: image.height,
        name: files[index].name,
      })

      index += 1

      if (files[index]) {
        reader.readAsDataURL(files[index])
      } else if (files[index + 1]) {
        index += 1
        filesToDataUrl(files, index, accept, cb, _value)
      } else {
        cb(_value)
      }
    }
  })

  if (files[index]) {
    reader.readAsDataURL(files[index])
  } else if (files[index + 1]) {
    index += 1
    filesToDataUrl(files, index, accept, cb, _value)
  } else {
    cb(_value)
  }
}

export function updateImageIndexes(images) {
  const _ = [...images]
  for (let i = 0; i < _.length; i++) {
    _[i].index = i;
  }
  return _
}