import { AsyncStorage } from 'react-native'
import { getMetricMetaInfo, timeToString } from './helpers'

export const CALENDAR_STORAGE_KEY = 'UdaciFitness:calendar'

function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 0
}

function setDummyData() {
  console.log('setDummyData')
  const { run, bike, swim, sleep, eat } = getMetricMetaInfo()

  let dummyData = {}
  const timestamp = Date.now()

  for (let i = -183; i < 0; i++) {
    const time = timestamp + i * 24 * 60 * 60 * 1000
    const strTime = timeToString(time)
    dummyData[strTime] =
      getRandomNumber(3) % 2 === 0
        ? {
            run: getRandomNumber(run.max),
            bike: getRandomNumber(bike.max),
            swim: getRandomNumber(swim.max),
            sleep: getRandomNumber(sleep.max),
            eat: getRandomNumber(eat.max)
          }
        : null
  }

  AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

function setMissingDates(dates) {
  const length = Object.keys(dates).length
  const timestamp = Date.now()

  for (let i = -183; i < 0; i++) {
    const time = timestamp + i * 24 * 60 * 60 * 1000
    const strTime = timeToString(time)

    if (typeof dates[strTime] === 'undefined') {
      dates[strTime] = null
    }
  }

  return dates
}

export function formatCalendarResults(results) {
  //console.log(results)
  //return isEmpty(results)
  //  ? setDummyData()
  //  : setMissingDates(JSON.parse(results))
  //console.log(results)
  //console.log(isEmpty(results))

  //if (typeof obj === 'object') console.log('object')

  return results === null || results.length === 2
    ? setDummyData()
    : setMissingDates(JSON.parse(results))

  //return (results = setDummyData())
}

// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty

function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) return true

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false
  if (obj.length === 0) return true

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== 'object') return true

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false
  }

  return true
}
