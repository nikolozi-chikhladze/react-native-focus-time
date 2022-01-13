import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native'

import { fontSizes, spacing } from '../utils/sizes'
import { colors } from '../utils/colors'

const minutesToMillis = (minutes) => minutes * 1000 * 60;

const formatTime = (time) => time < 10 ? `0${time}` : time

export const Countdown = ({
  minutes = 0.5,
  isPaused = false,
  onProgress,
  onEnd
}) => {
  const [millis, setMillis] = useState(null);

  const interval = useRef(null);

  const countDown = useCallback(() => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    })
  }, [setMillis])

  useEffect(() => {
    if(millis !== null) {
      onProgress(millis / minutesToMillis(minutes))
      if (millis === 0) {
        onEnd();
      }
    }
  }, [millis])

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current)
      }
      return;
    }
    interval.current = setInterval(countDown, 1000)
    return () => clearInterval(interval.current)
  }, [isPaused, countDown])
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  useEffect(() => {
    setMillis(minutesToMillis(minutes))
  }, [minutes])

  return (
    <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxxl,
    fontWeight: 'bold',
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
    color: colors.white
  }
})