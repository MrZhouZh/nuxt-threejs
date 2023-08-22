export interface ApiResult {
  text: string
  status: 'ok'
}

export function listApi(text: string) {
  return new Promise<ApiResult>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({
          text,
          status: 'ok',
        })
      }
      else {
        reject(new Error('O..ops! something wrong.'))
      }
    }, 1500)
  })
}
