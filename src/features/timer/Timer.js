import React, { useState } from 'react'
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import { useKeepAwake } from 'expo-keep-awake'

import { colors } from '../../utils/colors'
import { spacing } from '../../utils/sizes'
import { Countdown } from '../../components/Countdown'
import { RoundedButton } from '../../components/RoundedButton'
import { Timing } from './Timing'

const DEFAULT_TIME = .1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject, ...props }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress)
  }

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000)
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000)
    }
  }

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();

  }

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd}/>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject} </Text>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} color={colors.lightBlue} style={styles.progress} />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ?
          (
            <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
          )
          : (

            <RoundedButton title="start" onPress={() => setIsStarted(true)} />
          )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title: {
    color: colors.white,
    textAlign: 'center'
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  section: {
    paddingTop: spacing.xxl
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    flexDirection: 'row'
  },
  progressContainer: {
    paddingTop: spacing.sm
  },
  progress: { height: 10 },
  clearSubject: {
    paddingBottom: spacing.md,
    paddingLeft: spacing.md
  }
})