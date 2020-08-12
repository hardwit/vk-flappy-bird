import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './style.global';
import { GamesScreen } from './screens/Game/GameScreen';
import { View } from '@vkontakte/vkui'
import { RatingScreen } from './screens/Rating/RatingScreen';
import bridge from '@vkontakte/vk-bridge';
import { userApi } from './api/user';
import { useDispatch } from 'react-redux';
import { actions as userActions } from './store/userSlice'

export const App = () => {
  const [modalOpened, toggleModal] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    async function auth() {
      const vkResponse = await bridge.send('VKWebAppGetUserInfo')

      const name = vkResponse.first_name + ' ' + vkResponse.last_name
      const photo_100 = vkResponse.photo_100
      const params = window.location.search.slice(1)

      const response = await userApi.auth({params, name, photo_100})

      const score = response.data.score
      const token = response.data.token

      dispatch(userActions.setScore(score))
      dispatch(userActions.setToken(token))
    }

    auth()
  }, [dispatch])

  const modal = (
    <RatingScreen active={modalOpened} onClose={() => toggleModal(null)} />
  )

  return (
    <>
      <GlobalStyle />

      <View modal={modal}>
        <GamesScreen onOpenRating={() => toggleModal('rating')} />
      </View>
    </>
  )
}