import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

export default function recordingTimer() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  })

  useEffect(() => {
    let isCancelled = false

    const startTimer = () => {
      setTimeout(() => {
        let timerSeconds = timer.seconds
        let timerMinutes = timer.minutes

        timerSeconds++

        if (timerSeconds > 59) {
          timerMinutes++
          timerSeconds = 0
        }

        !isCancelled &&
          setTimer({ seconds: timerSeconds, minutes: timerMinutes })
      }, 1000)
    }
    startTimer()

    return () => {
      //final time:
      console.log(timer)
      isCancelled = true
    }
  }, [timer])

  return (
    <View>
      <Text>
        {`${timer.minutes < 10 ? '0' + time.minutes : time.minutes} :
            ${timer.seconds < 10 ? '0' + time.seconds : time.seconds}
        `}
      </Text>
    </View>
  )
}
