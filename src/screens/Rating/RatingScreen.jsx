import React from 'react'
import styled from 'styled-components'
import { ModalRoot, ModalPage, ModalPageHeader, PanelHeaderButton, IS_PLATFORM_ANDROID, IS_PLATFORM_IOS, List, Cell, Avatar, Spinner } from '@vkontakte/vkui'
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel'
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss'
import { useState } from 'react'
import { useEffect } from 'react'
import { userApi } from '../../api/user'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

export const RatingScreen = ({ active, onClose }) => {
  const [users, setUsers] = useState([])
  const token = useSelector(state => state.user.token)
  const firstRenderRef = useRef(true)

  useEffect(() => {
    async function fetchTop() {
      const response = await userApi.getTop()

      setUsers(response.data)
      firstRenderRef.current = false
    }
    
    if (token) {
      fetchTop()
    }
  }, [token])

  useEffect(() => {
    async function fetchTop() {
      const response = await userApi.getTop()

      setUsers(response.data)
    }

    if (active && !firstRenderRef.current) {
      fetchTop()
    }
  }, [active])

  return (
    <ModalRoot activeModal={active} onClose={onClose}>
      <ModalPage id="rating" 
        header={
          <ModalPageHeader
            left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={onClose}><Icon24Cancel /></PanelHeaderButton>}
            right={IS_PLATFORM_IOS && <PanelHeaderButton onClick={onClose}><Icon24Dismiss /></PanelHeaderButton>}
          >
            Топ-100
        </ModalPageHeader>
      }>
         {!!users.length && <List>
          {users.map((user) => {
            return (
              <StyledCell
                before={<Avatar src={user.photo_100} />}
                key={user.id}
              >{user.name}
              <Score>
                {user.score}
              </Score>
              </StyledCell>
            );
          })}
          </List>}

          {!users.length && 
            <SpinnerBox>
              <Spinner size="large" />
            </SpinnerBox>}
      </ModalPage>
    </ModalRoot>
    )
}

const StyledCell = styled(Cell)`
  .Cell__children {
    display: flex;
  }
`

const Score = styled.div`
  margin-left: auto;
`

const SpinnerBox = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`