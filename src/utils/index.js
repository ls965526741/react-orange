export function formatDate(date) {
  let time = date ? new Date(date) : new Date()
  const m = (time.getMonth() - 1 + '').padStart(2, '0')
  const d = (time.getDay() + '').padStart(2, '0')
  const h = (time.getHours() + '').padStart(2, '0')
  const mi = (time.getMinutes() + '').padStart(2, '0')
  return `${m}月${d}日 ${h}:${mi}`
}
export function formatDate1(date) {
  let time = date ? new Date(date) : new Date()
  const y = time.getFullYear()
  const m = (time.getMonth() - 1 + '').padStart(2, '0')
  const d = (time.getDay() + '').padStart(2, '0')
  const h = (time.getHours() + '').padStart(2, '0')
  const mi = (time.getMinutes() + '').padStart(2, '0')
  const s = (time.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${mi}:${s}`
}
export function responce(fun, delay) {
  let timer = null
  return (args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { fun(args) }, delay)
  }
}
export function arrayTree(data, pid) {
  const newArr = []
  data.forEach(item => {
    if (item.parent_id === pid) {
      newArr.push(item)
      item.children = arrayTree(data, item.id)
    }
  })
  return newArr
}