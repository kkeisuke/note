import dayjs from 'dayjs'

export const UseDateFormatter = (): { datetime: (date: string) => string } => {
  function datetime(date: string) {
    return dayjs(date).format('YYYY/MM/DD HH:mm:ss')
  }

  return {
    datetime
  }
}
