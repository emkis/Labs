export function throttle<TArgs extends unknown[]>(
  func: (...args: TArgs) => unknown,
  wait = 100,
) {
  let timer: ReturnType<typeof setTimeout> | null = null
  let params: TArgs
  return function (...args: TArgs) {
    params = args
    if (timer === null) {
      timer = setTimeout(() => {
        func(...params)
        timer = null
      }, wait)
    }
  }
}
