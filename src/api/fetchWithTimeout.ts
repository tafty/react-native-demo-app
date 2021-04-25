import '../workarounds/androidLongTimer'

export default function fetchWithTimeout(
  url: string,
  options: Object,
  timeout: number,
) {
  return new Promise<any>((resolve: Function, reject: Function) => {
    // Set timeout timer
    let timer = setTimeout(() => reject('Request timed out'), timeout)

    fetch(url, options)
      .then(
        (response: any) => {
          clearTimeout(timer)
          resolve(response)
        },
        (err: any) => {
          clearTimeout(timer)
          reject(err)
        },
      )
      .catch((error: any) => {
        clearTimeout(timer)
        reject(error)
      })
  })
}
