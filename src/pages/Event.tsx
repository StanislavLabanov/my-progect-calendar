import { Button, Layout, Modal, Row } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import EventCalendar from '../components/Calendar';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypeSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

const Event: FC = () => {
   const [modalVisible, setModalVisible] = useState(false)
   const { fetchGuests, fetchEvents, createEvent } = useActions()
   const { quests, events } = useTypeSelector(state => state.EventReduser)
   const { user } = useTypeSelector(state => state.authReduser)

   useEffect(() => {
      fetchGuests()
      fetchEvents(user.username)
   }, [])

   const addNewEvent = (event: IEvent) => {
      setModalVisible(false)
      createEvent(event)
   }


   return (
      <Layout>
         <EventCalendar events={events} />
         <Row justify="center">
            <Button
               onClick={() => setModalVisible(true)}
            >
               Добавить событие
            </Button>
         </Row>
         <Modal
            title="Добавить событие"
            visible={modalVisible}
            footer={null}
            onCancel={() => setModalVisible(false)}
         >
            <EventForm
               quests={quests}
               submit={addNewEvent}
            />
         </Modal>
      </Layout>
   );
}

export default Event;