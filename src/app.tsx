import React, { useEffect } from 'react'
import Routes from './router'
import { useDispatch } from 'react-redux'
import { setInitialState } from '@/store/historySlice'

const app = () => {
  const dispatch = useDispatch()

  // 这里初始化加载应用的所有状态
  useEffect(() => {
    console.log('初始化加载...')
    dispatch(setInitialState())
  }, [])

  return (
    <div className="app">
      <Routes />
    </div>
  )
}

export default app
