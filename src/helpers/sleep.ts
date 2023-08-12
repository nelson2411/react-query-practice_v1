export const sleep = (seconds: number): Promise<boolean> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  )
